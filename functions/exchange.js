!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=17)}([function(e,t,r){"use strict";r.d(t,"a",(function(){return y})),r.d(t,"b",(function(){return l})),r.d(t,"d",(function(){return d})),r.d(t,"c",(function(){return h}));var n=r(2),o=r.n(n),s=r(3);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){f(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object(s.config)();const a=o()("POST","json","https://api.trakt.tv/oauth/",200),u={client_id:process.env.VITE_TRAKT_API_KEY,client_secret:process.env.TRAKT_API_SECRET},p={"Content-Type":"application/json"},y=async e=>{try{return a("token",c({code:e,redirect_uri:process.env.VITE_ORIGIN,grant_type:"authorization_code"},u),p)}catch(e){return{access_token:void 0,refresh_token:void 0}}},l=async e=>{try{return a("token",c({refresh_token:e,redirect_uri:process.env.VITE_ORIGIN,grant_type:"refresh_token"},u),p)}catch(e){return{access_token:void 0,refresh_token:void 0}}},d=async e=>a("revoke",c({token:e},u),p),h={statusCode:200,headers:{"Access-Control-Allow-Origin":process.env.VITE_ORIGIN,"Access-Control-Allow-Headers":"Content-Type"}}},function(e,t,r){"use strict";const n=(e,t)=>n.from(e,t);n.sorter=(e,t)=>{const r=((e,t)=>e.byteLength===t.byteLength||e.byteLength>t.byteLength?e.byteLength:t.byteLength)(e=n(e),t=n(t));let o=0;for(;o<r-1;){if(o>=e.byteLength)return 1;if(o>=t.byteLength)return-1;if(e.getUint8(o)<t.getUint8(o))return-1;if(e.getUint8(o)>t.getUint8(o))return 1;o++}return 0},n.compare=(e,t)=>!n.sorter(e,t),n.memcopy=(e,t)=>{const r=n(e,t);return r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)},n.arrayBuffer=(e,t)=>(e=n(e,t)).buffer.byteLength===e.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength);const o=(e,t=0,r=null)=>(e=n(e),r=(null===r?e.byteLength:r)-t,[e.buffer,e.byteOffset+t,r]);n.slice=(e,t,r)=>new DataView(...o(e,t,r)),n.memcopySlice=(e,t,r)=>{const[n,s,i]=o(e,t,r);return n.slice(s,i+s)},n.typedArray=(e,t=Uint8Array)=>new t((e=n(e)).buffer,e.byteOffset,e.byteLength/t.BYTES_PER_ELEMENT),n.concat=e=>{const t=(e=(e=Array.from(e)).map(e=>n(e))).reduce((e,t)=>e+t.byteLength,0),r=new Uint8Array(t);let o=0;for(const t of e){const e=n.typedArray(t);r.set(e,o),o+=e.byteLength}return r.buffer};n.random=e=>{const t=new ArrayBuffer(e);if(e>65536){let e=0;for(;e<t.byteLength;){let r;r=e+65536>t.byteLength?t.byteLength-e:65536;const o=new Uint8Array(t,e,r);e+=65536,n._randomFill(o)}}else{const e=new Uint8Array(t);n._randomFill(e)}return t},e.exports=n},function(e,t,r){"use strict";const n=r(4),o=r(5),{URL:s}=r(6),i=r(7),c=r(8),f=r(9),a=r(12),u=r(13),{PassThrough:p}=r(14),y={};u.createBrotliDecompress&&(y.br=()=>u.createBrotliDecompress()),u.createGunzip&&(y.gzip=()=>u.createGunzip()),u.createInflate&&(y.deflate=()=>u.createInflate());const l=Object.keys(y).join(", ");class d extends Error{constructor(e,...t){let r;super(...t),Error.captureStackTrace(this,d),this.name="StatusError",this.message=e.statusMessage,this.statusCode=e.statusCode,this.json=e.json,this.text=e.text,this.arrayBuffer=e.arrayBuffer,this.headers=e.headers;Object.defineProperty(this,"responseBody",{get:()=>(r||(r=this.arrayBuffer()),r)})}}const h=e=>{let t;e.arrayBuffer=()=>{if(t)throw new Error("body stream is locked");return r=e,t=new Promise((e,t)=>{const n=[];r.on("error",t),r.on("end",()=>e(Buffer.concat(n))),r.on("data",e=>n.push(e))}),t;var r},e.text=()=>e.arrayBuffer().then(e=>e.toString()),e.json=async()=>{const t=await e.text();try{return JSON.parse(t)}catch(e){throw e.message+=`str"${t}"`,e}}};e.exports=a((e,t,r,a,u)=>(b,g=null,w={})=>{const O=new s(b=u+(b||""));let m;if("https:"===O.protocol)m=o;else{if("http:"!==O.protocol)throw new Error("Unknown protocol, "+O.protocol);m=n}const j={path:O.pathname+O.search,port:O.port,method:t,headers:{...a||{},...w},hostname:O.hostname};(O.username||O.password)&&(j.auth=[O.username,O.password].join(":"));const v=c(j.headers);return"json"===r&&(v.get("accept")||v.set("accept","application/json")),v.has("accept-encoding")||v.set("accept-encoding",l),new Promise((t,n)=>{const o=m.request(j,async o=>((o=(e=>{const t=new p;if(t.statusCode=e.statusCode,t.status=e.statusCode,t.statusMessage=e.statusMessage,t.headers=e.headers,t._response=e,t.headers["content-encoding"]){const r=t.headers["content-encoding"].split(", ").reverse();for(;r.length;){const n=r.shift();if(!y[n])break;{const r=y[n]();r.on("error",e=>t.emit("error",new Error("ZBufError",e))),e=e.pipe(r)}}}return e.pipe(t)})(o)).on("error",n),h(o),o.status=o.statusCode,e.has(o.statusCode)?r?void("buffer"===r?t(o.arrayBuffer()):"json"===r?t(o.json()):"string"===r&&t(o.text())):t(o):n(new d(o))));o.on("error",n),g?((g instanceof ArrayBuffer||ArrayBuffer.isView(g))&&(g=f.native(g)),Buffer.isBuffer(g)||("string"==typeof g?g=Buffer.from(g):i(g)?(g.pipe(o),g=null):"object"==typeof g?(v.has("content-type")||o.setHeader("content-type","application/json"),g=Buffer.from(JSON.stringify(g))):n(new Error("Unknown body type."))),g&&(o.setHeader("content-length",g.length),o.end(g))):o.end()})})},function(e,t,r){const n=r(15),o=r(16);function s(e){console.log("[dotenv][DEBUG] "+e)}const i=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,c=/\\n/g,f=/\n|\r|\r\n/;function a(e,t){const r=Boolean(t&&t.debug),n={};return e.toString().split(f).forEach((function(e,t){const o=e.match(i);if(null!=o){const e=o[1];let t=o[2]||"";const r=t.length-1,s='"'===t[0]&&'"'===t[r];"'"===t[0]&&"'"===t[r]||s?(t=t.substring(1,r),s&&(t=t.replace(c,"\n"))):t=t.trim(),n[e]=t}else r&&s(`did not match key and value when parsing line ${t+1}: ${e}`)})),n}e.exports.config=function(e){let t=o.resolve(process.cwd(),".env"),r="utf8",i=!1;e&&(null!=e.path&&(t=e.path),null!=e.encoding&&(r=e.encoding),null!=e.debug&&(i=!0));try{const e=a(n.readFileSync(t,{encoding:r}),{debug:i});return Object.keys(e).forEach((function(t){Object.prototype.hasOwnProperty.call(process.env,t)?i&&s(`"${t}" is already defined in \`process.env\` and will not be overwritten`):process.env[t]=e[t]})),{parsed:e}}catch(e){return{error:e}}},e.exports.parse=a},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("https")},function(e,t){e.exports=require("url")},function(e,t,r){"use strict";const n=e=>null!==e&&"object"==typeof e&&"function"==typeof e.pipe;n.writable=e=>n(e)&&!1!==e.writable&&"function"==typeof e._write&&"object"==typeof e._writableState,n.readable=e=>n(e)&&!1!==e.readable&&"function"==typeof e._read&&"object"==typeof e._readableState,n.duplex=e=>n.writable(e)&&n.readable(e),n.transform=e=>n.duplex(e)&&"function"==typeof e._transform&&"object"==typeof e._transformState,e.exports=n},function(e,t){function r(e){this.dict=e||{}}r.prototype.set=function(e,t,r){if("object"!=typeof e){void 0===r&&(r=!0);var n=this.has(e);return!r&&n?this.dict[n]=this.dict[n]+","+t:this.dict[n||e]=t,n}for(var o in e)this.set(o,e[o],t)},r.prototype.has=function(e){for(var t=Object.keys(this.dict),r=(e=e.toLowerCase(),0);r<t.length;r++)if(t[r].toLowerCase()===e)return t[r];return!1},r.prototype.get=function(e){var t,r;e=e.toLowerCase();var n=this.dict;return Object.keys(n).forEach((function(o){r=o.toLowerCase(),e===r&&(t=n[o])})),t},r.prototype.swap=function(e){var t=this.has(e);if(t!==e){if(!t)throw new Error('There is no header than matches "'+e+'"');this.dict[e]=this.dict[t],delete this.dict[t]}},r.prototype.del=function(e){var t=this.has(e);return delete this.dict[t||e]},e.exports=function(e){return new r(e)},e.exports.httpify=function(e,t){var n=new r(t);return e.setHeader=function(e,t,r){if(void 0!==t)return n.set(e,t,r)},e.hasHeader=function(e){return n.has(e)},e.getHeader=function(e){return n.get(e)},e.removeHeader=function(e){return n.del(e)},e.headers=n.dict,n}},function(e,t,r){"use strict";const n=r(10),o=r(11).from,s=r(1);s.from=(e,t)=>e instanceof DataView?e:e instanceof ArrayBuffer?new DataView(e):("string"==typeof e&&(e=Buffer.from(e,t)),Buffer.isBuffer(e)?new DataView(e.buffer,e.byteOffset,e.byteLength):o(e,t)),s.toString=(e,t)=>(e=s(e),Buffer.from(e.buffer,e.byteOffset,e.byteLength).toString(t)),s.native=(e,t)=>Buffer.isBuffer(e)?e:(e=s(e,t),Buffer.from(e.buffer,e.byteOffset,e.byteLength)),s._randomFill=n.randomFillSync,e.exports=s},function(e,t){e.exports=require("crypto")},function(e,t,r){"use strict";const n=r(1);n.from=(e,t)=>{if(e instanceof DataView)return e;if(e instanceof ArrayBuffer)return new DataView(e);let r;if("string"==typeof e){if(t){if("base64"===t)return r=Uint8Array.from(atob(e),e=>e.charCodeAt(0)).buffer,new DataView(r)}else t="utf-8";if("utf-8"!==t)throw new Error("Browser support for encodings other than utf-8 not implemented");return new DataView((new TextEncoder).encode(e).buffer)}if("object"==typeof e&&ArrayBuffer.isView(e))return e.byteLength===e.buffer.byteLength?new DataView(e.buffer):new DataView(e.buffer,e.byteOffset,e.byteLength);throw new Error("Unkown type. Cannot convert to ArrayBuffer")},n.toString=(e,t)=>{e=n(e,t);const r=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),o=String.fromCharCode(...r);return"base64"===t?btoa(o):o},n.native=(e,t)=>e instanceof Uint8Array?e:(e=n.from(e,t),new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),process.browser&&(n._randomFill=(...e)=>crypto.getRandomValues(...e)),e.exports=n},function(e,t,r){"use strict";const n=new Set(["json","buffer","string"]);e.exports=e=>(...t)=>{const r=new Set;let o,s,i,c="";return t.forEach(e=>{if("string"==typeof e)if(e.toUpperCase()===e){if(o){throw new Error(`Can't set method to ${e}, already set to ${o}.`)}o=e}else if(e.startsWith("http:")||e.startsWith("https:"))c=e;else{if(!n.has(e))throw new Error("Unknown encoding, "+e);s=e}else if("number"==typeof e)r.add(e);else{if("object"!=typeof e)throw new Error("Unknown type: "+typeof e);if(i)throw new Error("Cannot set headers twice.");i=e}}),o||(o="GET"),0===r.size&&r.add(200),e(r,o,s,i,c)}},function(e,t){e.exports=require("zlib")},function(e,t){e.exports=require("stream")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t,r){"use strict";r.r(t);var n=r(0);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}exports.handler=async e=>{if("OPTIONS"===e.httpMethod)return n.c;const{code:t}=JSON.parse(e.body);try{const e=await Object(n.a)(t);return s(s({},n.c),{},{body:JSON.stringify({status:"success",auth:e},null,2)})}catch(e){return{statusCode:401,headers:n.c.headers,body:JSON.stringify({status:"failed",error:e},null,2)}}}}]));