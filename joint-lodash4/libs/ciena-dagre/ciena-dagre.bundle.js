var dagre =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = addDummyNode;
/* harmony export (immutable) */ __webpack_exports__["l"] = simplify;
/* harmony export (immutable) */ __webpack_exports__["c"] = asNonCompoundGraph;
/* harmony export (immutable) */ __webpack_exports__["m"] = successorWeights;
/* harmony export (immutable) */ __webpack_exports__["j"] = predecessorWeights;
/* harmony export (immutable) */ __webpack_exports__["e"] = intersectRect;
/* harmony export (immutable) */ __webpack_exports__["d"] = buildLayerMatrix;
/* harmony export (immutable) */ __webpack_exports__["g"] = normalizeRanks;
/* harmony export (immutable) */ __webpack_exports__["k"] = removeEmptyRanks;
/* harmony export (immutable) */ __webpack_exports__["a"] = addBorderNode;
/* harmony export (immutable) */ __webpack_exports__["f"] = maxRank;
/* harmony export (immutable) */ __webpack_exports__["i"] = partition;
/* harmony export (immutable) */ __webpack_exports__["n"] = time;
/* harmony export (immutable) */ __webpack_exports__["h"] = notime;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__);



/*
 * Adds a dummy node to the graph and return v.
 */
function addDummyNode (g, type, attrs, name) {
  var v
  do {
    v = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.uniqueId(name)
  } while (g.hasNode(v))

  attrs.dummy = type
  g.setNode(v, attrs)
  return v
}

/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */
function simplify (g) {
  var simplified = new __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__["Graph"]().setGraph(g.graph())
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) { simplified.setNode(v, g.node(v)) })
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 }
    var label = g.edge(e)
    simplified.setEdge(e.v, e.w, {
      weight: simpleLabel.weight + label.weight,
      minlen: Math.max(simpleLabel.minlen, label.minlen)
    })
  })
  return simplified
}

function asNonCompoundGraph (g) {
  var simplified = new __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__["Graph"]({ multigraph: g.isMultigraph() }).setGraph(g.graph())
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    if (!g.children(v).length) {
      simplified.setNode(v, g.node(v))
    }
  })
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    simplified.setEdge(e, g.edge(e))
  })
  return simplified
}

function successorWeights (g) {
  var weightMap = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(g.nodes(), function (v) {
    var sucs = {}
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.outEdges(v), function (e) {
      sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight
    })
    return sucs
  })
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.zipObject(g.nodes(), weightMap)
}

function predecessorWeights (g) {
  var weightMap = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(g.nodes(), function (v) {
    var preds = {}
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.inEdges(v), function (e) {
      preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight
    })
    return preds
  })
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.zipObject(g.nodes(), weightMap)
}

/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */
function intersectRect (rect, point) {
  var x = rect.x
  var y = rect.y

  // Rectangle intersection algorithm from:
  // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
  var dx = point.x - x
  var dy = point.y - y
  var w = rect.width / 2
  var h = rect.height / 2

  if (!dx && !dy) {
    throw new Error('Not possible to find intersection inside of the rectangle')
  }

  var sx, sy
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    // Intersection is top or bottom of rect.
    if (dy < 0) {
      h = -h
    }
    sx = h * dx / dy
    sy = h
  } else {
    // Intersection is left or right of rect.
    if (dx < 0) {
      w = -w
    }
    sx = w
    sy = w * dy / dx
  }

  return { x: x + sx, y: y + sy }
}

/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * function will produce a matrix with the ids of each node.
 */
function buildLayerMatrix (g) {
  var layering = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.range(maxRank(g) + 1), function () { return [] })
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    var node = g.node(v)
    var rank = node.rank
    if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(rank)) {
      layering[rank][node.order] = v
    }
  })
  return layering
}

/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */
function normalizeRanks (g) {
  var min = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.min(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(g.nodes(), function (v) { return g.node(v).rank }))
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    var node = g.node(v)
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(node, 'rank')) {
      node.rank -= min
    }
  })
}

function removeEmptyRanks (g) {
  // Ranks may not start at 0, so we need to offset them
  var offset = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.min(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(g.nodes(), function (v) { return g.node(v).rank }))

  var layers = []
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    var rank = g.node(v).rank - offset
    if (!layers[rank]) {
      layers[rank] = []
    }
    layers[rank].push(v)
  })

  var delta = 0
  var nodeRankFactor = g.graph().nodeRankFactor
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layers, function (vs, i) {
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(vs) && i % nodeRankFactor !== 0) {
      --delta
    } else if (delta) {
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(vs, function (v) { g.node(v).rank += delta })
    }
  })
}

function addBorderNode (g, prefix, rank, order) {
  var node = {
    width: 0,
    height: 0
  }
  if (arguments.length >= 4) {
    node.rank = rank
    node.order = order
  }
  return addDummyNode(g, 'border', node, prefix)
}

function maxRank (g) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(g.nodes(), function (v) {
    var rank = g.node(v).rank
    if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(rank)) {
      return rank
    }
  }))
}

/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * function returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */
function partition (collection, fn) {
  var result = { lhs: [], rhs: [] }
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(collection, function (value) {
    if (fn(value)) {
      result.lhs.push(value)
    } else {
      result.rhs.push(value)
    }
  })
  return result
}

/*
 * Returns a new function that wraps `fn` with a timer. The wrapper logs the
 * time it takes to execute the function.
 */
function time (name, fn) {
  var start = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.now()
  try {
    return fn()
  } finally {
    console.log(name + ' time: ' + (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.now() - start) + 'ms')
  }
}

function notime (name, fn) {
  return fn()
}

/* unused harmony default export */ var _unused_webpack_default_export = ({
  addBorderNode,
  addDummyNode,
  asNonCompoundGraph,
  buildLayerMatrix,
  intersectRect,
  maxRank,
  partition,
  predecessorWeights,
  normalizeRanks,
  notime,
  removeEmptyRanks,
  simplify,
  successorWeights,
  time
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014, Chris Pettitt
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

 var alg = __webpack_require__(13)
 var Graph = __webpack_require__(3)
 var json = __webpack_require__(22)

 module.exports = {
   alg: alg,
   Graph: Graph,
   json: json
 }


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_EDGE_NAME = '\x00';
var GRAPH_NODE = '\x00';
var EDGE_KEY_DELIM = '\x01';

// Implementation notes:
//
//  * Node id query functions should return string ids for the nodes
//  * Edge id query functions should return an "edgeObj", edge object, that is
//    composed of enough information to uniquely identify an edge: {v, w, name}.
//  * Internally we use an "edgeId", a stringified form of the edgeObj, to
//    reference edges. This is because we need a performant way to look these
//    edges up and, object properties, which have string keys, are the closest
//    we're going to get to a performant hashtable in JavaScript.

function Graph(opts) {
  this._isDirected = _lodash2.default.has(opts, 'directed') ? opts.directed : true;
  this._isMultigraph = _lodash2.default.has(opts, 'multigraph') ? opts.multigraph : false;
  this._isCompound = _lodash2.default.has(opts, 'compound') ? opts.compound : false;

  // Label for the graph itself
  this._label = undefined;

  // Defaults to be set when creating a new node
  this._defaultNodeLabelFn = _lodash2.default.constant(undefined);

  // Defaults to be set when creating a new edge
  this._defaultEdgeLabelFn = _lodash2.default.constant(undefined);

  // v -> label
  this._nodes = {};

  if (this._isCompound) {
    // v -> parent
    this._parent = {};

    // v -> children
    this._children = {};
    this._children[GRAPH_NODE] = {};
  }

  // v -> edgeObj
  this._in = {};

  // u -> v -> Number
  this._preds = {};

  // v -> edgeObj
  this._out = {};

  // v -> w -> Number
  this._sucs = {};

  // e -> edgeObj
  this._edgeObjs = {};

  // e -> label
  this._edgeLabels = {};
}

/* Number of nodes in the graph. Should only be changed by the implementation. */
Graph.prototype._nodeCount = 0;

/* Number of edges in the graph. Should only be changed by the implementation. */
Graph.prototype._edgeCount = 0;

/* === Graph functions ========= */

Graph.prototype.isDirected = function () {
  return this._isDirected;
};

Graph.prototype.isMultigraph = function () {
  return this._isMultigraph;
};

Graph.prototype.isCompound = function () {
  return this._isCompound;
};

Graph.prototype.setGraph = function (label) {
  this._label = label;
  return this;
};

Graph.prototype.graph = function () {
  return this._label;
};

/* === Node functions ========== */

Graph.prototype.setDefaultNodeLabel = function (newDefault) {
  if (!_lodash2.default.isFunction(newDefault)) {
    newDefault = _lodash2.default.constant(newDefault);
  }
  this._defaultNodeLabelFn = newDefault;
  return this;
};

Graph.prototype.nodeCount = function () {
  return this._nodeCount;
};

Graph.prototype.nodes = function () {
  return _lodash2.default.keys(this._nodes);
};

Graph.prototype.sources = function () {
  return _lodash2.default.filter(this.nodes(), _lodash2.default.bind(function (v) {
    return _lodash2.default.isEmpty(this._in[v]);
  }, this));
};

Graph.prototype.sinks = function () {
  return _lodash2.default.filter(this.nodes(), _lodash2.default.bind(function (v) {
    return _lodash2.default.isEmpty(this._out[v]);
  }, this));
};

Graph.prototype.setNodes = function (vs, value) {
  var args = arguments;
  _lodash2.default.each(vs, _lodash2.default.bind(function (v) {
    if (args.length > 1) {
      this.setNode(v, value);
    } else {
      this.setNode(v);
    }
  }, this));
  return this;
};

Graph.prototype.setNode = function (v, value) {
  if (_lodash2.default.has(this._nodes, v)) {
    if (arguments.length > 1) {
      this._nodes[v] = value;
    }
    return this;
  }

  this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
  if (this._isCompound) {
    this._parent[v] = GRAPH_NODE;
    this._children[v] = {};
    this._children[GRAPH_NODE][v] = true;
  }
  this._in[v] = {};
  this._preds[v] = {};
  this._out[v] = {};
  this._sucs[v] = {};
  ++this._nodeCount;
  return this;
};

Graph.prototype.node = function (v) {
  return this._nodes[v];
};

Graph.prototype.hasNode = function (v) {
  return _lodash2.default.has(this._nodes, v);
};

Graph.prototype.removeNode = function (v) {
  var self = this;
  if (_lodash2.default.has(this._nodes, v)) {
    var removeEdge = function removeEdge(e) {
      self.removeEdge(self._edgeObjs[e]);
    };
    delete this._nodes[v];
    if (this._isCompound) {
      this._removeFromParentsChildList(v);
      delete this._parent[v];
      _lodash2.default.each(this.children(v), _lodash2.default.bind(function (child) {
        this.setParent(child);
      }, this));
      delete this._children[v];
    }
    _lodash2.default.each(_lodash2.default.keys(this._in[v]), removeEdge);
    delete this._in[v];
    delete this._preds[v];
    _lodash2.default.each(_lodash2.default.keys(this._out[v]), removeEdge);
    delete this._out[v];
    delete this._sucs[v];
    --this._nodeCount;
  }
  return this;
};

Graph.prototype.setParent = function (v, parent) {
  if (!this._isCompound) {
    throw new Error('Cannot set parent in a non-compound graph');
  }

  if (_lodash2.default.isUndefined(parent)) {
    parent = GRAPH_NODE;
  } else {
    // Coerce parent to string
    parent += '';
    for (var ancestor = parent; !_lodash2.default.isUndefined(ancestor); ancestor = this.parent(ancestor)) {
      if (ancestor === v) {
        throw new Error('Setting ' + parent + ' as parent of ' + v + ' would create create a cycle');
      }
    }

    this.setNode(parent);
  }

  this.setNode(v);
  this._removeFromParentsChildList(v);
  this._parent[v] = parent;
  this._children[parent][v] = true;
  return this;
};

Graph.prototype._removeFromParentsChildList = function (v) {
  delete this._children[this._parent[v]][v];
};

Graph.prototype.parent = function (v) {
  if (this._isCompound) {
    var parent = this._parent[v];
    if (parent !== GRAPH_NODE) {
      return parent;
    }
  }
};

Graph.prototype.children = function (v) {
  if (_lodash2.default.isUndefined(v)) {
    v = GRAPH_NODE;
  }

  if (this._isCompound) {
    var children = this._children[v];
    if (children) {
      return _lodash2.default.keys(children);
    }
  } else if (v === GRAPH_NODE) {
    return this.nodes();
  } else if (this.hasNode(v)) {
    return [];
  }
};

Graph.prototype.predecessors = function (v) {
  var predsV = this._preds[v];
  if (predsV) {
    return _lodash2.default.keys(predsV);
  }
};

Graph.prototype.successors = function (v) {
  var sucsV = this._sucs[v];
  if (sucsV) {
    return _lodash2.default.keys(sucsV);
  }
};

Graph.prototype.neighbors = function (v) {
  var preds = this.predecessors(v);
  if (preds) {
    return _lodash2.default.union(preds, this.successors(v));
  }
};

Graph.prototype.filterNodes = function (filter) {
  var copy = new this.constructor({
    directed: this._isDirected,
    multigraph: this._isMultigraph,
    compound: this._isCompound
  });

  copy.setGraph(this.graph());

  _lodash2.default.each(this._nodes, _lodash2.default.bind(function (value, v) {
    if (filter(v)) {
      copy.setNode(v, value);
    }
  }, this));

  _lodash2.default.each(this._edgeObjs, _lodash2.default.bind(function (e) {
    if (copy.hasNode(e.v) && copy.hasNode(e.w)) {
      copy.setEdge(e, this.edge(e));
    }
  }, this));

  var self = this;
  var parents = {};
  function findParent(v) {
    var parent = self.parent(v);
    if (parent === undefined || copy.hasNode(parent)) {
      parents[v] = parent;
      return parent;
    } else if (parent in parents) {
      return parents[parent];
    } else {
      return findParent(parent);
    }
  }

  if (this._isCompound) {
    _lodash2.default.each(copy.nodes(), function (v) {
      copy.setParent(v, findParent(v));
    });
  }

  return copy;
};

/* === Edge functions ========== */

Graph.prototype.setDefaultEdgeLabel = function (newDefault) {
  if (!_lodash2.default.isFunction(newDefault)) {
    newDefault = _lodash2.default.constant(newDefault);
  }
  this._defaultEdgeLabelFn = newDefault;
  return this;
};

Graph.prototype.edgeCount = function () {
  return this._edgeCount;
};

Graph.prototype.edges = function () {
  return _lodash2.default.values(this._edgeObjs);
};

Graph.prototype.setPath = function (vs, value) {
  var self = this;
  var args = arguments;
  _lodash2.default.reduce(vs, function (v, w) {
    if (args.length > 1) {
      self.setEdge(v, w, value);
    } else {
      self.setEdge(v, w);
    }
    return w;
  });
  return this;
};

/*
 * setEdge(v, w, [value, [name]])
 * setEdge({ v, w, [name] }, [value])
 */
Graph.prototype.setEdge = function () {
  var v, w, name, value;
  var valueSpecified = false;
  var arg0 = arguments[0];

  if ((typeof arg0 === 'undefined' ? 'undefined' : _typeof(arg0)) === 'object' && arg0 !== null && 'v' in arg0) {
    v = arg0.v;
    w = arg0.w;
    name = arg0.name;
    if (arguments.length === 2) {
      value = arguments[1];
      valueSpecified = true;
    }
  } else {
    v = arg0;
    w = arguments[1];
    name = arguments[3];
    if (arguments.length > 2) {
      value = arguments[2];
      valueSpecified = true;
    }
  }

  v = '' + v;
  w = '' + w;
  if (!_lodash2.default.isUndefined(name)) {
    name = '' + name;
  }

  var e = edgeArgsToId(this._isDirected, v, w, name);
  if (_lodash2.default.has(this._edgeLabels, e)) {
    if (valueSpecified) {
      this._edgeLabels[e] = value;
    }
    return this;
  }

  if (!_lodash2.default.isUndefined(name) && !this._isMultigraph) {
    throw new Error('Cannot set a named edge when isMultigraph = false');
  }

  // It didn't exist, so we need to create it.
  // First ensure the nodes exist.
  this.setNode(v);
  this.setNode(w);

  this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);

  var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
  // Ensure we add undirected edges in a consistent way.
  v = edgeObj.v;
  w = edgeObj.w;

  Object.freeze(edgeObj);
  this._edgeObjs[e] = edgeObj;
  incrementOrInitEntry(this._preds[w], v);
  incrementOrInitEntry(this._sucs[v], w);
  this._in[w][e] = edgeObj;
  this._out[v][e] = edgeObj;
  this._edgeCount++;
  return this;
};

Graph.prototype.edge = function (v, w, name) {
  var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
  return this._edgeLabels[e];
};

Graph.prototype.hasEdge = function (v, w, name) {
  var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
  return _lodash2.default.has(this._edgeLabels, e);
};

Graph.prototype.removeEdge = function (v, w, name) {
  var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
  var edge = this._edgeObjs[e];
  if (edge) {
    v = edge.v;
    w = edge.w;
    delete this._edgeLabels[e];
    delete this._edgeObjs[e];
    decrementOrRemoveEntry(this._preds[w], v);
    decrementOrRemoveEntry(this._sucs[v], w);
    delete this._in[w][e];
    delete this._out[v][e];
    this._edgeCount--;
  }
  return this;
};

Graph.prototype.inEdges = function (v, u) {
  var inV = this._in[v];
  if (inV) {
    var edges = _lodash2.default.values(inV);
    if (!u) {
      return edges;
    }
    return _lodash2.default.filter(edges, function (edge) {
      return edge.v === u;
    });
  }
};

Graph.prototype.outEdges = function (v, w) {
  var outV = this._out[v];
  if (outV) {
    var edges = _lodash2.default.values(outV);
    if (!w) {
      return edges;
    }
    return _lodash2.default.filter(edges, function (edge) {
      return edge.w === w;
    });
  }
};

Graph.prototype.nodeEdges = function (v, w) {
  var inEdges = this.inEdges(v, w);
  if (inEdges) {
    return inEdges.concat(this.outEdges(v, w));
  }
};

function incrementOrInitEntry(map, k) {
  if (map[k]) {
    map[k]++;
  } else {
    map[k] = 1;
  }
}

function decrementOrRemoveEntry(map, k) {
  if (! --map[k]) {
    delete map[k];
  }
}

function edgeArgsToId(isDirected, v_, w_, name) {
  var v = '' + v_;
  var w = '' + w_;
  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM + (_lodash2.default.isUndefined(name) ? DEFAULT_EDGE_NAME : name);
}

function edgeArgsToObj(isDirected, v_, w_, name) {
  var v = '' + v_;
  var w = '' + w_;
  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  var edgeObj = { v: v, w: w };
  if (name) {
    edgeObj.name = name;
  }
  return edgeObj;
}

function edgeObjToId(isDirected, edgeObj) {
  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}

exports.default = Graph;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = longestPath;
/* harmony export (immutable) */ __webpack_exports__["b"] = slack;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


/*
 * Initializes ranks for the input graph using the longest path algorithm. This
 * algorithm scales well and is fast in practice, it yields rather poor
 * solutions. Nodes are pushed to the lowest layer possible, leaving the bottom
 * ranks wide and leaving edges longer than necessary. However, due to its
 * speed, this algorithm is good for getting an initial ranking that can be fed
 * into other algorithms.
 *
 * This algorithm does not normalize layers because it will be used by other
 * algorithms in most cases. If using this algorithm directly, be sure to
 * run normalize at the end.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG.
 *    2. Input graph node labels can be assigned properties.
 *
 * Post-conditions:
 *
 *    1. Each node will be assign an (unnormalized) "rank" property.
 */
function longestPath (g) {
  var visited = {}

  function dfs (v) {
    var label = g.node(v)
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(visited, v)) {
      return label.rank
    }
    visited[v] = true

    var rank = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.min(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(g.outEdges(v), function (e) {
      return dfs(e.w) - g.edge(e).minlen
    }))

    if (
      rank === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
      rank === undefined || // return value of _.map([]) for Lodash 4
      rank === null // return value of _.map([null])
    ) {
      rank = 0
    }

    return (label.rank = rank)
  }

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.sources(), dfs)
}

