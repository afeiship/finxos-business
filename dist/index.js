'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RETURN_VALUE = function RETURN_VALUE(inValue) {
  return inValue;
};

var _default = function () {
  function _default(inData, inChartType) {
    _classCallCheck(this, _default);

    this.data = inData;
    this.chartType = inChartType;
  }
  // line|bar|candlestick


  _createClass(_default, [{
    key: 'convert',
    value: function convert(inCallback) {
      //todo: buggy dispatch
      var columns = this.data.meta.columns;
      var colLength = columns.length;

      switch (true) {
        case this.chartType != null:
          return this[this.chartType || 'interval'](inCallback);
        case !this.chartType && colLength === 4:
          return this.candlestick(inCallback);
        default:
          return this.interval(inCallback);
      }
    }
  }, {
    key: 'candlestick',
    value: function candlestick(inCallback) {
      var callback = inCallback || RETURN_VALUE;
      var indexes = this.data.index;
      var dataValue = this.data.value;
      var candleName = this.data.meta.sid;

      var _dataValue = _slicedToArray(dataValue, 4),
          openArray = _dataValue[0],
          closeArray = _dataValue[1],
          highArray = _dataValue[2],
          lowArray = _dataValue[3];

      return indexes.map(function (index, idx) {
        var dataOpen = openArray[idx];
        var dataClose = closeArray[idx];
        var dataHigh = highArray[idx];
        var dataLow = lowArray[idx];
        return callback(_defineProperty({
          date: index,
          trend: +(dataOpen > dataClose)
        }, candleName, [dataOpen, dataClose, dataHigh, dataLow]));
      });
    }
  }, {
    key: 'interval',
    value: function interval(inCallback) {
      var callback = inCallback || RETURN_VALUE;
      var dataArray = this.data.value[0];
      var indexes = this.data.index;
      return dataArray.map(function (dataItem, idx) {
        return callback({
          index: indexes[idx],
          value: dataItem
        });
      });
    }
  }]);

  return _default;
}();

exports.default = _default;