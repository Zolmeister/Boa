var Boa = (function() {
  
  function reduce(fn, arr, s) {
    var i=0
    if(typeof s === 'undefined'){
      s=arr[0]
      i++
    }
    for(var l = arr.length; i<l;i++) {
      s = fn(arr[i], s)
    }
    return s
  }
  
  function range(start, stop, step) {
      if (arguments.length <= 1) {
        stop = start || 0
        start = 0
      }
      step = arguments[2] || 1
  
      var len = Math.max(Math.ceil((stop - start) / step), 0)
      var idx = 0
      var range = new Array(len)
  
      while (idx < len) {
        range[idx++] = start
        start += step
      }
  
      return range
    }
  
  return {
    abs: Math.abs,
    all: function(arr){
      for(var i=0,l=arr.length; i < l ; i++) {
        if(!arr[i]) return false
      }
      return true
    },
    any: function(arr) {
      for(var i=0,l=arr.length; i < l ; i++) {
        if(arr[i]) return true
      }
      return false
    },
    basestring: null,
    bin: function(n) {
      return n.toString(2)
    },
    bool: function(o) {
      return !!o
    },
    bytearray: null,
    callable: function(o) {
      return typeof o === 'function'
    },
    chr: function(c) {
      return String.fromCharCode(c)
    },
    cmp: function(a, b) {
      return a-b
    },
    compile: null,
    complex: null,
    delattr: function(o, name) {
      delete o[name]
    },
    dict: function(arr){
      var o = {}
      for(var i=0, l=arr.length;i<l;i++) {
        if(arr[i].length !== 2) throw new Error('Expected a list of 2 element arrays')
        o[arr[i][0]] = arr[i][1]
      }
      return o
    },
    dir: null,
    divmod: function(a, b) {
      return [a/b, a%b]
    },
    enumerate: function(arr) {
      // TODO: ES6 generator?
      var a = []
      for(var i=0, l=arr.length;i<l;i++) {
        a.push([i, arr[i]])
      }
      return a
    },
    eval: eval,
    execfile: null,
    file: function(f, options) {
      if(typeof fs !== 'undefined' && fs.readFileSync) {
        return fs.readFileSync(f, options)
      }
      return null
    },
    filter: function(fn, arr) {
      var a = []
      for(var i=0, l=arr.length;i<l;i++) {
        if (fn(arr[i])){
          a.push(arr[i])
        }
      }
      return a
    },
    float: function(n) {
      return parseFloat(n)
    },
    format: null,
    frozenset: null,
    getattr: function(o, name, def) {
      if (!def && !o[name]) throw new Error('Object does not have that key')
      return o[name] || def
    },
    globals: function() {
      if(typeof window !== 'undefined') return window
      if(typeof GLOBAL !== 'undefined') return GLOBAL
      return {}
    },
    hasattr: function(o, name) {
      return !!o[name]
    },
    hash: function(o) {
      return o.toString()
    },
    help: null,
    hex: function(n) {
      return n.toString(16)
    },
    int: function(n, base) {
      base = base || 10
      return parseInt(n, base)
    },
    isinstance: function(o, c) {
      return o instanceof c
    },
    issubclass: null,
    iter: function(o) {
      // TODO: ES6 generator?
      return Array.apply([], o)
    },
    len: function(s) {
      return s.length
    },
    list: function(o) {
      return Array.apply([], o)
    },
    locals: null,
    long: function(n, base){
      base = base || 10
      return parseInt(n, base)
    },
    map: function() {
      var args = Array.apply([], arguments)
      var fn = args.shift()
      if(!(typeof fn === 'function')) {
        args.unshift(fn)
        fn = function() {
          if (arguments.length == 1) return arguments[0]
          return Array.apply([], arguments)
        }
      }
      var l = reduce(function(arr, maxx){
        return Math.max(arr.length, maxx)
      }, args, 0)
      var res = []
      for(var i=0; i<l; i++) {
        if(args.length === 1) {
          res.push(fn(args[0][i]))
        } else {
          var t = []
          for(var j=0, jl=args.length;j<jl;j++){
            t.push(fn(args[j][i]))
          }
          res.push(t)
        }
      }
      
      return res
    },
    max: function max() {
      var args = Array.apply([], arguments)
      if (args.length === 1 && typeof args[0].length !== 'undefined'){
        return max.apply(null, args)
      }
      var m = Math.max(args.pop(), args.pop())
      if(args.length > 0) return max(args.concat(m))
      return m
    },
    memoryview: null,
    min: function min() {
      var args = Array.apply([], arguments)
      if (args.length === 1 && typeof args[0].length !== 'undefined'){
        return max.apply(null, args)
      }
      var m = Math.min(args.pop(), args.pop())
      if(args.length > 0) return max(args.concat(m))
      return m
    },
    next: null,
    object: function() {
      return {}
    },
    oct: function(n) {
      return n.toString(8)
    },
    open: function(name, options) {
      if(typeof fs !== 'undefined' && fs.readFileSync) {
        return fs.readFileSync(f, options)
      }
      return null
    },
    ord: function(s) {
      return s.charCodeAt(0)
    },
    pow: function(a, b, c) {
      // TODO: if modding, this can be heavily optimized
      c = c || 1
      return Math.pow(a, b) % c
    },
    print: function(){
      console.log.apply(null, Array.apply([], arguments))
    },
    property: null,
    range: range,
    raw_input: null,
    reduce: reduce,
    reload: null,
    repr: function(o) {
      return JSON.stringify(o)
    },
    reversed: function(arr) {
      var a = []
      for(var i=arr.length-1; i>=0;i--){
        a.push(arr[i])
      }
      return a
    },
    round: function(n, digits) {
      var multiplier = Math.pow(10, digits)
      return (Math.round(n*multiplier)/multiplier).toFixed(digits)
    },
    set: function(arr) {
      var o = {}
      for(var i=0, l=arr.length;i<l;i++) {
        o[arr[i]] = true
      }
      return Object.keys(o)
    },
    setattr: function(o, name, val) {
      o[name] = val
    },
    slice: null,
    sorted: function(arr, cmp, key, reverse) {
      reverse = reverse || false
      key = key || function(n){ return n}
      cmp = cmp || function(a, b) {
        return a-b
      }
      var a = []
      for(var i=0,l=arr.length;i<l;i++) {
        a.push(arr[i])
      }
      return a.sort(function(a, b){
        return cmp(key(a), key(b))
      })
    },
    staticmethod: null,
    str: function(s) {
      return s.toString()
    },
    sum: function(arr, start) {
      start = start || 0
      var sum = 0
      for(var i=0, l=arr.length;i<l;i++) {
        sum+=arr[i]
      }
      return sum
    },
    super: null,
    tuple: function(arr) {
      return arr
    },
    type: function(o) {
      return typeof o
    },
    unicode: function(s) {
      return s.toString()
    },
    vars:null,
    // TODO: ES6 generators?
    xrange: range,
    zip: function () {
      //if 2d list passed in, bubble it down
      if (arguments.length === 1 && arguments[0] instanceof Array && arguments[0][0] instanceof Array) {
        return zip.apply(this, arguments[0])
      }

      var args = [].slice.call(arguments);
      var shortest = args.length == 0 ? [] : args.reduce(function (a, b) {
        return a.length < b.length ? a : b
      });

      return shortest.map(function (_, i) {
        return args.map(function (array) {
          return array[i]
        })
      });
    }
  }
})()