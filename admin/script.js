let baseUrl = "https://rugradio.tiboutshaik.com/";

function jsonViewer(json, collapsible = false) {
  var TEMPLATES = {
    item: '<div class="json__item"><div class="json__key">%KEY%</div><div class="json__value json__value--%TYPE%">%VALUE%</div></div>',
    itemCollapsible:
      '<label class="json__item json__item--collapsible"><input type="checkbox" class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>',
    itemCollapsibleOpen:
      '<label class="json__item json__item--collapsible"><input type="checkbox" checked class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>',
  };

  function createItem(key, value, type) {
    var element = TEMPLATES.item.replace("%KEY%", key);

    if (type == "string") {
      element = element.replace("%VALUE%", '"' + value + '"');
    } else {
      element = element.replace("%VALUE%", value);
    }

    element = element.replace("%TYPE%", type);

    return element;
  }

  function createCollapsibleItem(key, value, type, children) {
    var tpl = "itemCollapsible";

    if (collapsible) {
      tpl = "itemCollapsibleOpen";
    }

    var element = TEMPLATES[tpl].replace("%KEY%", key);

    element = element.replace("%VALUE%", type);
    element = element.replace("%TYPE%", type);
    element = element.replace("%CHILDREN%", children);

    return element;
  }

  function handleChildren(key, value, type) {
    var html = "";

    for (var item in value) {
      var _key = item,
        _val = value[item];

      html += handleItem(_key, _val);
    }

    return createCollapsibleItem(key, value, type, html);
  }

  function handleItem(key, value) {
    var type = typeof value;

    if (typeof value === "object") {
      return handleChildren(key, value, type);
    }

    return createItem(key, value, type);
  }

  function parseObject(obj) {
    _result = '<div class="json">';

    for (var item in obj) {
      var key = item,
        value = obj[item];

      _result += handleItem(key, value);
    }

    _result += "</div>";

    return _result;
  }

  return parseObject(json);
}

//DEGEN GET

const getAndSetDegens = () => {
  $.get(baseUrl + "degen/get_degens", function (data) {
    $("#degens-json").html(jsonViewer(data, true));
  });
};

$("#degens-data").on("click", function () {
  getAndSetDegens();
});

//DEGEN POST

$("#add-degen-button").on("click", function () {
  $.post(
    baseUrl + "degen/add_degen",
    {
      handle: $("#degen-handle").val(),
      image: $("#degen-img").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

$("#remove-degen-button").on("click", function () {
  $.post(
    baseUrl + "degen/remove_degen",
    {
      iddegen: $("#degen-remove-id").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

$("#update-degen-button").on("click", function () {
  $.post(
    baseUrl + "degen/update_degen",
    {
      iddegen: $("#degen-update-id").val(),
      handle: $("#degen-update-handle").val(),
      image: $("#degen-update-img").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

//HOST GET

const getAndSetHosts = () => {
  $.get(baseUrl + "host/get_hosts", function (data) {
    $("#hosts-json").html(jsonViewer(data, true));
  });
};

$("#hosts-data").on("click", function () {
  getAndSetHosts();
});

//HOST POST

$("#add-host-button").on("click", function () {
  $.post(
    baseUrl + "host/add_host",
    {
      handle: $("#host-handle").val(),
      image: $("#host-img").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

$("#remove-host-button").on("click", function () {
  $.post(
    baseUrl + "host/remove_host",
    {
      idhost: $("#host-remove-id").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

$("#update-host-button").on("click", function () {
  $.post(
    baseUrl + "host/update_host",
    {
      idhost: $("#host-update-id").val(),
      handle: $("#host-update-handle").val(),
      image: $("#host-update-img").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

//SHOW GET

const getAndSetShows = () => {
  $.get(baseUrl + "show/get_shows", function (data) {
    $("#shows-json").html(jsonViewer(data, true));
  });
};

$("#shows-data").on("click", function () {
  getAndSetShows();
});

//SHOW POST

$("#add-show-button").on("click", function () {
  $.post(
    baseUrl + "show/add_show",
    {
      name: $("#show-name").val(),
      description: $("#show-description").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

$("#remove-show-button").on("click", function () {
  $.post(
    baseUrl + "show/remove_show",
    {
      idshow: $("#show-remove-id").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

$("#update-show-button").on("click", function () {
  $.post(
    baseUrl + "show/update_show",
    {
      idshow: $("#show-update-id").val(),
      name: $("#show-update-name").val(),
      description: $("#show-update-description").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

//EPISODE GET

const getAndSetEpisodesForDate = (episodeDate) => {
  $.post(
    baseUrl + "episode/get_episodes",
    { date: episodeDate },
    function (data) {
      $("#episode-json").html(jsonViewer(data, true));
    }
  );
};

$("#episode-data").on("click", function () {
  let episodeDate;
  console.log($("#episodes-date").val());
  $("#episodes-date").val() == ""
    ? (episodeDate = new Date(Date.now()))
    : (episodeDate = new Date($("#episodes-date").val()));

  getAndSetEpisodesForDate(episodeDate);
});

//EPISODE POST

$("#add-episode-button").on("click", function () {
  $.post(
    baseUrl + "episode/add_episode",
    {
      name: $("#episode-name").val(),
      description: $("#episode-description").val(),
      start: $("#episode-start").val(),
      end: $("#episode-end").val(),
      idhost: $("#episode-idhost").val(),
      idshow: $("#episode-idshow").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

$("#remove-episode-button").on("click", function () {
  $.post(
    baseUrl + "episode/remove_episode",
    {
      idepisode: $("#episode-remove-id").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});

$("#update-episode-button").on("click", function () {
  $.post(
    baseUrl + "episode/update_episode",
    {
      idhost: $("#episode-update-idhost").val(),
      idshow: $("#episode-update-idshow").val(),
      name: $("#episode-update-name").val(),
      description: $("#episode-update-description").val(),
      start: $("#episode-update-start").val(),
      end: $("#episode-update-start").val(),
      password: $("#password").val(),
    },
    function (data) {
      console.log(data);
    }
  )
    .done(function () {
      alert("Succes");
    })
    .fail(function () {
      alert("Failed");
    });
});