/*
 * Returns the amount of slack for the given edge. The slack is defined as the
 * difference between the length of the edge and its minimum length.
 */
function slack (g, e) {
  return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g, source, weightFn, edgeFn) {
  weightFn = weightFn || DEFAULT_WEIGHT_FUNC;
  edgeFn = edgeFn || function (v) {
    return g.outEdges(v);
  };
  return runDijkstra(g, String(source), weightFn, edgeFn);
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _priorityQueue = __webpack_require__(6);

var _priorityQueue2 = _interopRequireDefault(_priorityQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_WEIGHT_FUNC = _lodash2.default.constant(1);

function runDijkstra(g, source, weightFn, edgeFn) {
  var results = {};
  var pq = new _priorityQueue2.default();
  var v, vEntry;

  var updateNeighbors = function updateNeighbors(edge) {
    var w = edge.v !== v ? edge.v : edge.w;
    var wEntry = results[w];
    var weight = weightFn(edge);
    var distance = vEntry.distance + weight;

    if (weight < 0) {
      throw new Error('dijkstra does not allow negative edge weights. ' + 'Bad edge: ' + edge + ' Weight: ' + weight);
    }

    if (distance < wEntry.distance) {
      wEntry.distance = distance;
      wEntry.predecessor = v;
      pq.decrease(w, distance);
    }
  };

  g.nodes().forEach(function (v) {
    var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
    results[v] = { distance: distance };
    pq.add(v, distance);
  });

  while (pq.size() > 0) {
    v = pq.removeMin();
    vEntry = results[v];
    if (vEntry.distance === Number.POSITIVE_INFINITY) {
      break;
    }

    edgeFn(v).forEach(updateNeighbors);
  }

  return results;
}

module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A min-priority queue data structure. This algorithm is derived from Cormen,
 * et al., "Introduction to Algorithms". The basic idea of a min-priority
 * queue is that you can efficiently (in O(1) time) get the smallest key in
 * the queue. Adding and removing elements takes O(log n) time. A key can
 * have its priority decreased in O(log n) time.
 */
function PriorityQueue() {
  this._arr = [];
  this._keyIndices = {};
}

/**
 * Returns the number of elements in the queue. Takes `O(1)` time.
 */
PriorityQueue.prototype.size = function () {
  return this._arr.length;
};

/**
 * Returns the keys that are in the queue. Takes `O(n)` time.
 */
PriorityQueue.prototype.keys = function () {
  return this._arr.map(function (x) {
    return x.key;
  });
};

/**
 * Returns `true` if **key** is in the queue and `false` if not.
 */
PriorityQueue.prototype.has = function (key) {
  return _lodash2.default.has(this._keyIndices, key);
};

/**
 * Returns the priority for **key**. If **key** is not present in the queue
 * then this function returns `undefined`. Takes `O(1)` time.
 *
 * @param {Object} key
 */
PriorityQueue.prototype.priority = function (key) {
  var index = this._keyIndices[key];
  if (index !== undefined) {
    return this._arr[index].priority;
  }
};

/**
 * Returns the key for the minimum element in this queue. If the queue is
 * empty this function throws an Error. Takes `O(1)` time.
 */
PriorityQueue.prototype.min = function () {
  if (this.size() === 0) {
    throw new Error('Queue underflow');
  }
  return this._arr[0].key;
};

/**
 * Inserts a new key into the priority queue. If the key already exists in
 * the queue this function returns `false`; otherwise it will return `true`.
 * Takes `O(n)` time.
 *
 * @param {Object} key the key to add
 * @param {Number} priority the initial priority for the key
 */
PriorityQueue.prototype.add = function (key, priority) {
  var keyIndices = this._keyIndices;
  key = String(key);
  if (!_lodash2.default.has(keyIndices, key)) {
    var arr = this._arr;
    var index = arr.length;
    keyIndices[key] = index;
    arr.push({ key: key, priority: priority });
    this._decrease(index);
    return true;
  }
  return false;
};

/**
 * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
 */
PriorityQueue.prototype.removeMin = function () {
  this._swap(0, this._arr.length - 1);
  var min = this._arr.pop();
  delete this._keyIndices[min.key];
  this._heapify(0);
  return min.key;
};

/**
 * Decreases the priority for **key** to **priority**. If the new priority is
 * greater than the previous priority, this function will throw an Error.
 *
 * @param {Object} key the key for which to raise priority
 * @param {Number} priority the new priority for the key
 */
PriorityQueue.prototype.decrease = function (key, priority) {
  var index = this._keyIndices[key];
  if (priority > this._arr[index].priority) {
    throw new Error('New priority is greater than current priority. ' + 'Key: ' + key + ' Old: ' + this._arr[index].priority + ' New: ' + priority);
  }
  this._arr[index].priority = priority;
  this._decrease(index);
};

PriorityQueue.prototype._heapify = function (i) {
  var arr = this._arr;
  var l = 2 * i;
  var r = l + 1;
  var largest = i;
  if (l < arr.length) {
    largest = arr[l].priority < arr[largest].priority ? l : largest;
    if (r < arr.length) {
      largest = arr[r].priority < arr[largest].priority ? r : largest;
    }
    if (largest !== i) {
      this._swap(i, largest);
      this._heapify(largest);
    }
  }
};

PriorityQueue.prototype._decrease = function (index) {
  var arr = this._arr;
  var priority = arr[index].priority;
  var parent;
  while (index !== 0) {
    parent = index >> 1;
    if (arr[parent].priority < priority) {
      break;
    }
    this._swap(index, parent);
    index = parent;
  }
};

PriorityQueue.prototype._swap = function (i, j) {
  var arr = this._arr;
  var keyIndices = this._keyIndices;
  var origArrI = arr[i];
  var origArrJ = arr[j];
  arr[i] = origArrJ;
  arr[j] = origArrI;
  keyIndices[origArrJ.key] = i;
  keyIndices[origArrI.key] = j;
};

exports.default = PriorityQueue;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g) {
  var index = 0;
  var stack = [];
  var visited = {}; // node id -> { onStack, lowlink, index }
  var results = [];

  function dfs(v) {
    var entry = visited[v] = {
      onStack: true,
      lowlink: index,
      index: index++
    };
    stack.push(v);

    g.successors(v).forEach(function (w) {
      if (!_lodash2.default.has(visited, w)) {
        dfs(w);
        entry.lowlink = Math.min(entry.lowlink, visited[w].lowlink);
      } else if (visited[w].onStack) {
        entry.lowlink = Math.min(entry.lowlink, visited[w].index);
      }
    });

    if (entry.lowlink === entry.index) {
      var cmpt = [];
      var w;
      do {
        w = stack.pop();
        visited[w].onStack = false;
        cmpt.push(w);
      } while (v !== w);
      results.push(cmpt);
    }
  }

  g.nodes().forEach(function (v) {
    if (!_lodash2.default.has(visited, v)) {
      dfs(v);
    }
  });

  return results;
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CycleException() {}

function topsort(g) {
  var visited = {};
  var stack = {};
  var results = [];

  function visit(node) {
    if (_lodash2.default.has(stack, node)) {
      throw new CycleException();
    }

    if (!_lodash2.default.has(visited, node)) {
      stack[node] = true;
      visited[node] = true;
      _lodash2.default.each(g.predecessors(node), visit);
      delete stack[node];
      results.push(node);
    }
  }

  _lodash2.default.each(g.sinks(), visit);

  if (_lodash2.default.size(visited) !== g.nodeCount()) {
    throw new CycleException();
  }

  return results;
}

topsort.CycleException = CycleException;

exports.default = topsort;
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g, vs, order) {
  if (!_lodash2.default.isArray(vs)) {
    vs = [vs];
  }

  var navigation = (g.isDirected() ? g.successors : g.neighbors).bind(g);

  var acc = [];
  var visited = {};
  _lodash2.default.each(vs, function (v) {
    if (!g.hasNode(v)) {
      throw new Error('Graph does not have node: ' + v);
    }

    doDfs(g, v, order === 'post', visited, navigation, acc);
  });
  return acc;
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function doDfs(g, v, postorder, visited, navigation, acc) {
  if (!_lodash2.default.has(visited, v)) {
    visited[v] = true;

    if (!postorder) {
      acc.push(v);
    }
    _lodash2.default.each(navigation(v), function (w) {
      doDfs(g, w, postorder, visited, navigation, acc);
    });
    if (postorder) {
      acc.push(v);
    }
  }
}

/*
 * A helper that preforms a pre- or post-order traversal on the input graph
 * and returns the nodes in the order they were visited. If the graph is
 * undirected then this algorithm will navigate using neighbors. If the graph
 * is directed then this algorithm will navigate using successors.
 *
 * Order must be one of "pre" or "post".
 */
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = feasibleTree;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(4);





/*
 * Finds a maximal tree of tight edges and returns the number of nodes in the
 * tree.
 */
function tightTree (t, g) {
  function dfs (v) {
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodeEdges(v), function (e) {
      var edgeV = e.v
      var w = (v === edgeV) ? e.w : edgeV
      if (!t.hasNode(w) && !Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* slack */])(g, e)) {
        t.setNode(w, {})
        t.setEdge(v, w, {})
        dfs(w)
      }
    })
  }

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(t.nodes(), dfs)
  return t.nodeCount()
}

