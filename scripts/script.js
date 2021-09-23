let showInfoDate = new Date();
let shows = [];
let degens = [];
let isLive = false;
let baseUrl = "http://localhost:3000/";
let twitterPicBaseUrl = "https://unavatar.vercel.app/twitter/";

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    $("#menu").addClass("collapsed");
  } else {
    $("#menu").removeClass("collapsed");
  }
}

(function () {
  var throttle = function (type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };
  throttle("scroll", "optimizedScroll");
})();

window.addEventListener("optimizedScroll", function () {
  scrollFunction();
});

var scroller = {};
scroller.e = document.getElementById("contributors");

if (scroller.e.addEventListener) {
  scroller.e.addEventListener("mousewheel", MouseWheelHandler, false);
  scroller.e.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
} else scroller.e.attachEvent("onmousewheel", MouseWheelHandler);

function MouseWheelHandler(e) {
  // cross-browser wheel delta
  var e = window.event || e;
  var delta = -20 * Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

  var pst = $("#contributors").scrollLeft() + delta;

  if (pst < 0) {
    pst = 0;
  } else if (pst > document.getElementById("contributors").scrollWidth) {
    pst = document.getElementById("contributors").scrollWidth;
  }

  $("#contributors").scrollLeft(pst);

  return false;
}

$("#contributors")
  .off("mousewheel")
  .on("mousewheel", function (ev) {
    var el = $(ev.currentTarget);
    return ev.originalEvent.deltaY > 0
      ? el[0].scrollWidth - el.scrollLeft() <= el.innerWidth()
      : el.scrollLeft() === 0;
  });

function nl2br(str, is_xhtml) {
  var breakTag =
    is_xhtml || typeof is_xhtml === "undefined" ? "<br />" : "<br>";
  return (str + "").replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    "$1" + breakTag + "$2"
  );
}

const getShowsForDay = (first) => {
  $.post(
    baseUrl + "episode/get_episodes",
    { date: showInfoDate },
    function (data) {
      setShowsForDay(data, first);
    }
  );
};

const setShowsForDay = (data, first) => {
  shows = data;
  $("#shows-during-day").html("");
  for (let i = 0; i < shows.length; i++) {
    let start = new Date(Date.parse(shows[i].start));
    let end = new Date(Date.parse(shows[i].end));
    if (i == 0 && first) {
    }
    $("#shows-during-day").append(
      '<div class="quick-show-info ' +
        (i == 0 ? " active" : "") +
        '" data-show=' +
        i +
        '><img src="' +
        (shows[i].image != "" && shows[i].image != null
          ? shows[i].image
          : twitterPicBaseUrl + shows[i].handle) +
        '" alt="pfp" loading="lazy"/><div class="show-info"><p class="show-name">' +
        shows[i].showname +
        '</p><p class="show-date-time">' +
        ("0" + start.getHours()).slice(-2) +
        ":" +
        ("0" + start.getMinutes()).slice(-2) +
        " - " +
        ("0" + end.getHours()).slice(-2) +
        ":" +
        ("0" + end.getMinutes()).slice(-2) +
        "</p> </div></div>"
    );
  }

  $("#program-info").html(
    "<h2>" +
      (shows[0].name != "" && shows[0].name != null
        ? shows[0].name
        : shows[0].showname) +
      "</h2><p>" +
      (shows[0].description != "" && shows[0].description != null
        ? nl2br(shows[0].description)
        : nl2br(shows[0].showdescription)) +
      "</p>"
  );
};

const getDegens = () => {
  $.get(baseUrl + "degen/get_degens", function (data) {
    console.log(data);
    degens = data;
    $("#degen-count").text(degens.length);
    setDegens();
  });
};

const setDegens = () => {
  for (let i = 0; i < degens.length; i++) {
    $("#contributors").append(
      ' <a href="https://twitter.com/' +
        degens[i].handle +
        '" target="_blank" rel="noreferrer" class="contributor"><div class="image-container"><img src="' +
        (degens[0].image != "" && degens[0].image != null
          ? degens[0].image
          : twitterPicBaseUrl + degens[0].handle) +
        '" loading="lazy"/></div><p>' +
        degens[i].handle +
        "</p></a>"
    );
  }
};

const setIsLive = (isLive) => {
  if (isLive) {
    $(".status").removeClass("inactive");
    $(".status").addClass("active");
  } else {
    $(".status").removeClass("active");
    $(".status").addClass("inactive");
  }
};

getShowsForDay(true);
getDegens();
setIsLive(true);

const isToday = (someDate) => {
  let today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const setProgramDateText = () => {
  if (isToday(showInfoDate)) {
    $(".date-header").text("Todays program");
  } else {
    $(".date-header").text(showInfoDate.toISOString().substring(0, 10));
  }
};

$(".left-arrow").on("click", function () {
  let minusADay = new Date();
  minusADay.setDate(showInfoDate.getDate() - 1);
  showInfoDate = minusADay;
  setProgramDateText();
  getShowsForDay(false);
});

$(".right-arrow").on("click", function () {
  let plusADay = new Date();
  plusADay.setDate(showInfoDate.getDate() + 1);
  showInfoDate = plusADay;
  setProgramDateText();
  getShowsForDay(false);
});

$(document).on("click", ".quick-show-info", function () {
  $("#program-info").html(
    "<h2>" +
      shows[$(this).data("show")].name +
      "</h2><p>" +
      nl2br(shows[$(this).data("show")].description) +
      "</p>"
  );

  $(".quick-show-info").removeClass("active");
  $(this).addClass("active");
  if ($(window).width() <= 1125) {
    $(".black-overlay").removeClass("hidden");
    $(".program-info").removeClass("hidden");
  }
});

$(".black-overlay").on("click", function () {
  $(".black-overlay").addClass("hidden");
  if ($(window).width() <= 1125) {
    $(".program-info").addClass("hidden");
  }
});
