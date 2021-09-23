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

const getShowsForDay = () => {
  //TODO: GET DATA FROM API:

  shows = [];

  let show = {
    img: "assets/test.png",
    name: "Show name",
    showDateTime: "9 a.m. - 11 a.m. UTC",
    title: "Show title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies fringilla ornare. Proin vestibulum    eros risus, ac suscipit erat cursus id. Integer massa nisl, rhoncus at dictum tempor, porta id dolor.\n\n    Nulla facilisi. Nam tincidunt placerat nibh. Aliquam quis condimentum lorem. Interdum et malesuada fames    ac ante ipsum primis in faucibus. Donec quis euismod ligula. Morbi sodales eros at erat egestas, sit    amet molestie est tristique. In tincidunt lorem metus, vel sagittis enim scelerisque a. \n\nUt consectetur    et ipsum eget sollicitudin. In congue dolor eu nunc facilisis cursus.        Nulla fermentum ultrices ex, nec lobortis est iaculis vel. Vestibulum quis sem eget diam eleifend    pellentesque. In consectetur luctus risus quis auctor. Fusce tempor nunc quis sapien semper, non    condimentum quam ultricies. Sed id nibh et ligula varius porttitor. Sed scelerisque at tellus sit amet    dictum. Sed ipsum elit, scelerisque at molestie vehicula, laoreet et sapien.        Cras lacus felis, porta ut vulputate vel, posuere sed augue. Integer sodales tincidunt augue nec    elementum. Vivamus congue a lectus quis elementum. Ut nulla justo, feugiat at fermentum a, consequat a    eros. Aenean porta sapien posuere erat vestibulum, a consectetur tortor ullamcorper. Donec vitae quam    gravida, sollicitudin turpis ac, efficitur velit. Cras posuere massa nulla, vitae congue velit lacinia    ac. Donec a ligula imperdiet leo egestas iaculis finibus et ligula. Suspendisse in pulvinar tortor.    Etiam nec ligula id urna tristique condimentum et nec nisi. Phasellus cursus vitae lectus id vulputate.    Integer consectetur arcu ut sem efficitur mollis. Phasellus elementum tincidunt nisi, eu auctor metus    porttitor laoreet.  \n\n      Mauris ut gravida libero. Morbi auctor tellus nulla, nec eleifend dui eleifend id. Etiam mauris ipsum,    molestie quis pretium id, suscipit nec massa. Phasellus bibendum, enim eu venenatis cursus, urna metus    sollicitudin urna, in finibus urna quam vulputate nunc. Morbi libero ante, tincidunt quis pharetra sed,    scelerisque eu ex. Praesent vel interdum urna. Nulla auctor lectus est, eu pellentesque turpis convallis    sit amet. Donec scelerisque arcu ac metus porta, a luctus eros semper. Aliquam vestibulum odio non    sapien congue hendrerit. Cras scelerisque auctor odio vitae ullamcorper.        Morbi porttitor risus ac arcu gravida, non placerat quam dignissim. Etiam eget turpis faucibus, rutrum    arcu a, tincidunt diam. Sed vel diam ut libero tempus molestie eget eu mi. Aliquam dapibus interdum    orci, id tincidunt odio. Cras tincidunt mi nisl, sit amet consequat ipsum sollicitudin sed. Pellentesque    elementum faucibus odio et facilisis. Nulla id diam accumsan odio sollicitudin mollis eget eu leo. Nam    velit nisi, mattis a velit quis, faucibus euismod mi. Vestibulum id erat ut purus ultricies finibus    vitae quis urna. In ultricies rhoncus diam, ac gravida felis. Aliquam porttitor et urna molestie    viverra. Vivamus aliquam enim a ultricies tempor. Ut elit diam, facilisis non eros non, faucibus    lobortis mi. Aliquam eget euismod augue. \n\nCras pharetra tortor non tellus maximus venenatis. Suspendisse    potenti.    Maecenas molestie rutrum nisl eget efficitur. In sit amet nisi sed orci rhoncus fringilla vitae sed    diam. Vestibulum dictum lacinia lacus, ornare auctor orci feugiat a. Vivamus posuere dapibus quam et    tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.    Praesent urna sem, consequat eget pretium eget, sodales sed lectus. Etiam pretium interdum nibh, nec    iaculis mauris. Aliquam placerat sollicitudin mauris, a congue lorem finibus vel. Vestibulum condimentum    massa non nisi commodo, nec posuere erat convallis.",
  };

  for (let i = 0; i < 4; i++) {
    shows.push(show);
  }
};

const setShowsForDay = () => {
  for (let i = 0; i < shows.length; i++) {
    $("#shows-during-day").append(
      '<div class="quick-show-info ' +
        (i == 0 ? " active" : "") +
        '" data-show=' +
        i +
        '><img src="' +
        shows[i].img +
        '" alt="pfp" loading="lazy"/><div class="show-info"><p class="show-name">' +
        shows[i].name +
        '</p><p class="show-date-time">' +
        shows[i].showDateTime +
        "</p> </div></div>"
    );
  }

  $("#program-info").html(
    "<h2>" + shows[0].title + "</h2><p>" + nl2br(shows[0].description) + "</p>"
  );
};

const getDegens = () => {
  //TODO: GET DATA FROM API:

  degens = [];

  let degen = {
    image: "assets/test.png",
    handle: "TwitterHandle",
  };

  for (let i = 0; i < 129; i++) {
    degens.push(degen);
  }
};

const setDegens = () => {
  for (let i = 0; i < degens.length; i++) {
    $("#contributors").append(
      ' <a href="https://twitter.com/' +
        degens[i].handle +
        '" target="_blank" rel="noreferrer" class="contributor"><div class="image-container"><img src="' +
        degens[i].image +
        '" loading="lazy"/></div><p>' +
        degens[i].handle +
        "</p></a>"
    );
  }

  $("#program-info").html(
    "<h2>" + shows[0].title + "</h2><p>" + nl2br(shows[0].description) + "</p>"
  );
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

getShowsForDay();
setShowsForDay();
getDegens();
setDegens();
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
});

$(".right-arrow").on("click", function () {
  let plusADay = new Date();
  plusADay.setDate(showInfoDate.getDate() + 1);
  showInfoDate = plusADay;
  setProgramDateText();
});

$(".quick-show-info").on("click", function () {
  if (!$(this).hasClass("active")) {
    //TODO: Change program info
    $("#program-info").html(
      "<h2>" +
        shows[$(this).data("show")].title +
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
  }
});

$(".black-overlay").on("click", function () {
  $(".black-overlay").addClass("hidden");
  if ($(window).width() <= 1125) {
    $(".program-info").addClass("hidden");
  }
});