/*
 * Finds the edge with the smallest slack that is incident on tree and returns
 * it.
 */
function findMinSlackEdge (t, g) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.minBy(g.edges(), function (e) {
    if (t.hasNode(e.v) !== t.hasNode(e.w)) {
      return Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* slack */])(g, e)
    }
  })
}

function shiftRanks (t, g, delta) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(t.nodes(), function (v) {
    g.node(v).rank += delta
  })
}

/*
 * Constructs a spanning tree with tight edges and adjusted the input node's
 * ranks to achieve this. A tight edge is one that is has a length that matches
 * its "minlen" attribute.
 *
 * The basic structure for this function is derived from Gansner, et al., "A
 * Technique for Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a DAG.
 *    2. Graph must be connected.
 *    3. Graph must have at least one node.
 *    5. Graph nodes must have been previously assigned a "rank" property that
 *       respects the "minlen" property of incident edges.
 *    6. Graph edges must have a "minlen" property.
 *
 * Post-conditions:
 *
 *    - Graph nodes will have their rank adjusted to ensure that all edges are
 *      tight.
 *
 * Returns a tree (undirected graph) that is constructed using only "tight"
 * edges.
 */
function feasibleTree (g) {
  var t = new __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__["Graph"]({ directed: false })

  // Choose arbitrary node from which to start our tree
  var start = g.nodes()[0]
  var size = g.nodeCount()
  t.setNode(start, {})

  var edge, delta
  while (tightTree(t, g) < size) {
    edge = findMinSlackEdge(t, g)
    delta = t.hasNode(edge.v) ? Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* slack */])(g, edge) : -Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* slack */])(g, edge)
    shiftRanks(t, g, delta)
  }

  return t
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "util", function() { return util; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_debug__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_layout__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "layout", function() { return __WEBPACK_IMPORTED_MODULE_1__src_layout__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_util__ = __webpack_require__(1);
/*
Copyright (c) 2012-2014 Chris Pettitt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/



var debug = {
  debugOrdering: __WEBPACK_IMPORTED_MODULE_0__src_debug__["a" /* debugOrdering */]
}





var util = {
  addBorderNode: __WEBPACK_IMPORTED_MODULE_2__src_util__["a" /* addBorderNode */],
  addDummyNode: __WEBPACK_IMPORTED_MODULE_2__src_util__["b" /* addDummyNode */],
  asNonCompoundGraph: __WEBPACK_IMPORTED_MODULE_2__src_util__["c" /* asNonCompoundGraph */],
  buildLayerMatrix: __WEBPACK_IMPORTED_MODULE_2__src_util__["d" /* buildLayerMatrix */],
  intersectRect: __WEBPACK_IMPORTED_MODULE_2__src_util__["e" /* intersectRect */],
  maxRank: __WEBPACK_IMPORTED_MODULE_2__src_util__["f" /* maxRank */],
  normalizeRanks: __WEBPACK_IMPORTED_MODULE_2__src_util__["g" /* normalizeRanks */],
  notime: __WEBPACK_IMPORTED_MODULE_2__src_util__["h" /* notime */],
  partition: __WEBPACK_IMPORTED_MODULE_2__src_util__["i" /* partition */],
  predecessorWeights: __WEBPACK_IMPORTED_MODULE_2__src_util__["j" /* predecessorWeights */],
  removeEmptyRanks: __WEBPACK_IMPORTED_MODULE_2__src_util__["k" /* removeEmptyRanks */],
  simplify: __WEBPACK_IMPORTED_MODULE_2__src_util__["l" /* simplify */],
  successorWeights: __WEBPACK_IMPORTED_MODULE_2__src_util__["m" /* successorWeights */],
  time: __WEBPACK_IMPORTED_MODULE_2__src_util__["n" /* time */]
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = debugOrdering;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ciena_graphlib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ciena_graphlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ciena_graphlib__);




function debugOrdering (g) {
  var layerMatrix = Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* buildLayerMatrix */])(g)

  var h = new __WEBPACK_IMPORTED_MODULE_2_ciena_graphlib__["Graph"]({ compound: true, multigraph: true }).setGraph({})

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    h.setNode(v, { label: v })
    h.setParent(v, 'layer' + g.node(v).rank)
  })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    h.setEdge(e.v, e.w, {}, e.name)
  })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layerMatrix, function (layer, i) {
    var layerV = 'layer' + i
    h.setNode(layerV, { rank: 'same' })
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(layer, function (u, v) {
      h.setEdge(u, v, { style: 'invis' })
      return v
    })
  })

  return h
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topsort = exports.tarjan = exports.prim = exports.preorder = exports.postorder = exports.isAcyclic = exports.floydWarshall = exports.findCycles = exports.dijkstraAll = exports.dijkstra = exports.components = undefined;

var _components = __webpack_require__(14);

var _components2 = _interopRequireDefault(_components);

var _dijkstra = __webpack_require__(5);

var _dijkstra2 = _interopRequireDefault(_dijkstra);

var _dijkstraAll = __webpack_require__(15);

var _dijkstraAll2 = _interopRequireDefault(_dijkstraAll);

var _findCycles = __webpack_require__(16);

var _findCycles2 = _interopRequireDefault(_findCycles);

var _floydWarshall = __webpack_require__(17);

var _floydWarshall2 = _interopRequireDefault(_floydWarshall);

var _isAcyclic = __webpack_require__(18);

var _isAcyclic2 = _interopRequireDefault(_isAcyclic);

var _postorder = __webpack_require__(19);

var _postorder2 = _interopRequireDefault(_postorder);

var _preorder = __webpack_require__(20);

var _preorder2 = _interopRequireDefault(_preorder);

var _prim = __webpack_require__(21);

var _prim2 = _interopRequireDefault(_prim);

var _tarjan = __webpack_require__(7);

var _tarjan2 = _interopRequireDefault(_tarjan);

var _topsort = __webpack_require__(8);

