/**
 * remove unneeded script tags
 */
(function () {
  "use strict";
  Array.prototype.forEach.call(document.querySelectorAll('script'), function (element) {
    element.parentNode.removeChild(element);
  });
}());

/**
 * load libs from localStorage,
 * pre-fill localStorage if needed.
 */
(function () {
  "use strict";
  var lib_keys, is_libs, script, again_script;

  lib_keys = ["##CONTENT##"];

  is_libs = lib_keys.reduce(function (prev, current, index) {
    return index > 0 ? prev && localStorage.hasOwnProperty(current) : localStorage.hasOwnProperty(current);
  });

  function evaler(key) {
    var result = false, tag;
    try {
      if ('js' === key.substr(-2)) {
        window.eval(atob(localStorage[key].replace("data:text/javascript;base64,", "")));
      }
      else if ('css' === key.substr(-3)) {
        tag = document.createElement("link");
        tag.setAttribute("data-key", key);
        tag.setAttribute("rel", "stylesheet");
        tag.setAttribute("type", "text/css");
        tag.setAttribute("href", localStorage[key]);
        document.querySelector('head').appendChild(tag);
      }
      else if ("data:image" === localStorage[key].substr(0,10)){
        tag = document.createElement("img");
        tag.setAttribute("data-key", key);
        tag.setAttribute("src", localStorage[key]);
        document.querySelector('head').appendChild(tag);
      }

      result = true;
    } catch (e) {
      console.error(e);
    }
    console.timeEnd(key);
    return result;
  }


  //-----------------------

  if (is_libs) {
    console.log("all libs loaded to localstorage.");

    //css
    evaler("index.css");
    evaler("jquery_mobile_4.5.1_internal_png_min.css");

    //js
    evaler("jquery_2.1.3_min.js") || evaler("jquery_1.11.2_min.js") || evaler("jquery_1.8.3_min.js");
    evaler("jquery_mobile_4.5.1_internal_png_min.js");
    evaler("handlebars_full_3.0.0_min.js" /* "handlebars_runtime_only_3.0.0_min.js" */);
    evaler("handlebars_helpers_eachkeys_1.0.0_min.js");

    console.log("all libs loaded done.");
  }
  else {
    console.log("libs not loaded to localstorage.");

    script = document.createElement("script");
    script.setAttribute("src", "generated/libs_to_localstorage.js" + "?__" + String(Number(new Date())));
    script.onload = function () {
      again_script = document.createElement("script");
      again_script.setAttribute("defer", "");
      again_script.setAttribute("src", "generated/index.js" + "?__" + String(Number(new Date())));
      document.querySelector('body').appendChild(again_script);
    };
    document.querySelector('body').appendChild(script);
  }
}());
