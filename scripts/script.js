let showInfoDate = new Date();
let shows = [];
let degens = [];
let isLive = false;
let baseUrl = "https://rugradio.tiboutshaik.com/";
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
    if (first) {
      let now = new Date(Date.now());
      let utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      console.log(utcDate);
      console.log(start);
      console.log(end);
      if (!isLive) {
        if (utcDate > start && utcDate < end) {
          setIsLive(true);
          $(".quick-show-info").removeClass("active");
          $("#shows-during-day").append(
            '<div class="quick-show-info active' +
              +' data-show="' +
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
              " UTC</p> </div></div>"
          );
        } else {
          setIsLive(false);

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
              " UTC</p> </div></div>"
          );
        }
      } else {
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
            " UTC</p> </div></div>"
        );
      }
    } else {
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
          " UTC</p> </div></div>"
      );
    }
  }

  let activeShow = $(".quick-show-info.active").data("show");

  $("#program-info").html(
    "<h2>" +
      (shows[activeShow].name != "" && shows[activeShow].name != null
        ? shows[activeShow].name
        : shows[activeShow].showname) +
      "</h2><p>" +
      (shows[activeShow].description != "" &&
      shows[activeShow].description != null
        ? nl2br(shows[activeShow].description)
        : nl2br(shows[activeShow].showdescription)) +
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
        (degens[i].image != "" && degens[i].image != null
          ? degens[i].image
          : twitterPicBaseUrl + degens[i].handle) +
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
  let minusADay = new Date(
    moment(showInfoDate).subtract(1, "d").format("MMM DD, YYYY HH:MM")
  );
  showInfoDate = minusADay;
  setProgramDateText();
  getShowsForDay(false);
});

$(".right-arrow").on("click", function () {
  let plusADay = new Date(
    moment(showInfoDate).add(1, "d").format("MMM DD, YYYY HH:MM")
  );
  showInfoDate = plusADay;
  setProgramDateText();
  getShowsForDay(false);
});

$(document).on("click", ".quick-show-info", function () {
  let activeShow = $(this).data("show");

  $("#program-info").html(
    "<h2>" +
      (shows[activeShow].name != "" && shows[activeShow].name != null
        ? shows[activeShow].name
        : shows[activeShow].showname) +
      "</h2><p>" +
      (shows[activeShow].description != "" &&
      shows[activeShow].description != null
        ? nl2br(shows[activeShow].description)
        : nl2br(shows[activeShow].showdescription)) +
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