var _topsort2 = _interopRequireDefault(_topsort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.components = _components2.default;
exports.dijkstra = _dijkstra2.default;
exports.dijkstraAll = _dijkstraAll2.default;
exports.findCycles = _findCycles2.default;
exports.floydWarshall = _floydWarshall2.default;
exports.isAcyclic = _isAcyclic2.default;
exports.postorder = _postorder2.default;
exports.preorder = _preorder2.default;
exports.prim = _prim2.default;
exports.tarjan = _tarjan2.default;
exports.topsort = _topsort2.default;
exports.default = {
  components: _components2.default,
  dijkstra: _dijkstra2.default,
  dijkstraAll: _dijkstraAll2.default,
  findCycles: _findCycles2.default,
  floydWarshall: _floydWarshall2.default,
  isAcyclic: _isAcyclic2.default,
  postorder: _postorder2.default,
  preorder: _preorder2.default,
  prim: _prim2.default,
  tarjan: _tarjan2.default,
  topsort: _topsort2.default
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g) {
  var visited = {};
  var cmpts = [];
  var cmpt;

  function dfs(v) {
    if (_lodash2.default.has(visited, v)) return;
    visited[v] = true;
    cmpt.push(v);
    _lodash2.default.each(g.successors(v), dfs);
    _lodash2.default.each(g.predecessors(v), dfs);
  }

  _lodash2.default.each(g.nodes(), function (v) {
    cmpt = [];
    dfs(v);
    if (cmpt.length) {
      cmpts.push(cmpt);
    }
  });

  return cmpts;
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g, weightFunc, edgeFunc) {
  return _lodash2.default.transform(g.nodes(), function (acc, v) {
    acc[v] = (0, _dijkstra2.default)(g, v, weightFunc, edgeFunc);
  }, {});
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _dijkstra = __webpack_require__(5);

var _dijkstra2 = _interopRequireDefault(_dijkstra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g) {
  return _lodash2.default.filter((0, _tarjan2.default)(g), function (cmpt) {
    return cmpt.length > 1 || cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]);
  });
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _tarjan = __webpack_require__(7);

var _tarjan2 = _interopRequireDefault(_tarjan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g, weightFn, edgeFn) {
  weightFn = weightFn || DEFAULT_WEIGHT_FUNC;
  edgeFn = edgeFn || function (v) {
    return g.outEdges(v);
  };
  return runFloydWarshall(g, weightFn, edgeFn);
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_WEIGHT_FUNC = _lodash2.default.constant(1);

function runFloydWarshall(g, weightFn, edgeFn) {
  var results = {};
  var nodes = g.nodes();

  nodes.forEach(function (v) {
    results[v] = {};
    results[v][v] = { distance: 0 };
    nodes.forEach(function (w) {
      if (v !== w) {
        results[v][w] = { distance: Number.POSITIVE_INFINITY };
      }
    });
    edgeFn(v).forEach(function (edge) {
      var w = edge.v === v ? edge.w : edge.v;
      var d = weightFn(edge);
      results[v][w] = { distance: d, predecessor: v };
    });
  });

  nodes.forEach(function (k) {
    var rowK = results[k];
    nodes.forEach(function (i) {
      var rowI = results[i];
      nodes.forEach(function (j) {
        var ik = rowI[k];
        var kj = rowK[j];
        var ij = rowI[j];
        var altDistance = ik.distance + kj.distance;
        if (altDistance < ij.distance) {
          ij.distance = altDistance;
          ij.predecessor = kj.predecessor;
        }
      });
    });
  });

  return results;
}

module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g) {
  try {
    (0, _topsort2.default)(g);
  } catch (e) {
    if (e instanceof _topsort2.default.CycleException) {
      return false;
    }
    throw e;
  }
  return true;
};

var _topsort = __webpack_require__(8);

var _topsort2 = _interopRequireDefault(_topsort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g, vs) {
  return (0, _dfs2.default)(g, vs, 'post');
};

var _dfs = __webpack_require__(9);

var _dfs2 = _interopRequireDefault(_dfs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g, vs) {
  return (0, _dfs2.default)(g, vs, 'pre');
};

var _dfs = __webpack_require__(9);

var _dfs2 = _interopRequireDefault(_dfs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (g, weightFunc) {
  var result = new _graph2.default();
  var parents = {};
  var pq = new _priorityQueue2.default();
  var v;

  function updateNeighbors(edge) {
    var w = edge.v === v ? edge.w : edge.v;
    var pri = pq.priority(w);
    if (pri !== undefined) {
      var edgeWeight = weightFunc(edge);
      if (edgeWeight < pri) {
        parents[w] = v;
        pq.decrease(w, edgeWeight);
      }
    }
  }

  if (g.nodeCount() === 0) {
    return result;
  }

  _lodash2.default.each(g.nodes(), function (v) {
    pq.add(v, Number.POSITIVE_INFINITY);
    result.setNode(v);
  });

  // Start from an arbitrary node
  pq.decrease(g.nodes()[0], 0);

  var init = false;
  while (pq.size() > 0) {
    v = pq.removeMin();
    if (_lodash2.default.has(parents, v)) {
      result.setEdge(v, parents[v]);
    } else if (init) {
      throw new Error('Input graph is not connected: ' + g);
    } else {
      init = true;
    }

    g.nodeEdges(v).forEach(updateNeighbors);
  }

  return result;
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _graph = __webpack_require__(3);

var _graph2 = _interopRequireDefault(_graph);

var _priorityQueue = __webpack_require__(6);

var _priorityQueue2 = _interopRequireDefault(_priorityQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.read = read;
exports.write = write;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _graph = __webpack_require__(3);

var _graph2 = _interopRequireDefault(_graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeNodes(g) {
  return _lodash2.default.map(g.nodes(), function (v) {
    var nodeValue = g.node(v);
    var parent = g.parent(v);
    var node = { v: v };
    if (!_lodash2.default.isUndefined(nodeValue)) {
      node.value = nodeValue;
    }
    if (!_lodash2.default.isUndefined(parent)) {
      node.parent = parent;
    }
    return node;
  });
}

function writeEdges(g) {
  return _lodash2.default.map(g.edges(), function (e) {
    var edgeValue = g.edge(e);
    var edge = { v: e.v, w: e.w };
    if (!_lodash2.default.isUndefined(e.name)) {
      edge.name = e.name;
    }
    if (!_lodash2.default.isUndefined(edgeValue)) {
      edge.value = edgeValue;
    }
    return edge;
  });
}

function read(json) {
  var g = new _graph2.default(json.options).setGraph(json.value);
  _lodash2.default.each(json.nodes, function (entry) {
    g.setNode(entry.v, entry.value);
    if (entry.parent) {
      g.setParent(entry.v, entry.parent);
    }
  });
  _lodash2.default.each(json.edges, function (entry) {
    g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);
  });
  return g;
}

function write(g) {
  var json = {
    options: {
      directed: g.isDirected(),
      multigraph: g.isMultigraph(),
      compound: g.isCompound()
    },
    nodes: writeNodes(g),
    edges: writeEdges(g)
  };
  if (!_lodash2.default.isUndefined(g.graph())) {
    json.value = _lodash2.default.clone(g.graph());
  }
  return json;
}

exports.default = {
  write: write,
  read: read
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = layout;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__acyclic__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__normalize__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rank__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parent_dummy_chains__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nesting_graph__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__add_border_segments__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__coordinate_system__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__order__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__position__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ciena_graphlib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ciena_graphlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ciena_graphlib__);






















function runLayout (g, time) {
  time('    makeSpaceForEdgeLabels', function () { makeSpaceForEdgeLabels(g) })
  time('    removeSelfEdges', function () { removeSelfEdges(g) })
  time('    acyclic', function () { Object(__WEBPACK_IMPORTED_MODULE_1__acyclic__["a" /* run */])(g) })
  time('    nestingGraph.run', function () { Object(__WEBPACK_IMPORTED_MODULE_6__nesting_graph__["b" /* run */])(g) })
  time('    rank', function () { Object(__WEBPACK_IMPORTED_MODULE_3__rank__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4__util__["c" /* asNonCompoundGraph */])(g)) })
  time('    injectEdgeLabelProxies', function () { injectEdgeLabelProxies(g) })
  time('    removeEmptyRanks', function () { Object(__WEBPACK_IMPORTED_MODULE_4__util__["k" /* removeEmptyRanks */])(g) })
  time('    nestingGraph.cleanup', function () { Object(__WEBPACK_IMPORTED_MODULE_6__nesting_graph__["a" /* cleanup */])(g) })
  time('    normalizeRanks', function () { Object(__WEBPACK_IMPORTED_MODULE_4__util__["g" /* normalizeRanks */])(g) })
  time('    assignRankMinMax', function () { assignRankMinMax(g) })
  time('    removeEdgeLabelProxies', function () { removeEdgeLabelProxies(g) })
  time('    normalize.run', function () { Object(__WEBPACK_IMPORTED_MODULE_2__normalize__["a" /* run */])(g) })
  time('    parentDummyChains', function () { Object(__WEBPACK_IMPORTED_MODULE_5__parent_dummy_chains__["a" /* default */])(g) })
  time('    addBorderSegments', function () { Object(__WEBPACK_IMPORTED_MODULE_7__add_border_segments__["a" /* default */])(g) })
  time('    order', function () { Object(__WEBPACK_IMPORTED_MODULE_9__order__["a" /* default */])(g) })
  time('    insertSelfEdges', function () { insertSelfEdges(g) })
  time('    adjustCoordinateSystem', function () { Object(__WEBPACK_IMPORTED_MODULE_8__coordinate_system__["a" /* adjust */])(g) })
  time('    position', function () { Object(__WEBPACK_IMPORTED_MODULE_10__position__["a" /* default */])(g) })
  time('    positionSelfEdges', function () { positionSelfEdges(g) })
  time('    removeBorderNodes', function () { removeBorderNodes(g) })
  time('    normalize.undo', function () { Object(__WEBPACK_IMPORTED_MODULE_2__normalize__["b" /* undo */])(g) })
  time('    fixupEdgeLabelCoords', function () { fixupEdgeLabelCoords(g) })
  time('    undoCoordinateSystem', function () { Object(__WEBPACK_IMPORTED_MODULE_8__coordinate_system__["b" /* undo */])(g) })
  time('    translateGraph', function () { translateGraph(g) })
  time('    assignNodeIntersects', function () { assignNodeIntersects(g) })
  time('    reversePoints', function () { reversePointsForReversedEdges(g) })
  time('    acyclic.undo', function () { Object(__WEBPACK_IMPORTED_MODULE_1__acyclic__["b" /* undo */])(g) })
}

/*
 * Copies final layout information from the layout graph back to the input
 * graph. This process only copies whitelisted attributes from the layout graph
 * to the input graph, so it serves as a good place to determine what
 * attributes can influence layout.
 */
function updateInputGraph (inputGraph, layoutGraph) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(inputGraph.nodes(), function (v) {
    var inputLabel = inputGraph.node(v)
    var layoutLabel = layoutGraph.node(v)

    if (inputLabel) {
      inputLabel.x = layoutLabel.x
      inputLabel.y = layoutLabel.y

      if (layoutGraph.children(v).length) {
        inputLabel.width = layoutLabel.width
        inputLabel.height = layoutLabel.height
      }
    }
  })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(inputGraph.edges(), function (e) {
    var inputLabel = inputGraph.edge(e)
    var layoutLabel = layoutGraph.edge(e)

    inputLabel.points = layoutLabel.points
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(layoutLabel, 'x')) {
      inputLabel.x = layoutLabel.x
      inputLabel.y = layoutLabel.y
    }
  })

  inputGraph.graph().width = layoutGraph.graph().width
  inputGraph.graph().height = layoutGraph.graph().height
}

var graphNumAttrs = ['nodesep', 'edgesep', 'ranksep', 'marginx', 'marginy']
var graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: 'tb' }
var graphAttrs = ['acyclicer', 'ranker', 'rankdir', 'align']
var nodeNumAttrs = ['width', 'height']
var nodeDefaults = { width: 0, height: 0 }
var edgeNumAttrs = ['minlen', 'weight', 'width', 'height', 'labeloffset']
var edgeDefaults = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: 'r'
}
var edgeAttrs = ['labelpos']

/*
 * Constructs a new graph from the input graph, which can be used for layout.
 * This process copies only whitelisted attributes from the input graph to the
 * layout graph. Thus this function serves as a good place to determine what
 * attributes can influence layout.
 */
function buildLayoutGraph (inputGraph) {
  var g = new __WEBPACK_IMPORTED_MODULE_11_ciena_graphlib__["Graph"]({ multigraph: true, compound: true })
  var graph = canonicalize(inputGraph.graph())

  g.setGraph(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.merge({},
    graphDefaults,
    selectNumberAttrs(graph, graphNumAttrs),
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.pick(graph, graphAttrs)))

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(inputGraph.nodes(), function (v) {
    var node = canonicalize(inputGraph.node(v))
    g.setNode(v, __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.defaults(selectNumberAttrs(node, nodeNumAttrs), nodeDefaults))
    g.setParent(v, inputGraph.parent(v))
  })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(inputGraph.edges(), function (e) {
    var edge = canonicalize(inputGraph.edge(e))
    g.setEdge(e, __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.merge({},
      edgeDefaults,
      selectNumberAttrs(edge, edgeNumAttrs),
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.pick(edge, edgeAttrs)))
  })

  return g
}

/*
 * This idea comes from the Gansner paper: to account for edge labels in our
 * layout we split each rank in half by doubling minlen and halving ranksep.
 * Then we can place labels at these mid-points between nodes.
 *
 * We also add some minimal padding to the width to push the label for the edge
 * away from the edge itself a bit.
 */
function makeSpaceForEdgeLabels (g) {
  var graph = g.graph()
  graph.ranksep /= 2
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    edge.minlen *= 2
    if (edge.labelpos.toLowerCase() !== 'c') {
      if (graph.rankdir === 'TB' || graph.rankdir === 'BT') {
        edge.width += edge.labeloffset
      } else {
        edge.height += edge.labeloffset
      }
    }
  })
}

/*
 * Creates temporary dummy nodes that capture the rank in which each edge's
 * label is going to, if it has one of non-zero width and height. We do this
 * so that we can safely remove empty ranks while preserving balance for the
 * label's position.
 */
function injectEdgeLabelProxies (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    if (edge.width && edge.height) {
      var v = g.node(e.v)
      var w = g.node(e.w)
      var label = { rank: (w.rank - v.rank) / 2 + v.rank, e: e }
      Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* addDummyNode */])(g, 'edge-proxy', label, '_ep')
    }
  })
}

function assignRankMinMax (g) {
  var maxRank = 0
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    var node = g.node(v)
    if (node.borderTop) {
      node.minRank = g.node(node.borderTop).rank
      node.maxRank = g.node(node.borderBottom).rank
      maxRank = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(maxRank, node.maxRank)
    }
  })
  g.graph().maxRank = maxRank
}

function removeEdgeLabelProxies (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    var node = g.node(v)
    if (node.dummy === 'edge-proxy') {
      g.edge(node.e).labelRank = node.rank
      g.removeNode(v)
    }
  })
}

function translateGraph (g) {
  var minX = Number.POSITIVE_INFINITY
  var maxX = 0
  var minY = Number.POSITIVE_INFINITY
  var maxY = 0
  var graphLabel = g.graph()
  var marginX = graphLabel.marginx || 0
  var marginY = graphLabel.marginy || 0

  function getExtremes (attrs) {
    var x = attrs.x
    var y = attrs.y
    var w = attrs.width
    var h = attrs.height
    minX = Math.min(minX, x - w / 2)
    maxX = Math.max(maxX, x + w / 2)
    minY = Math.min(minY, y - h / 2)
    maxY = Math.max(maxY, y + h / 2)
  }

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) { getExtremes(g.node(v)) })
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(edge, 'x')) {
      getExtremes(edge)
    }
  })

  minX -= marginX
  minY -= marginY

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    var node = g.node(v)
    node.x -= minX
    node.y -= minY
  })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(edge.points, function (p) {
      p.x -= minX
      p.y -= minY
    })
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(edge, 'x')) { edge.x -= minX }
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(edge, 'y')) { edge.y -= minY }
  })

  graphLabel.width = maxX - minX + marginX
  graphLabel.height = maxY - minY + marginY
}

function assignNodeIntersects (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    var nodeV = g.node(e.v)
    var nodeW = g.node(e.w)
    var p1
    var p2
    if (!edge.points) {
      edge.points = []
      p1 = nodeW
      p2 = nodeV
    } else {
      p1 = edge.points[0]
      p2 = edge.points[edge.points.length - 1]
    }
    edge.points.unshift(Object(__WEBPACK_IMPORTED_MODULE_4__util__["e" /* intersectRect */])(nodeV, p1))
    edge.points.push(Object(__WEBPACK_IMPORTED_MODULE_4__util__["e" /* intersectRect */])(nodeW, p2))
  })
}

function fixupEdgeLabelCoords (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(edge, 'x')) {
      if (edge.labelpos === 'l' || edge.labelpos === 'r') {
        edge.width -= edge.labeloffset
      }
      switch (edge.labelpos) {
        case 'l': edge.x -= edge.width / 2 + edge.labeloffset; break
        case 'r': edge.x += edge.width / 2 + edge.labeloffset; break
      }
    }
  })
}

function reversePointsForReversedEdges (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    if (edge.reversed) {
      edge.points.reverse()
    }
  })
}

function removeBorderNodes (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    if (g.children(v).length) {
      var node = g.node(v)
      var t = g.node(node.borderTop)
      var b = g.node(node.borderBottom)
      var l = g.node(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.last(node.borderLeft))
      var r = g.node(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.last(node.borderRight))

      node.width = Math.abs(r.x - l.x)
      node.height = Math.abs(b.y - t.y)
      node.x = l.x + node.width / 2
      node.y = t.y + node.height / 2
    }
  })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    if (g.node(v).dummy === 'border') {
      g.removeNode(v)
    }
  })
}

function removeSelfEdges (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    if (e.v === e.w) {
      var node = g.node(e.v)
      if (!node.selfEdges) {
        node.selfEdges = []
      }
      node.selfEdges.push({ e: e, label: g.edge(e) })
      g.removeEdge(e)
    }
  })
}

function insertSelfEdges (g) {
  var layers = Object(__WEBPACK_IMPORTED_MODULE_4__util__["d" /* buildLayerMatrix */])(g)
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layers, function (layer) {
    var orderShift = 0
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layer, function (v, i) {
      var node = g.node(v)
      node.order = i + orderShift
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(node.selfEdges, function (selfEdge) {
        Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* addDummyNode */])(g, 'selfedge', {
          width: selfEdge.label.width,
          height: selfEdge.label.height,
          rank: node.rank,
          order: i + (++orderShift),
          e: selfEdge.e,
          label: selfEdge.label
        }, '_se')
      })
      delete node.selfEdges
    })
  })
}

