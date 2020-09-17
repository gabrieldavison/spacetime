// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"broadcastChannel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bc = void 0;
var bc = new BroadcastChannel("notes");
exports.bc = bc;
console.log("bc go");
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _broadcastChannel = require("./broadcastChannel.js");

// Global Variables
var notes = ["c", "d", "e", "f", "g", "a", "b"];
var octave = 4;
var lowOctave = 2;
var highOctave = 6;
var note = 0;
var step = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var steps = 16;
var playPosition = 0;
var editPosition = 0;
var tickRate = 400;
var highRate = 400;
var lowRate = 800;
var playing = true;
var actions = [inc, dec, bottom, top, noteRand, metroFast, metroSlow, positionRand];
var action = ["+", "-", "<", ">", "*", "M", "m", "#"];
window.addEventListener("keydown", function (e) {
  return handleKeydown(e);
});

function handleKeydown(e) {
  var usedKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"];

  if (usedKeys.includes(e.key)) {
    e.preventDefault();
  }

  switch (e.key) {
    case "ArrowLeft":
      editPosition === 0 ? editPosition = step.length - 1 : editPosition -= 1;
      draw();
      break;

    case "ArrowRight":
      editPosition === step.length - 1 ? editPosition = 0 : editPosition += 1;
      draw();
      break;

    case "ArrowUp":
      step[editPosition] === 7 ? step[editPosition] = 0 : step[editPosition] += 1;
      draw();
      break;

    case "ArrowDown":
      step[editPosition] === 0 ? step[editPosition] = 7 : step[editPosition] -= 1;
      draw();
      break;

    case " ":
      playing = !playing;
      draw();
      break;
  }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); //creates timer loop

function timer() {
  console.log("starting timer");
  var timeToTick = Date.now();

  function nextTick() {
    var now = Date.now();

    if (timeToTick <= now && playing == true) {
      tick();
      timeToTick = now + tickRate;
    }

    requestAnimationFrame(nextTick);
  }

  nextTick();
}

timer();

function tick() {
  playPosition == steps - 1 ? playPosition = 0 : playPosition += 1;
  actions[step[playPosition]]();
  playNote();
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var widthUnit = canvas.width / 10;
  var textSpacing = (canvas.width - widthUnit * 2) / 16;
  var x = widthUnit;
  var y = canvas.height / 2;

  for (var i = 0; i < 16; i++) {
    ctx.font = "40px serif";
    ctx.fillStyle = "black";

    if (i === editPosition) {
      ctx.fillStyle = "red";
    }

    ctx.fillText(action[step[i]], x, y);

    if (i === playPosition) {
      var rectangeWidth = ctx.measureText(step[i]).width;
      ctx.beginPath();
      ctx.rect(x, y - (rectangeWidth - 20), rectangeWidth, 3);
      ctx.stroke();
    }

    x += textSpacing;
  }
} //****Actions******
//Increments note


function inc() {
  if (note + 1 <= notes.length - 1) {
    note += 1;
  } else if (note + 1 > notes.length - 1 && octave < highOctave) {
    octave += 1;
    note = 0;
  }
} //Decrements note


function dec() {
  console.log("dec");

  if (note - 1 >= 0) {
    note -= 1;
  } else if (note - 1 < 0 && octave > lowOctave) {
    octave -= 1;
    note = notes.length - 1;
  }
} //Skips to bottom note


function bottom() {
  note = 0;
  octave = lowOctave;
} //Skips to top note


function top() {
  note = notes.length - 1;
  octave = highOctave;
} //Skips to random note in current octave


function noteRand() {
  note = randomIntFromInterval(0, notes.length - 1);
}

function metroFast() {
  tickRate = highRate;
}

function metroSlow() {
  tickRate = lowRate;
}

function positionRand() {
  playPosition = randomIntFromInterval(0, step.length - 1);
} //*****UTILS********


function playNote() {
  console.log(notes[note] + octave);

  _broadcastChannel.bc.postMessage(notes[note] + octave, "4n");
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
},{"./broadcastChannel.js":"broadcastChannel.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44013" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map