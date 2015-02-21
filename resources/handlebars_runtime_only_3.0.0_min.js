!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Handlebars=b()}(this,function(){var a=function(){"use strict";function a(a){return i[a]}function b(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function c(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1}function d(b){return b&&b.toHTML?b.toHTML():null==b?"":b?(b=""+b,k.test(b)?b.replace(j,a):b):b+""}function e(a){return a||0===a?n(a)&&0===a.length?!0:!1:!0}function f(a,b){return a.path=b,a}function g(a,b){return(a?a+".":"")+b}var h={},i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},j=/[&<>"'`]/g,k=/[&<>"'`]/;h.extend=b;var l=Object.prototype.toString;h.toString=l;var m=function(a){return"function"==typeof a};m(/x/)&&(m=function(a){return"function"==typeof a&&"[object Function]"===l.call(a)});var m;h.isFunction=m;var n=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===l.call(a):!1};return h.isArray=n,h.indexOf=c,h.escapeExpression=d,h.isEmpty=e,h.blockParams=f,h.appendContextPath=g,h}(),b=function(){"use strict";function a(a,b){var d,e,f=b&&b.loc;f&&(d=f.start.line,e=f.start.column,a+=" - "+d+":"+e);for(var g=Error.prototype.constructor.call(this,a),h=0;h<c.length;h++)this[c[h]]=g[c[h]];f&&(this.lineNumber=d,this.column=e)}var b,c=["description","fileName","lineNumber","message","name","number","stack"];return a.prototype=new Error,b=a}(),c=function(a,b){"use strict";function c(a,b){this.helpers=a||{},this.partials=b||{},d(this)}function d(a){a.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new g("Missing helper: '"+arguments[arguments.length-1].name+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse,e=c.fn;if(b===!0)return e(this);if(b===!1||null==b)return d(this);if(k(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):d(this);if(c.data&&c.ids){var g=q(c.data);g.contextPath=f.appendContextPath(c.data.contextPath,c.name),c={data:g}}return e(b,c)}),a.registerHelper("each",function(a,b){function c(b,c,g){d&&(d.key=b,d.index=c,d.first=0===c,d.last=!!g,e&&(d.contextPath=e+b)),m+=h(a[b],{data:d,blockParams:f.blockParams([a[b],b],[e+b,null])})}if(!b)throw new g("Must pass iterator to #each");var d,e,h=b.fn,i=b.inverse,j=0,m="";if(b.data&&b.ids&&(e=f.appendContextPath(b.data.contextPath,b.ids[0])+"."),l(a)&&(a=a.call(this)),b.data&&(d=q(b.data)),a&&"object"==typeof a)if(k(a))for(var n=a.length;n>j;j++)c(j,j,j===a.length-1);else{var o;for(var p in a)a.hasOwnProperty(p)&&(o&&c(o,j-1),o=p,j++);o&&c(o,j-1,!0)}return 0===j&&(m=i(this)),m}),a.registerHelper("if",function(a,b){return l(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||f.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){l(a)&&(a=a.call(this));var c=b.fn;if(f.isEmpty(a))return b.inverse(this);if(b.data&&b.ids){var d=q(b.data);d.contextPath=f.appendContextPath(b.data.contextPath,b.ids[0]),b={data:d}}return c(a,b)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)}),a.registerHelper("lookup",function(a,b){return a&&a[b]})}var e={},f=a,g=b,h="3.0.0";e.VERSION=h;var i=6;e.COMPILER_REVISION=i;var j={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};e.REVISION_CHANGES=j;var k=f.isArray,l=f.isFunction,m=f.toString,n="[object Object]";e.HandlebarsEnvironment=c,c.prototype={constructor:c,logger:o,log:p,registerHelper:function(a,b){if(m.call(a)===n){if(b)throw new g("Arg not supported with multiple helpers");f.extend(this.helpers,a)}else this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){if(m.call(a)===n)f.extend(this.partials,a);else{if("undefined"==typeof b)throw new g("Attempting to register a partial as undefined");this.partials[a]=b}},unregisterPartial:function(a){delete this.partials[a]}};var o={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:1,log:function(a,b){if("undefined"!=typeof console&&o.level<=a){var c=o.methodMap[a];(console[c]||console.log).call(console,b)}}};e.logger=o;var p=o.log;e.log=p;var q=function(a){var b=f.extend({},a);return b._parent=a,b};return e.createFrame=q,e}(a,b),d=function(){"use strict";function a(a){this.string=a}var b;return a.prototype.toString=a.prototype.toHTML=function(){return""+this.string},b=a}(),e=function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=n;if(b!==c){if(c>b){var d=o[c],e=o[b];throw new m("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new m("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){if(!b)throw new m("No environment passed to template");if(!a||!a.main)throw new m("Unknown template object: "+typeof a);b.VM.checkRevision(a.compiler);var c=function(c,d,e){e.hash&&(d=l.extend({},d,e.hash)),c=b.VM.resolvePartial.call(this,c,d,e);var f=b.VM.invokePartial.call(this,c,d,e);if(null==f&&b.compile&&(e.partials[e.name]=b.compile(c,a.compilerOptions,b),f=e.partials[e.name](d,e)),null!=f){if(e.indent){for(var g=f.split("\n"),h=0,i=g.length;i>h&&(g[h]||h+1!==i);h++)g[h]=e.indent+g[h];f=g.join("\n")}return f}throw new m("The partial "+e.name+" could not be compiled when running in runtime-only mode")},d={strict:function(a,b){if(!(b in a))throw new m('"'+b+'" not defined in '+a);return a[b]},lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:l.escapeExpression,invokePartial:c,fn:function(b){return a[b]},programs:[],program:function(a,b,c,d,e){var g=this.programs[a],h=this.fn(a);return b||e||d||c?g=f(this,a,h,b,c,d,e):g||(g=this.programs[a]=f(this,a,h)),g},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c=l.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler},e=function(b,c){c=c||{};var f=c.data;e._setup(c),!c.partial&&a.useData&&(f=j(b,f));var g,h=a.useBlockParams?[]:void 0;return a.useDepths&&(g=c.depths?[b].concat(c.depths):[b]),a.main.call(d,b,d.helpers,d.partials,f,h,g)};return e.isTop=!0,e._setup=function(c){c.partial?(d.helpers=c.helpers,d.partials=c.partials):(d.helpers=d.merge(c.helpers,b.helpers),a.usePartial&&(d.partials=d.merge(c.partials,b.partials)))},e._child=function(b,c,e,g){if(a.useBlockParams&&!e)throw new m("must pass block params");if(a.useDepths&&!g)throw new m("must pass parent depths");return f(d,b,a[b],c,0,e,g)},e}function f(a,b,c,d,e,f,g){var h=function(b,e){return e=e||{},c.call(a,b,a.helpers,a.partials,e.data||d,f&&[e.blockParams].concat(f),g&&[b].concat(g))};return h.program=b,h.depth=g?g.length:0,h.blockParams=e||0,h}function g(a,b,c){return a?a.call||c.name||(c.name=a,a=c.partials[a]):a=c.partials[c.name],a}function h(a,b,c){if(c.partial=!0,void 0===a)throw new m("The partial "+c.name+" could not be found");return a instanceof Function?a(b,c):void 0}function i(){return""}function j(a,b){return b&&"root"in b||(b=b?p(b):{},b.root=a),b}var k={},l=a,m=b,n=c.COMPILER_REVISION,o=c.REVISION_CHANGES,p=c.createFrame;return k.checkRevision=d,k.template=e,k.program=f,k.resolvePartial=g,k.invokePartial=h,k.noop=i,k}(a,b,c),f=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c,j=d,k=e,l=function(){var a=new g.HandlebarsEnvironment;return j.extend(a,g),a.SafeString=h,a.Exception=i,a.Utils=j,a.escapeExpression=j.escapeExpression,a.VM=k,a.template=function(b){return k.template(b,a)},a},m=l();m.create=l;var n="undefined"!=typeof global?global:window,o=n.Handlebars;return m.noConflict=function(){n.Handlebars===m&&(n.Handlebars=o)},m["default"]=m,f=m}(c,d,b,a,e);return f});