function positionSelfEdges (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    var node = g.node(v)
    if (node.dummy === 'selfedge') {
      var selfNode = g.node(node.e.v)
      var x = selfNode.x + selfNode.width / 2
      var y = selfNode.y
      var dx = node.x - x
      var dy = selfNode.height / 2
      g.setEdge(node.e, node.label)
      g.removeNode(v)
      node.label.points = [
        { x: x + 2 * dx / 3, y: y - dy },
        { x: x + 5 * dx / 6, y: y - dy },
        { x: x + dx, y: y },
        { x: x + 5 * dx / 6, y: y + dy },
        { x: x + 2 * dx / 3, y: y + dy }
      ]
      node.label.x = node.x
      node.label.y = node.y
    }
  })
}

function selectNumberAttrs (obj, attrs) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.mapValues(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.pick(obj, attrs), Number)
}

function canonicalize (attrs) {
  var newAttrs = {}
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(attrs, function (v, k) {
    newAttrs[k.toLowerCase()] = v
  })
  return newAttrs
}

function layout (g, opts) {
  var timeFn = opts && opts.debugTiming ? __WEBPACK_IMPORTED_MODULE_4__util__["n" /* time */] : __WEBPACK_IMPORTED_MODULE_4__util__["h" /* notime */]
  timeFn('layout', function () {
    var layoutGraph = timeFn('  buildLayoutGraph',
                               function () { return buildLayoutGraph(g) })
    timeFn('  runLayout', function () { runLayout(layoutGraph, timeFn) })
    timeFn('  updateInputGraph', function () { updateInputGraph(g, layoutGraph) })
  })
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = undo;
/* harmony export (immutable) */ __webpack_exports__["a"] = run;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__greedy_fas__ = __webpack_require__(25);



function dfsFAS (g) {
  var fas = []
  var stack = {}
  var visited = {}

  function dfs (v) {
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(visited, v)) {
      return
    }
    visited[v] = true
    stack[v] = true
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.outEdges(v), function (e) {
      if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(stack, e.w)) {
        fas.push(e)
      } else {
        dfs(e.w)
      }
    })
    delete stack[v]
  }

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), dfs)
  return fas
}

function undo (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var label = g.edge(e)
    if (label.reversed) {
      g.removeEdge(e)

      var forwardName = label.forwardName
      delete label.reversed
      delete label.forwardName
      g.setEdge(e.w, e.v, label, forwardName)
    }
  })
}

function run (g) {
  var fas = (g.graph().acyclicer === 'greedy'
                ? Object(__WEBPACK_IMPORTED_MODULE_1__greedy_fas__["a" /* default */])(g, weightFn(g))
                : dfsFAS(g))
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(fas, function (e) {
    var label = g.edge(e)
    g.removeEdge(e)
    label.forwardName = e.name
    label.reversed = true
    g.setEdge(e.w, e.v, label, __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.uniqueId('rev'))
  })

  function weightFn (g) {
    return function (e) {
      return g.edge(e).weight
    }
  }
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_list__ = __webpack_require__(26);




var DEFAULT_WEIGHT_FN = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.constant(1)

function doGreedyFAS (g, buckets, zeroIdx) {
  var results = []
  var sources = buckets[buckets.length - 1]
  var sinks = buckets[0]

  var entry
  while (g.nodeCount()) {
    while ((entry = sinks.dequeue())) { removeNode(g, buckets, zeroIdx, entry) }
    while ((entry = sources.dequeue())) { removeNode(g, buckets, zeroIdx, entry) }
    if (g.nodeCount()) {
      for (var i = buckets.length - 2; i > 0; --i) {
        entry = buckets[i].dequeue()
        if (entry) {
          results = results.concat(removeNode(g, buckets, zeroIdx, entry, true))
          break
        }
      }
    }
  }

  return results
}

function removeNode (g, buckets, zeroIdx, entry, collectPredecessors) {
  var results = collectPredecessors ? [] : undefined

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.inEdges(entry.v), function (edge) {
    var weight = g.edge(edge)
    var uEntry = g.node(edge.v)

    if (collectPredecessors) {
      results.push({ v: edge.v, w: edge.w })
    }

    uEntry.out -= weight
    assignBucket(buckets, zeroIdx, uEntry)
  })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.outEdges(entry.v), function (edge) {
    var weight = g.edge(edge)
    var w = edge.w
    var wEntry = g.node(w)
    wEntry['in'] -= weight
    assignBucket(buckets, zeroIdx, wEntry)
  })

  g.removeNode(entry.v)

  return results
}

function buildState (g, weightFn) {
  var fasGraph = new __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__["Graph"]()
  var maxIn = 0
  var maxOut = 0

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    fasGraph.setNode(v, { v: v, 'in': 0, out: 0 })
  })

  // Aggregate weights on nodes, but also sum the weights across multi-edges
  // into a single edge for the fasGraph.
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var prevWeight = fasGraph.edge(e.v, e.w) || 0
    var weight = weightFn(e)
    var edgeWeight = prevWeight + weight
    fasGraph.setEdge(e.v, e.w, edgeWeight)
    maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight)
    maxIn = Math.max(maxIn, fasGraph.node(e.w)['in'] += weight)
  })

  var buckets = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.range(maxOut + maxIn + 3).map(function () { return new __WEBPACK_IMPORTED_MODULE_2__data_list__["a" /* default */]() })
  var zeroIdx = maxIn + 1

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(fasGraph.nodes(), function (v) {
    assignBucket(buckets, zeroIdx, fasGraph.node(v))
  })

  return { graph: fasGraph, buckets: buckets, zeroIdx: zeroIdx }
}

function assignBucket (buckets, zeroIdx, entry) {
  if (!entry.out) {
    buckets[0].enqueue(entry)
  } else if (!entry['in']) {
    buckets[buckets.length - 1].enqueue(entry)
  } else {
    buckets[entry.out - entry['in'] + zeroIdx].enqueue(entry)
  }
}

/*
 * A greedy heuristic for finding a feedback arc set for a graph. A feedback
 * arc set is a set of edges that can be removed to make a graph acyclic.
 * The algorithm comes from: P. Eades, X. Lin, and W. F. Smyth, "A fast and
 * effective heuristic for the feedback arc set problem." This implementation
 * adjusts that from the paper to allow for weighted edges.
 */
/* harmony default export */ __webpack_exports__["a"] = (function (g, weightFn) {
  if (g.nodeCount() <= 1) {
    return []
  }
  var state = buildState(g, weightFn || DEFAULT_WEIGHT_FN)
  var results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx)

  // Expand multi-edges
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.flatten(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(results, function (e) {
    return g.outEdges(e.v, e.w)
  }), true)
});


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * Simple doubly linked list implementation derived from Cormen, et al.,
 * "Introduction to Algorithms".
 */

function List () {
  var sentinel = {}
  sentinel._next = sentinel._prev = sentinel
  this._sentinel = sentinel
}

List.prototype.dequeue = function () {
  var sentinel = this._sentinel
  var entry = sentinel._prev
  if (entry !== sentinel) {
    unlink(entry)
    return entry
  }
}

List.prototype.enqueue = function (entry) {
  var sentinel = this._sentinel
  if (entry._prev && entry._next) {
    unlink(entry)
  }
  entry._next = sentinel._next
  sentinel._next._prev = entry
  sentinel._next = entry
  entry._prev = sentinel
}

List.prototype.toString = function () {
  var strs = []
  var sentinel = this._sentinel
  var curr = sentinel._prev
  while (curr !== sentinel) {
    strs.push(JSON.stringify(curr, filterOutLinks))
    curr = curr._prev
  }
  return '[' + strs.join(', ') + ']'
}

function unlink (entry) {
  entry._prev._next = entry._next
  entry._next._prev = entry._prev
  delete entry._next
  delete entry._prev
}

function filterOutLinks (k, v) {
  if (k !== '_next' && k !== '_prev') {
    return v
  }
}

/* harmony default export */ __webpack_exports__["a"] = (List);


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = run;
/* harmony export (immutable) */ __webpack_exports__["b"] = undo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);



function normalizeEdge (g, e) {
  var v = e.v
  var vRank = g.node(v).rank
  var w = e.w
  var wRank = g.node(w).rank
  var name = e.name
  var edgeLabel = g.edge(e)
  var labelRank = edgeLabel.labelRank

  if (wRank === vRank + 1) return

  g.removeEdge(e)

  var dummy, attrs, i
  for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
    edgeLabel.points = []
    attrs = {
      width: 0,
      height: 0,
      edgeLabel: edgeLabel,
      edgeObj: e,
      rank: vRank
    }
    dummy = Object(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* addDummyNode */])(g, 'edge', attrs, '_d')
    if (vRank === labelRank) {
      attrs.width = edgeLabel.width
      attrs.height = edgeLabel.height
      attrs.dummy = 'edge-label'
      attrs.labelpos = edgeLabel.labelpos
    }
    g.setEdge(v, dummy, { weight: edgeLabel.weight }, name)
    if (i === 0) {
      g.graph().dummyChains.push(dummy)
    }
    v = dummy
  }

  g.setEdge(v, w, { weight: edgeLabel.weight }, name)
}

/*
 * Breaks any long edges in the graph into short segments that span 1 layer
 * each. This operation is undoable with the denormalize function.
 *
 * Pre-conditions:
 *
 *    1. The input graph is a DAG.
 *    2. Each node in the graph has a "rank" property.
 *
 * Post-condition:
 *
 *    1. All edges in the graph have a length of 1.
 *    2. Dummy nodes are added where edges have been split into segments.
 *    3. The graph is augmented with a "dummyChains" attribute which contains
 *       the first dummy in each chain of dummy nodes produced.
 */
function run (g) {
  g.graph().dummyChains = []
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (edge) { normalizeEdge(g, edge) })
}

function undo (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.graph().dummyChains, function (v) {
    var node = g.node(v)
    var origLabel = node.edgeLabel
    var w
    g.setEdge(node.edgeObj, origLabel)
    while (node.dummy) {
      w = g.successors(v)[0]
      g.removeNode(v)
      origLabel.points.push({ x: node.x, y: node.y })
      if (node.dummy === 'edge-label') {
        origLabel.x = node.x
        origLabel.y = node.y
        origLabel.width = node.width
        origLabel.height = node.height
      }
      v = w
      node = g.node(v)
    }
  })
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rank;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feasible_tree__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__network_simplex__ = __webpack_require__(29);




// A fast and simple ranker, but results are far from optimal.
var longestPathRanker = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* longestPath */]

function tightTreeRanker (g) {
  Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* longestPath */])(g)
  Object(__WEBPACK_IMPORTED_MODULE_1__feasible_tree__["a" /* default */])(g)
}

function networkSimplexRanker (g) {
  Object(__WEBPACK_IMPORTED_MODULE_2__network_simplex__["a" /* default */])(g)
}

/*
 * Assigns a rank to each node in the input graph that respects the "minlen"
 * constraint specified on edges between nodes.
 *
 * This basic structure is derived from Gansner, et al., "A Technique for
 * Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a connected DAG
 *    2. Graph nodes must be objects
 *    3. Graph edges must have "weight" and "minlen" attributes
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have a "rank" attribute based on the results of the
 *       algorithm. Ranks can start at any index (including negative), we'll
 *       fix them up later.
 */
function rank (g) {
  switch (g.graph().ranker) {
    case 'network-simplex': networkSimplexRanker(g); break
    case 'tight-tree': tightTreeRanker(g); break
    case 'longest-path': longestPathRanker(g); break
    default: networkSimplexRanker(g)
  }
}


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = networkSimplex;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feasible_tree__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(1);


const {preorder, postorder} = __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__["alg"]





// Expose some internals for testing purposes
networkSimplex.initLowLimValues = initLowLimValues
networkSimplex.initCutValues = initCutValues
networkSimplex.calcCutValue = calcCutValue
networkSimplex.leaveEdge = leaveEdge
networkSimplex.enterEdge = enterEdge
networkSimplex.exchangeEdges = exchangeEdges

/*
 * Initializes cut values for all edges in the tree.
 */
function initCutValues (t, g) {
  var vs = postorder(t, t.nodes())
  vs = vs.slice(0, vs.length - 1)
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(vs, function (v) {
    assignCutValue(t, g, v)
  })
}

function assignCutValue (t, g, child) {
  var childLab = t.node(child)
  var parent = childLab.parent
  t.edge(child, parent).cutvalue = calcCutValue(t, g, child)
}

/*
 * Given the tight tree, its graph, and a child in the graph calculate and
 * return the cut value for the edge between the child and its parent.
 */
function calcCutValue (t, g, child) {
  var childLab = t.node(child)
  var parent = childLab.parent
  // True if the child is on the tail end of the edge in the directed graph
  var childIsTail = true
  // The graph's view of the tree edge we're inspecting
  var graphEdge = g.edge(child, parent)
  // The accumulated cut value for the edge between this node and its parent
  var cutValue = 0

  if (!graphEdge) {
    childIsTail = false
    graphEdge = g.edge(parent, child)
  }

  cutValue = graphEdge.weight

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodeEdges(child), function (e) {
    var isOutEdge = e.v === child
    var other = isOutEdge ? e.w : e.v

    if (other !== parent) {
      var pointsToHead = isOutEdge === childIsTail
      var otherWeight = g.edge(e).weight

      cutValue += pointsToHead ? otherWeight : -otherWeight
      if (isTreeEdge(t, child, other)) {
        var otherCutValue = t.edge(child, other).cutvalue
        cutValue += pointsToHead ? -otherCutValue : otherCutValue
      }
    }
  })

  return cutValue
}

function initLowLimValues (tree, root) {
  if (arguments.length < 2) {
    root = tree.nodes()[0]
  }
  dfsAssignLowLim(tree, {}, 1, root)
}

