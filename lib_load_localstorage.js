/**
 * will try to load all of the JavaScript LIB from localStorage,
 * if one is missing, then we'll load everything up again using lib_load_full.js
 */
(function () {
  "use strict";
  var lib_keys, exist, script, style_tag, stylesheet_link;

  lib_keys = [
    'js_jquery213'
    , 'js_jquery1112'
    , 'js_jquery183'
    , 'css_jquery_mobile145'
    , 'js_jquery_mobile145'
    , 'js_handlebarsjs300_full'
    , 'js_handlebarsjs300_runtime'
    , 'js_handlebarsjs_helpers_eachkeys'
  ];

  exist = lib_keys.reduce(function (prev, current, index) {
    return index > 0 ? prev && localStorage.hasOwnProperty(current) : localStorage.hasOwnProperty(current);
  });

  if (false === exist) {
    script = document.createElement("script");
    script.setAttribute("src", "lib_load_full.js");
    document.querySelector("body").appendChild(script);
    return; //quit the script
  }

  //----------------------------------------------------------------------------- everything exist


  /**
   * eval from localStorage.
   * try/catch helps jQuery fallback loading older versions.
   * returns true/false so it could be concat. with && or ||
   * @param {string} key - a key in the localStorage variable.
   * @return {boolean} - true is if eval returned no js-errors (jQuery might in older browsers, this is the reason for the versions alternatives..).
   */
  function evaler(key) {
    var result = false
      , is_use_style_tag = true
      ;

    try {
      if ("js" === key.substr(0, 2)) {
        window.eval(localStorage[key]);
      } else if ("css" === key.substr(0, 3)) {
        console.time("css injection as inline-style");
        style_tag = document.createElement("style");
        style_tag.setAttribute("type", "text/css");
        style_tag.innerHTML = localStorage[key];
        document.querySelector('head').appendChild(style_tag);
        console.timeEnd("css injection as inline-style");
//          console.time("css injection as base64-link-href");
//          stylesheet_link = document.createElement("link");
//          stylesheet_link.setAttribute("rel", "stylesheet");
//          stylesheet_link.setAttribute("type", "text/css");
//          stylesheet_link.setAttribute("href", "data:text/css;base64," + btoa(localStorage[key]));
//          document.querySelector('head').appendChild(stylesheet_link);
//          console.timeEnd("css injection as base64-link-href");

      }

      result = true;
    } catch (e) {
    }
    return result;
  }


  evaler('css_jquery_mobile145');                 //css is first

  evaler("js_jquery213") || evaler("js_jquery1112") || evaler("js_jquery183"); //jQuery core (only one loads)

  evaler("js_jquery_mobile145");                 //jQuery mobile

  //Handlebars (full | runtime)
  evaler("js_handlebarsjs300_full" /* "js_handlebarsjs300_runtime" */);
  evaler("js_handlebarsjs_helpers_eachkeys");    //Handlebars helpers: "eachkeys"
}());
