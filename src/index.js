const RETURN_VALUE = function (inValue) { return inValue };
export default class {

  constructor(inData, inChartType) {
    this.data = inData;
    this.chartType = inChartType;
  }
  // line|bar|candlestick
  convert(inCallback) {
    //todo: buggy dispatch
    const columns = this.data.meta.columns;
    const colLength = columns.length;
    const callback = inCallback || RETURN_VALUE;

    switch (true) {
      case this.chartType != null:
        return this[this.chartType || 'interval'](callback)
      case !this.chartType && colLength === 4:
        return this.candlestick(callback);
      default:
        console.log('this way');
        return this.interval(callback);
    }
  }

  candlestick(inCallback) {
  }

  interval(inCallback) {
    const dataArray = this.data.value[0];
    const indexes = this.data.index;
    return dataArray.map((dataItem, idx) => {
      return inCallback({
        index: indexes[idx],
        value: dataItem
      });
    });
  }

}