function dfsAssignLowLim (tree, visited, nextLim, v, parent) {
  var low = nextLim
  var label = tree.node(v)

  visited[v] = true
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(tree.neighbors(v), function (w) {
    if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(visited, w)) {
      nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v)
    }
  })

  label.low = low
  label.lim = nextLim++
  if (parent) {
    label.parent = parent
  } else {
    // TODO should be able to remove this when we incrementally update low lim
    delete label.parent
  }

  return nextLim
}

function leaveEdge (tree) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.find(tree.edges(), function (e) {
    return tree.edge(e).cutvalue < 0
  })
}

function enterEdge (t, g, edge) {
  var v = edge.v
  var w = edge.w

  // For the rest of this function we assume that v is the tail and w is the
  // head, so if we don't have this edge in the graph we should flip it to
  // match the correct orientation.
  if (!g.hasEdge(v, w)) {
    v = edge.w
    w = edge.v
  }

  var vLabel = t.node(v)
  var wLabel = t.node(w)
  var tailLabel = vLabel
  var flip = false

  // If the root is in the tail of the edge then we need to flip the logic that
  // checks for the head and tail nodes in the candidates function below.
  if (vLabel.lim > wLabel.lim) {
    tailLabel = wLabel
    flip = true
  }

  var candidates = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.filter(g.edges(), function (edge) {
    return flip === isDescendant(t, t.node(edge.v), tailLabel) &&
           flip !== isDescendant(t, t.node(edge.w), tailLabel)
  })

  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.minBy(candidates, function (edge) { return Object(__WEBPACK_IMPORTED_MODULE_3__util__["b" /* slack */])(g, edge) })
}

function exchangeEdges (t, g, e, f) {
  var v = e.v
  var w = e.w
  t.removeEdge(v, w)
  t.setEdge(f.v, f.w, {})
  initLowLimValues(t)
  initCutValues(t, g)
  updateRanks(t, g)
}

function updateRanks (t, g) {
  var root = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.find(t.nodes(), function (v) { return !g.node(v).parent })
  var vs = preorder(t, root)
  vs = vs.slice(1)
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(vs, function (v) {
    var parent = t.node(v).parent
    var edge = g.edge(v, parent)
    var flipped = false

    if (!edge) {
      edge = g.edge(parent, v)
      flipped = true
    }

    g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen)
  })
}

/*
 * Returns true if the edge is in the tree.
 */
function isTreeEdge (tree, u, v) {
  return tree.hasEdge(u, v)
}

/*
 * Returns true if the specified node is descendant of the root node per the
 * assigned low and lim attributes in the tree.
 */
function isDescendant (tree, vLabel, rootLabel) {
  return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim
}

/*
 * The network simplex algorithm assigns ranks to each node in the input graph
 * and iteratively improves the ranking to reduce the length of edges.
 *
 * Preconditions:
 *
 *    1. The input graph must be a DAG.
 *    2. All nodes in the graph must have an object value.
 *    3. All edges in the graph must have "minlen" and "weight" attributes.
 *
 * Postconditions:
 *
 *    1. All nodes in the graph will have an assigned "rank" attribute that has
 *       been optimized by the network simplex algorithm. Ranks start at 0.
 *
 *
 * A rough sketch of the algorithm is as follows:
 *
 *    1. Assign initial ranks to each node. We use the longest path algorithm,
 *       which assigns ranks to the lowest position possible. In general this
 *       leads to very wide bottom ranks and unnecessarily long edges.
 *    2. Construct a feasible tight tree. A tight tree is one such that all
 *       edges in the tree have no slack (difference between length of edge
 *       and minlen for the edge). This by itself greatly improves the assigned
 *       rankings by shorting edges.
 *    3. Iteratively find edges that have negative cut values. Generally a
 *       negative cut value indicates that the edge could be removed and a new
 *       tree edge could be added to produce a more compact graph.
 *
 * Much of the algorithms here are derived from Gansner, et al., "A Technique
 * for Drawing Directed Graphs." The structure of the file roughly follows the
 * structure of the overall algorithm.
 */
function networkSimplex (g) {
  g = Object(__WEBPACK_IMPORTED_MODULE_4__util__["l" /* simplify */])(g)
  Object(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* longestPath */])(g)
  var t = Object(__WEBPACK_IMPORTED_MODULE_2__feasible_tree__["a" /* default */])(g)
  initLowLimValues(t)
  initCutValues(t, g)

  var e, f
  while ((e = leaveEdge(t))) {
    f = enterEdge(t, g, e)
    exchangeEdges(t, g, e, f)
  }
}


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parentDummyChains;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


// Find a path from v to w through the lowest common ancestor (LCA). Return the
// full path and the LCA.
function findPath (g, postorderNums, v, w) {
  var vPath = []
  var wPath = []
  var low = Math.min(postorderNums[v].low, postorderNums[w].low)
  var lim = Math.max(postorderNums[v].lim, postorderNums[w].lim)
  var parent
  var lca

  // Traverse up from v to find the LCA
  parent = v
  do {
    parent = g.parent(parent)
    vPath.push(parent)
  } while (parent &&
           (postorderNums[parent].low > low || lim > postorderNums[parent].lim))
  lca = parent

  // Traverse from w to LCA
  parent = w
  while ((parent = g.parent(parent)) !== lca) {
    wPath.push(parent)
  }

  return { path: vPath.concat(wPath.reverse()), lca: lca }
}

function postorder (g) {
  var result = {}
  var lim = 0

  function dfs (v) {
    var low = lim
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.children(v), dfs)
    result[v] = { low: low, lim: lim++ }
  }
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.children(), dfs)

  return result
}

function parentDummyChains (g) {
  var postorderNums = postorder(g)

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.graph().dummyChains, function (v) {
    var node = g.node(v)
    var edgeObj = node.edgeObj
    var pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w)
    var path = pathData.path
    var lca = pathData.lca
    var pathIdx = 0
    var pathV = path[pathIdx]
    var ascending = true

    while (v !== edgeObj.w) {
      node = g.node(v)

      if (ascending) {
        while ((pathV = path[pathIdx]) !== lca &&
               g.node(pathV).maxRank < node.rank) {
          pathIdx++
        }

        if (pathV === lca) {
          ascending = false
        }
      }

      if (!ascending) {
        while (pathIdx < path.length - 1 &&
               g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
          pathIdx++
        }
        pathV = path[pathIdx]
      }

      g.setParent(v, pathV)
      v = g.successors(v)[0]
    }
  })
}


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = cleanup;
/* harmony export (immutable) */ __webpack_exports__["b"] = run;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);



function dfs (g, root, nodeSep, weight, height, depths, v) {
  var children = g.children(v)
  if (!children.length) {
    if (v !== root) {
      g.setEdge(root, v, { weight: 0, minlen: nodeSep })
    }
    return
  }

  var top = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* addBorderNode */])(g, '_bt')
  var bottom = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* addBorderNode */])(g, '_bb')
  var label = g.node(v)

  g.setParent(top, v)
  label.borderTop = top
  g.setParent(bottom, v)
  label.borderBottom = bottom

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(children, function (child) {
    dfs(g, root, nodeSep, weight, height, depths, child)

    var childNode = g.node(child)
    var childTop = childNode.borderTop ? childNode.borderTop : child
    var childBottom = childNode.borderBottom ? childNode.borderBottom : child
    var thisWeight = childNode.borderTop ? weight : 2 * weight
    var minlen = childTop !== childBottom ? 1 : height - depths[v] + 1

    g.setEdge(top, childTop, {
      weight: thisWeight,
      minlen: minlen,
      nestingEdge: true
    })

    g.setEdge(childBottom, bottom, {
      weight: thisWeight,
      minlen: minlen,
      nestingEdge: true
    })
  })

  if (!g.parent(v)) {
    g.setEdge(root, top, { weight: 0, minlen: height + depths[v] })
  }
}

function sumWeights (g) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(g.edges(), function (acc, e) {
    return acc + g.edge(e).weight
  }, 0)
}

function treeDepths (g) {
  var depths = {}
  function dfs (v, depth) {
    var children = g.children(v)
    if (children && children.length) {
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(children, function (child) {
        dfs(child, depth + 1)
      })
    }
    depths[v] = depth
  }
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.children(), function (v) { dfs(v, 1) })
  return depths
}

function cleanup (g) {
  var graphLabel = g.graph()
  g.removeNode(graphLabel.nestingRoot)
  delete graphLabel.nestingRoot
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    if (edge.nestingEdge) {
      g.removeEdge(e)
    }
  })
}

/*
 * A nesting graph creates dummy nodes for the tops and bottoms of subgraphs,
 * adds appropriate edges to ensure that all cluster nodes are placed between
 * these boundries, and ensures that the graph is connected.
 *
 * In addition we ensure, through the use of the minlen property, that nodes
 * and subgraph border nodes to not end up on the same rank.
 *
 * Preconditions:
 *
 *    1. Input graph is a DAG
 *    2. Nodes in the input graph has a minlen attribute
 *
 * Postconditions:
 *
 *    1. Input graph is connected.
 *    2. Dummy nodes are added for the tops and bottoms of subgraphs.
 *    3. The minlen attribute for nodes is adjusted to ensure nodes do not
 *       get placed on the same rank as subgraph border nodes.
 *
 * The nesting graph idea comes from Sander, "Layout of Compound Directed
 * Graphs."
 */
function run (g) {
  var root = Object(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* addDummyNode */])(g, 'root', {}, '_root')
  var depths = treeDepths(g)
  var height = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.values(depths)) - 1 // Note: depths is an Object not an array
  var nodeSep = 2 * height + 1

  g.graph().nestingRoot = root

  // Multiply minlen by nodeSep to align nodes on non-border ranks.
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) { g.edge(e).minlen *= nodeSep })

  // Calculate a weight that is sufficient to keep subgraphs vertically compact
  var weight = sumWeights(g) + 1

  // Create border nodes and link them up
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.children(), function (child) {
    dfs(g, root, nodeSep, weight, height, depths, child)
  })

  // Save the multiplier for node layers for later removal of empty border
  // layers.
  g.graph().nodeRankFactor = nodeSep
}


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);



function addBorderNode (g, prop, prefix, sg, sgNode, rank) {
  var label = { width: 0, height: 0, rank: rank, borderType: prop }
  var prev = sgNode[prop][rank - 1]
  var curr = Object(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* addDummyNode */])(g, 'border', label, prefix)
  sgNode[prop][rank] = curr
  g.setParent(curr, sg)
  if (prev) {
    g.setEdge(prev, curr, { weight: 1 })
  }
}

/* harmony default export */ __webpack_exports__["a"] = (function (g) {
  function dfs (v) {
    var children = g.children(v)
    var node = g.node(v)
    if (children.length) {
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(children, dfs)
    }

    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(node, 'minRank')) {
      node.borderLeft = []
      node.borderRight = []
      for (var rank = node.minRank, maxRank = node.maxRank + 1;
           rank < maxRank;
           ++rank) {
        addBorderNode(g, 'borderLeft', '_bl', v, node, rank)
        addBorderNode(g, 'borderRight', '_br', v, node, rank)
      }
    }
  }

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.children(), dfs)
});


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = adjust;
/* harmony export (immutable) */ __webpack_exports__["b"] = undo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


function swapWidthHeight (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) { swapWidthHeightOne(g.node(v)) })
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) { swapWidthHeightOne(g.edge(e)) })
}

function swapWidthHeightOne (attrs) {
  var w = attrs.width
  attrs.width = attrs.height
  attrs.height = w
}

function reverseY (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) { reverseYOne(g.node(v)) })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(edge.points, reverseYOne)
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(edge, 'y')) {
      reverseYOne(edge)
    }
  })
}

function reverseYOne (attrs) {
  attrs.y = -attrs.y
}

function swapXY (g) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) { swapXYOne(g.node(v)) })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.edges(), function (e) {
    var edge = g.edge(e)
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(edge.points, swapXYOne)
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(edge, 'x')) {
      swapXYOne(edge)
    }
  })
}

function swapXYOne (attrs) {
  var x = attrs.x
  attrs.x = attrs.y
  attrs.y = x
}

function adjust (g) {
  var rankDir = g.graph().rankdir.toLowerCase()
  if (rankDir === 'lr' || rankDir === 'rl') {
    swapWidthHeight(g)
  }
}

function undo (g) {
  var rankDir = g.graph().rankdir.toLowerCase()
  if (rankDir === 'bt' || rankDir === 'rl') {
    reverseY(g)
  }

  if (rankDir === 'lr' || rankDir === 'rl') {
    swapXY(g)
    swapWidthHeight(g)
  }
}


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = order;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__init_order__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cross_count__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sort_subgraph__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__build_layer_graph__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_subgraph_constraints__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ciena_graphlib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ciena_graphlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ciena_graphlib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util__ = __webpack_require__(1);









function buildLayerGraphs (g, ranks, relationship) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(ranks, function (rank) {
    return Object(__WEBPACK_IMPORTED_MODULE_4__build_layer_graph__["a" /* default */])(g, rank, relationship)
  })
}

function sweepLayerGraphs (layerGraphs, biasRight) {
  var cg = new __WEBPACK_IMPORTED_MODULE_6_ciena_graphlib__["Graph"]()
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layerGraphs, function (lg) {
    var root = lg.graph().root
    var sorted = Object(__WEBPACK_IMPORTED_MODULE_3__sort_subgraph__["a" /* default */])(lg, root, cg, biasRight)
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(sorted.vs, function (v, i) {
      lg.node(v).order = i
    })
    Object(__WEBPACK_IMPORTED_MODULE_5__add_subgraph_constraints__["a" /* default */])(lg, cg, sorted.vs)
  })
}

