export default class {
  constructor(inData, inDefs) {
    this.data = inData;
    this.defs = inDefs;
  }
  getKeys() {
    return Object.keys(this.defs);
  }
  getGroupList() {
    const keys = this.getKeys();
    return keys.map(key => {
      return this.defs[key].group;
    });
  }
  getRandomKey() {
    return this.getKeys()[0];
  }
  getDataSize() {
    const randomKey = this.getRandomKey();
    return this.data[randomKey].length;
  }
  createNilGroupList() {
    const result = [];
    const length = this.getKeys().length * this.getDataSize();
    const groupList = this.getGroupList();

    for (let index = 0; index < length; index++) {
      const item = {};
      groupList.forEach(groupKey => {
        item[groupKey] = null;
      });
      result.push(item);
    }
    return result;
  }
  convert() {
    const result = this.createNilGroupList();
    const keys = this.getKeys();
    const length = keys.length * this.getDataSize();
    const sourceData = this.data;

    for (let i = 0; i < length; i++) {
      keys.forEach(key => {
        const groupKey = this.defs[key].group;
        //candlestick:
        if (this.defs[key].columns.length === 4) {
          Object.assign(result[i], {
            date: sourceData[key][i].date,
            sid: key,
            [groupKey]: [
              sourceData[key][i].open,
              sourceData[key][i].close,
              sourceData[key][i].high,
              sourceData[key][i].low
            ],
            [`trend.${groupKey}`]: +(
              sourceData[key][i].open > sourceData[key][i].close
            )
          });
        }
        // interval line:
        if (this.defs[key].columns.length === 1) {
          Object.assign(result[i], {
            date: sourceData[key][i].date,
            sid: key,
            [groupKey]: sourceData[key][i].value,
            [`trend.${groupKey}`]: +(
              sourceData[key][i].open > sourceData[key][i].close
            )
          });
        }
      });
    }
    return result;
  }
}
