const RETURN_VALUE = (inValue) => inValue;

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

    switch (true) {
      case this.chartType != null:
        return (this[this.chartType] || this.interval)(inCallback)
      case !this.chartType && colLength === 4:
        return this.candlestick(inCallback);
      default:
        return this.interval(inCallback);
    }
  }

  candlestick(inCallback) {
    const callback = inCallback || RETURN_VALUE;
    const indexes = this.data.index;
    const dataValue = this.data.value;
    const candleName = this.data.meta.sid;
    const [openArray, closeArray, highArray, lowArray] = dataValue;
    return indexes.map((index, idx) => {
      const dataOpen = openArray[idx];
      const dataClose = closeArray[idx];
      const dataHigh = highArray[idx];
      const dataLow = lowArray[idx];
      return callback({
        date: index,
        trend: +(dataOpen > dataClose),
        [candleName]: [dataOpen, dataClose, dataHigh, dataLow]
      })
    });
  }

  interval(inCallback) {
    const callback = inCallback || RETURN_VALUE;
    const dataArray = this.data.value[0];
    const indexes = this.data.index;
    return dataArray.map((dataItem, idx) => {
      return callback({
        index: indexes[idx],
        value: dataItem
      });
    });
  }

}