function assignOrder (g, layering) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layering, function (layer) {
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layer, function (v, i) {
      g.node(v).order = i
    })
  })
}

/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */
function order (g) {
  var mr = Object(__WEBPACK_IMPORTED_MODULE_7__util__["f" /* maxRank */])(g)
  var downLayerGraphs = buildLayerGraphs(g, __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.range(1, mr + 1), 'inEdges')
  var upLayerGraphs = buildLayerGraphs(g, __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.range(mr - 1, -1, -1), 'outEdges')

  var layering = Object(__WEBPACK_IMPORTED_MODULE_1__init_order__["a" /* default */])(g)
  assignOrder(g, layering)

  var bestCC = Number.POSITIVE_INFINITY
  var best

  for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
    sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2)

    layering = Object(__WEBPACK_IMPORTED_MODULE_7__util__["d" /* buildLayerMatrix */])(g)
    var cc = Object(__WEBPACK_IMPORTED_MODULE_2__cross_count__["a" /* default */])(g, layering)
    if (cc < bestCC) {
      lastBest = 0
      best = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.cloneDeep(layering)
      bestCC = cc
    }
  }

  assignOrder(g, best)
}


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initOrder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */
function initOrder (g) {
  var visited = {}
  var simpleNodes = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.filter(g.nodes(), function (v) {
    return !g.children(v).length
  })
  var maxRank = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(simpleNodes, function (v) { return g.node(v).rank }))
  var layers = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.range(maxRank + 1), function () { return [] })

  function dfs (v) {
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(visited, v)) return
    visited[v] = true
    var node = g.node(v)
    layers[node.rank].push(v)
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.successors(v), dfs)
  }

  var orderedVs = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.sortBy(simpleNodes, function (v) { return g.node(v).rank })
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(orderedVs, dfs)

  return layers
}


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = crossCount;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


function twoLayerCrossCount (g, northLayer, southLayer) {
  // Sort all of the edges between the north and south layers by their position
  // in the north layer and then the south. Map these edges to the position of
  // their head in the south layer.
  var southPos = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.zipObject(southLayer,
                             __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(southLayer, function (v, i) { return i }))
  var southEntries = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.flatten(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(northLayer, function (v) {
    return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.chain(g.outEdges(v))
            .map(function (e) {
              return { pos: southPos[e.w], weight: g.edge(e).weight }
            })
            .sortBy('pos')
            .value()
  }), true)

  // Build the accumulator tree
  var firstIndex = 1
  while (firstIndex < southLayer.length) firstIndex <<= 1
  var treeSize = 2 * firstIndex - 1
  firstIndex -= 1
  var tree = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(new Array(treeSize), function () { return 0 })

  // Calculate the weighted crossings
  var cc = 0
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(southEntries.forEach(function (entry) {
    var index = entry.pos + firstIndex
    tree[index] += entry.weight
    var weightSum = 0
    while (index > 0) {
      if (index % 2) {
        weightSum += tree[index + 1]
      }
      index = (index - 1) >> 1
      tree[index] += entry.weight
    }
    cc += entry.weight * weightSum
  }))

  return cc
}

/*
 * A function that takes a layering (an array of layers, each with an array of
 * ordererd nodes) and a graph and returns a weighted crossing count.
 *
 * Pre-conditions:
 *
 *    1. Input graph must be simple (not a multigraph), directed, and include
 *       only simple edges.
 *    2. Edges in the input graph must have assigned weights.
 *
 * Post-conditions:
 *
 *    1. The graph and layering matrix are left unchanged.
 *
 * This algorithm is derived from Barth, et al., "Bilayer Cross Counting."
 */
function crossCount (g, layering) {
  var cc = 0
  for (var i = 1; i < layering.length; ++i) {
    cc += twoLayerCrossCount(g, layering[i - 1], layering[i])
  }
  return cc
}


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sortSubgraph;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__barycenter__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resolve_conflicts__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sort__ = __webpack_require__(40);





function expandSubgraphs (entries, subgraphs) {
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(entries, function (entry) {
    entry.vs = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.flatten(entry.vs.map(function (v) {
      if (subgraphs[v]) {
        return subgraphs[v].vs
      }
      return v
    }), true)
  })
}

function mergeBarycenters (target, other) {
  if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(target.barycenter)) {
    target.barycenter = (target.barycenter * target.weight +
                         other.barycenter * other.weight) /
                        (target.weight + other.weight)
    target.weight += other.weight
  } else {
    target.barycenter = other.barycenter
    target.weight = other.weight
  }
}

function sortSubgraph (g, v, cg, biasRight) {
  var movable = g.children(v)
  var node = g.node(v)
  var bl = node ? node.borderLeft : undefined
  var br = node ? node.borderRight : undefined
  var subgraphs = {}

  if (bl) {
    movable = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.filter(movable, function (w) {
      return w !== bl && w !== br
    })
  }

  var barycenters = Object(__WEBPACK_IMPORTED_MODULE_1__barycenter__["a" /* default */])(g, movable)
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(barycenters, function (entry) {
    if (g.children(entry.v).length) {
      var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight)
      subgraphs[entry.v] = subgraphResult
      if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(subgraphResult, 'barycenter')) {
        mergeBarycenters(entry, subgraphResult)
      }
    }
  })

  var entries = Object(__WEBPACK_IMPORTED_MODULE_2__resolve_conflicts__["a" /* default */])(barycenters, cg)
  expandSubgraphs(entries, subgraphs)

  var result = Object(__WEBPACK_IMPORTED_MODULE_3__sort__["a" /* default */])(entries, biasRight)

  if (bl) {
    result.vs = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.flatten([bl, result.vs, br], true)
    if (g.predecessors(bl).length) {
      var blPred = g.node(g.predecessors(bl)[0])
      var brPred = g.node(g.predecessors(br)[0])
      if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(result, 'barycenter')) {
        result.barycenter = 0
        result.weight = 0
      }
      result.barycenter = (result.barycenter * result.weight +
                           blPred.order + brPred.order) / (result.weight + 2)
      result.weight += 2
    }
  }

  return result
}


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = barycenter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


function barycenter (g, movable) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(movable, function (v) {
    var inV = g.inEdges(v)
    if (!inV.length) {
      return { v: v }
    } else {
      var result = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(inV, function (acc, e) {
        var edge = g.edge(e)
        var nodeU = g.node(e.v)
        return {
          sum: acc.sum + (edge.weight * nodeU.order),
          weight: acc.weight + edge.weight
        }
      }, { sum: 0, weight: 0 })

      return {
        v: v,
        barycenter: result.sum / result.weight,
        weight: result.weight
      }
    }
  })
}


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = resolveConflicts;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


function doResolveConflicts (sourceSet) {
  var entries = []

  function handleIn (vEntry) {
    return function (uEntry) {
      if (uEntry.merged) {
        return
      }
      if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(uEntry.barycenter) ||
          __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(vEntry.barycenter) ||
          uEntry.barycenter >= vEntry.barycenter) {
        mergeEntries(vEntry, uEntry)
      }
    }
  }

  function handleOut (vEntry) {
    return function (wEntry) {
      wEntry['in'].push(vEntry)
      if (--wEntry.indegree === 0) {
        sourceSet.push(wEntry)
      }
    }
  }

  while (sourceSet.length) {
    var entry = sourceSet.pop()
    entries.push(entry)
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(entry['in'].reverse(), handleIn(entry))
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(entry.out, handleOut(entry))
  }

  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.chain(entries)
          .filter(function (entry) { return !entry.merged })
          .map(function (entry) {
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.pick(entry, ['vs', 'i', 'barycenter', 'weight'])
          })
          .value()
}

function mergeEntries (target, source) {
  var sum = 0
  var weight = 0

  if (target.weight) {
    sum += target.barycenter * target.weight
    weight += target.weight
  }

  if (source.weight) {
    sum += source.barycenter * source.weight
    weight += source.weight
  }

  target.vs = source.vs.concat(target.vs)
  target.barycenter = sum / weight
  target.weight = weight
  target.i = Math.min(source.i, target.i)
  source.merged = true
}

/*
 * Given a list of entries of the form {v, barycenter, weight} and a
 * constraint graph this function will resolve any conflicts between the
 * constraint graph and the barycenters for the entries. If the barycenters for
 * an entry would violate a constraint in the constraint graph then we coalesce
 * the nodes in the conflict into a new node that respects the contraint and
 * aggregates barycenter and weight information.
 *
 * This implementation is based on the description in Forster, "A Fast and
 * Simple Hueristic for Constrained Two-Level Crossing Reduction," thought it
 * differs in some specific details.
 *
 * Pre-conditions:
 *
 *    1. Each entry has the form {v, barycenter, weight}, or if the node has
 *       no barycenter, then {v}.
 *
 * Returns:
 *
 *    A new list of entries of the form {vs, i, barycenter, weight}. The list
 *    `vs` may either be a singleton or it may be an aggregation of nodes
 *    ordered such that they do not violate constraints from the constraint
 *    graph. The property `i` is the lowest original index of any of the
 *    elements in `vs`.
 */
function resolveConflicts (entries, cg) {
  var mappedEntries = {}
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(entries, function (entry, i) {
    var tmp = mappedEntries[entry.v] = {
      indegree: 0,
      'in': [],
      out: [],
      vs: [entry.v],
      i: i
    }
    if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(entry.barycenter)) {
      tmp.barycenter = entry.barycenter
      tmp.weight = entry.weight
    }
  })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(cg.edges(), function (e) {
    var entryV = mappedEntries[e.v]
    var entryW = mappedEntries[e.w]
    if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(entryV) && !__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(entryW)) {
      entryW.indegree++
      entryV.out.push(mappedEntries[e.w])
    }
  })

  var sourceSet = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.filter(mappedEntries, function (entry) {
    return !entry.indegree
  })

  return doResolveConflicts(sourceSet)
}


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sort;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);



function consumeUnsortable (vs, unsortable, index) {
  var last
  while (unsortable.length && (last = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.last(unsortable)).i <= index) {
    unsortable.pop()
    vs.push(last.vs)
    index++
  }
  return index
}

function compareWithBias (bias) {
  return function (entryV, entryW) {
    if (entryV.barycenter < entryW.barycenter) {
      return -1
    } else if (entryV.barycenter > entryW.barycenter) {
      return 1
    }

    return !bias ? entryV.i - entryW.i : entryW.i - entryV.i
  }
}

function sort (entries, biasRight) {
  var parts = Object(__WEBPACK_IMPORTED_MODULE_1__util__["i" /* partition */])(entries, function (entry) {
    return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(entry, 'barycenter')
  })
  var sortable = parts.lhs
  var unsortable = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.sortBy(parts.rhs, function (entry) { return -entry.i })
  var vs = []
  var sum = 0
  var weight = 0
  var vsIndex = 0

  sortable.sort(compareWithBias(!!biasRight))

  vsIndex = consumeUnsortable(vs, unsortable, vsIndex)

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(sortable, function (entry) {
    vsIndex += entry.vs.length
    vs.push(entry.vs)
    sum += entry.barycenter * entry.weight
    weight += entry.weight
    vsIndex = consumeUnsortable(vs, unsortable, vsIndex)
  })

  var result = { vs: __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.flatten(vs, true) }
  if (weight) {
    result.barycenter = sum / weight
    result.weight = weight
  }
  return result
}


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = buildLayerGraph;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__);



function createRootNode (g) {
  var v
  while (g.hasNode((v = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.uniqueId('_root'))));
  return v
}

/*
 * Constructs a graph that can be used to sort a layer of nodes. The graph will
 * contain all base and subgraph nodes from the request layer in their original
 * hierarchy and any edges that are incident on these nodes and are of the type
 * requested by the "relationship" parameter.
 *
 * Nodes from the requested rank that do not have parents are assigned a root
 * node in the output graph, which is set in the root graph attribute. This
 * makes it easy to walk the hierarchy of movable nodes during ordering.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG
 *    2. Base nodes in the input graph have a rank attribute
 *    3. Subgraph nodes in the input graph has minRank and maxRank attributes
 *    4. Edges have an assigned weight
 *
 * Post-conditions:
 *
 *    1. Output graph has all nodes in the movable rank with preserved
 *       hierarchy.
 *    2. Root nodes in the movable layer are made children of the node
 *       indicated by the root attribute of the graph.
 *    3. Non-movable nodes incident on movable nodes, selected by the
 *       relationship parameter, are included in the graph (without hierarchy).
 *    4. Edges incident on movable nodes, selected by the relationship
 *       parameter, are added to the output graph.
 *    5. The weights for copied edges are aggregated as need, since the output
 *       graph is not a multi-graph.
 */
function buildLayerGraph (g, rank, relationship) {
  var root = createRootNode(g)
  var result = new __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__["Graph"]({ compound: true }).setGraph({ root: root })
                  .setDefaultNodeLabel(function (v) { return g.node(v) })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.nodes(), function (v) {
    var node = g.node(v)
    var parent = g.parent(v)

    if (node.rank === rank || node.minRank <= rank && rank <= node.maxRank) {
      result.setNode(v)
      result.setParent(v, parent || root)

      // This assumes we have only short edges!
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g[relationship](v), function (e) {
        var u = e.v === v ? e.w : e.v
        var edge = result.edge(u, v)
        var weight = !__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isUndefined(edge) ? edge.weight : 0
        result.setEdge(u, v, { weight: g.edge(e).weight + weight })
      })

      if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(node, 'minRank')) {
        result.setNode(v, {
          borderLeft: node.borderLeft[rank],
          borderRight: node.borderRight[rank]
        })
      }
    }
  })

  return result
}


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addSubgraphConstraints;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


