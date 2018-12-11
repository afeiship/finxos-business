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
        return this.interval(callback);
    }
  }

  candlestick(inCallback) {
    const indexes = this.data.index;
    const dataValue = this.data.value;
    const candleName = this.data.meta.sid;
    return indexes.map((index, idx) => {
      const dataOpen = dataValue[0][idx];
      const dataClose = dataValue[0][idx];
      const dataHigh = dataValue[0][idx];
      const dataLow = dataValue[0][idx];
      return inCallback({
        date: index,
        trend: +(dataOpen > dataClose),
        [candleName]: [dataOpen, dataClose, dataHigh, dataLow]
      })
    });
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