function addSubgraphConstraints (g, cg, vs) {
  var prev = {}
  var rootPrev

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(vs, function (v) {
    var child = g.parent(v)
    var parent
    var prevChild
    while (child) {
      parent = g.parent(child)
      if (parent) {
        prevChild = prev[parent]
        prev[parent] = child
      } else {
        prevChild = rootPrev
        rootPrev = child
      }
      if (prevChild && prevChild !== child) {
        cg.setEdge(prevChild, child)
        return
      }
      child = parent
    }
  })

  /*
  function dfs(v) {
    var children = v ? g.children(v) : g.children();
    if (children.length) {
      var min = Number.POSITIVE_INFINITY,
          subgraphs = [];
      _.forEach(children, function(child) {
        var childMin = dfs(child);
        if (g.children(child).length) {
          subgraphs.push({ v: child, order: childMin });
        }
        min = Math.min(min, childMin);
      });
      _.reduce(_.sortBy(subgraphs, "order"), function(prev, curr) {
        cg.setEdge(prev.v, curr.v);
        return curr;
      });
      return min;
    }
    return g.node(v).order;
  }
  dfs(undefined);
  */
}


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = position;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bk__ = __webpack_require__(44);




function positionY (g) {
  var layering = Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* buildLayerMatrix */])(g)
  var rankSep = g.graph().ranksep
  var prevY = 0
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layering, function (layer) {
    var maxHeight = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(layer, function (v) { return g.node(v).height }))
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layer, function (v) {
      g.node(v).y = prevY + maxHeight / 2
    })
    prevY += maxHeight + rankSep
  })
}

function position (g) {
  g = Object(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* asNonCompoundGraph */])(g)

  positionY(g)
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(Object(__WEBPACK_IMPORTED_MODULE_2__bk__["a" /* positionX */])(g), function (x, v) {
    g.node(v).x = x
  })
}


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export findType1Conflicts */
/* unused harmony export findType2Conflicts */
/* unused harmony export findOtherInnerSegmentNode */
/* unused harmony export addConflict */
/* unused harmony export hasConflict */
/* unused harmony export verticalAlignment */
/* unused harmony export horizontalCompaction */
/* unused harmony export buildBlockGraph */
/* unused harmony export findSmallestWidthAlignment */
/* unused harmony export alignCoordinates */
/* unused harmony export balance */
/* harmony export (immutable) */ __webpack_exports__["a"] = positionX;
/* unused harmony export sep */
/* unused harmony export width */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);




/*
 * This module provides coordinate assignment based on Brandes and Köpf, "Fast
 * and Simple Horizontal Coordinate Assignment."
 */

/*
 * Marks all edges in the graph with a type-1 conflict with the "type1Conflict"
 * property. A type-1 conflict is one where a non-inner segment crosses an
 * inner segment. An inner segment is an edge with both incident nodes marked
 * with the "dummy" property.
 *
 * This algorithm scans layer by layer, starting with the second, for type-1
 * conflicts between the current layer and the previous layer. For each layer
 * it scans the nodes from left to right until it reaches one that is incident
 * on an inner segment. It then scans predecessors to determine if they have
 * edges that cross that inner segment. At the end a final scan is done for all
 * nodes on the current rank to see if they cross the last visited inner
 * segment.
 *
 * This algorithm (safely) assumes that a dummy node will only be incident on a
 * single node in the layers being scanned.
 */
function findType1Conflicts (g, layering) {
  var conflicts = {}

  function visitLayer (prevLayer, layer) {
    // last visited node in the previous layer that is incident on an inner
    // segment.
    var k0 = 0
    // Tracks the last node in this layer scanned for crossings with a type-1
    // segment.
    var scanPos = 0
    var prevLayerLength = prevLayer.length
    var lastNode = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.last(layer)

    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layer, function (v, i) {
      var w = findOtherInnerSegmentNode(g, v)
      var k1 = w ? g.node(w).order : prevLayerLength

      if (w || v === lastNode) {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layer.slice(scanPos, i + 1), function (scanNode) {
          __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.predecessors(scanNode), function (u) {
            var uLabel = g.node(u)
            var uPos = uLabel.order
            if ((uPos < k0 || k1 < uPos) &&
                !(uLabel.dummy && g.node(scanNode).dummy)) {
              addConflict(conflicts, u, scanNode)
            }
          })
        })
        scanPos = i + 1
        k0 = k1
      }
    })

    return layer
  }

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(layering, visitLayer)
  return conflicts
}

function findType2Conflicts (g, layering) {
  var conflicts = {}

  function scan (south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
    var v
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.range(southPos, southEnd), function (i) {
      v = south[i]
      if (g.node(v).dummy) {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(g.predecessors(v), function (u) {
          var uNode = g.node(u)
          if (uNode.dummy &&
              (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
            addConflict(conflicts, u, v)
          }
        })
      }
    })
  }

  function visitLayer (north, south) {
    var prevNorthPos = -1
    var nextNorthPos
    var southPos = 0

    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(south, function (v, southLookahead) {
      if (g.node(v).dummy === 'border') {
        var predecessors = g.predecessors(v)
        if (predecessors.length) {
          nextNorthPos = g.node(predecessors[0]).order
          scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos)
          southPos = southLookahead
          prevNorthPos = nextNorthPos
        }
      }
      scan(south, southPos, south.length, nextNorthPos, north.length)
    })

    return south
  }

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(layering, visitLayer)
  return conflicts
}

function findOtherInnerSegmentNode (g, v) {
  if (g.node(v).dummy) {
    return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.find(g.predecessors(v), function (u) {
      return g.node(u).dummy
    })
  }
}

function addConflict (conflicts, v, w) {
  if (v > w) {
    var tmp = v
    v = w
    w = tmp
  }

  var conflictsV = conflicts[v]
  if (!conflictsV) {
    conflicts[v] = conflictsV = {}
  }
  conflictsV[w] = true
}

function hasConflict (conflicts, v, w) {
  if (v > w) {
    var tmp = v
    v = w
    w = tmp
  }
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(conflicts[v], w)
}

/*
 * Try to align nodes into vertical "blocks" where possible. This algorithm
 * attempts to align a node with one of its median neighbors. If the edge
 * connecting a neighbor is a type-1 conflict then we ignore that possibility.
 * If a previous node has already formed a block with a node after the node
 * we're trying to form a block with, we also ignore that possibility - our
 * blocks would be split in that scenario.
 */
function verticalAlignment (g, layering, conflicts, neighborFn) {
  var root = {}
  var align = {}
  var pos = {}

  // We cache the position here based on the layering because the graph and
  // layering may be out of sync. The layering matrix is manipulated to
  // generate different extreme alignments.
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layering, function (layer) {
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layer, function (v, order) {
      root[v] = v
      align[v] = v
      pos[v] = order
    })
  })

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layering, function (layer) {
    var prevIdx = -1
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layer, function (v) {
      var ws = neighborFn(v)
      if (ws.length) {
        ws = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.sortBy(ws, function (w) { return pos[w] })
        var mp = (ws.length - 1) / 2
        for (var i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
          var w = ws[i]
          if (align[v] === v &&
              prevIdx < pos[w] &&
              !hasConflict(conflicts, v, w)) {
            align[w] = v
            align[v] = root[v] = root[w]
            prevIdx = pos[w]
          }
        }
      }
    })
  })

  return { root: root, align: align }
}

function horizontalCompaction (g, layering, root, align, reverseSep) {
  // This portion of the algorithm differs from BK due to a number of problems.
  // Instead of their algorithm we construct a new block graph and do two
  // sweeps. The first sweep places blocks with the smallest possible
  // coordinates. The second sweep removes unused space by moving blocks to the
  // greatest coordinates without violating separation.
  var xs = {}
  var blockG = buildBlockGraph(g, layering, root, reverseSep)

  // First pass, assign smallest coordinates via DFS
  var visited = {}
  function pass1 (v) {
    if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(visited, v)) {
      visited[v] = true
      xs[v] = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(blockG.inEdges(v), function (max, e) {
        pass1(e.v)
        return Math.max(max, xs[e.v] + blockG.edge(e))
      }, 0)
    }
  }
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(blockG.nodes(), pass1)

  var borderType = reverseSep ? 'borderLeft' : 'borderRight'
  function pass2 (v) {
    if (visited[v] !== 2) {
      visited[v]++
      var node = g.node(v)
      var min = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(blockG.outEdges(v), function (min, e) {
        pass2(e.w)
        return Math.min(min, xs[e.w] - blockG.edge(e))
      }, Number.POSITIVE_INFINITY)
      if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
        xs[v] = Math.max(xs[v], min)
      }
    }
  }
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(blockG.nodes(), pass2)

  // Assign x coordinates to all nodes
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(align, function (v) {
    xs[v] = xs[root[v]]
  })

  return xs
}

function buildBlockGraph (g, layering, root, reverseSep) {
  var blockGraph = new __WEBPACK_IMPORTED_MODULE_1_ciena_graphlib__["Graph"]()
  var graphLabel = g.graph()
  var sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep)

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layering, function (layer) {
    var u
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(layer, function (v) {
      var vRoot = root[v]
      blockGraph.setNode(vRoot)
      if (u) {
        var uRoot = root[u]
        var prevMax = blockGraph.edge(uRoot, vRoot)
        blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0))
      }
      u = v
    })
  })

  return blockGraph
}

/*
 * Returns the alignment that has the smallest width of the given alignments.
 */
function findSmallestWidthAlignment (g, xss) {
  var vals = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.values(xss)

  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.minBy(vals, function (xs) {
    var maxVals = []
    var minVals = []

    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forIn(xs, function (x, v) {
      var halfWidth = width(g, v) / 2

      maxVals.push(x + halfWidth)
      minVals.push(x - halfWidth)
    })

    return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(maxVals) - __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.min(minVals)
  })
}

/*
 * Align the coordinates of each of the layout alignments such that
 * left-biased alignments have their minimum coordinate at the same point as
 * the minimum coordinate of the smallest width alignment and right-biased
 * alignments have their maximum coordinate at the same point as the maximum
 * coordinate of the smallest width alignment.
 */
function alignCoordinates (xss, alignTo) {
  var vals = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.values(alignTo)
  var alignToMin = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.min(vals)
  var alignToMax = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(vals)

  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(['u', 'd'], function (vert) {
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(['l', 'r'], function (horiz) {
      var alignment = vert + horiz
      var xs = xss[alignment]
      var delta
      if (xs === alignTo) return

      var xsVals = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.values(xs)
      delta = horiz === 'l' ? alignToMin - __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.min(xsVals) : alignToMax - __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(xsVals)

      if (delta) {
        xss[alignment] = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.mapValues(xs, function (x) { return x + delta })
      }
    })
  })
}

function balance (xss, align) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.mapValues(xss.ul, function (ignore, v) {
    if (align) {
      return xss[align.toLowerCase()][v]
    } else {
      var xs = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.sortBy(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(xss, v))
      return (xs[1] + xs[2]) / 2
    }
  })
}

function positionX (g) {
  var layering = Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* buildLayerMatrix */])(g)
  var conflicts = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.merge(findType1Conflicts(g, layering),
                          findType2Conflicts(g, layering))

  var xss = {}
  var adjustedLayering
  __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(['u', 'd'], function (vert) {
    adjustedLayering = vert === 'u' ? layering : __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.values(layering).reverse()
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(['l', 'r'], function (horiz) {
      if (horiz === 'r') {
        adjustedLayering = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(adjustedLayering, function (inner) {
          return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.values(inner).reverse()
        })
      }

      var neighborFn = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.bind(vert === 'u' ? g.predecessors : g.successors, g)
      var align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn)
      var xs = horizontalCompaction(g, adjustedLayering,
                                    align.root, align.align,
                                    horiz === 'r')
      if (horiz === 'r') {
        xs = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.mapValues(xs, function (x) { return -x })
      }
      xss[vert + horiz] = xs
    })
  })

  var smallestWidth = findSmallestWidthAlignment(g, xss)
  alignCoordinates(xss, smallestWidth)
  return balance(xss, g.graph().align)
}

function sep (nodeSep, edgeSep, reverseSep) {
  return function (g, v, w) {
    var vLabel = g.node(v)
    var wLabel = g.node(w)
    var sum = 0
    var delta

    sum += vLabel.width / 2
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(vLabel, 'labelpos')) {
      switch (vLabel.labelpos.toLowerCase()) {
        case 'l': delta = -vLabel.width / 2; break
        case 'r': delta = vLabel.width / 2; break
      }
    }
    if (delta) {
      sum += reverseSep ? delta : -delta
    }
    delta = 0

    sum += (vLabel.dummy ? edgeSep : nodeSep) / 2
    sum += (wLabel.dummy ? edgeSep : nodeSep) / 2

    sum += wLabel.width / 2
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.has(wLabel, 'labelpos')) {
      switch (wLabel.labelpos.toLowerCase()) {
        case 'l': delta = wLabel.width / 2; break
        case 'r': delta = -wLabel.width / 2; break
      }
    }
    if (delta) {
      sum += reverseSep ? delta : -delta
    }
    delta = 0

    return sum
  }
}

function width (g, v) {
  return g.node(v).width
}

/* unused harmony default export */ var _unused_webpack_default_export = ({
  alignCoordinates,
  balance,
  buildBlockGraph,
  findOtherInnerSegmentNode,
  findSmallestWidthAlignment,
  findType1Conflicts,
  findType2Conflicts,
  hasConflict,
  horizontalCompaction,
  positionX,
  sep,
  verticalAlignment,
  width
});


/***/ })
/******/ ]);