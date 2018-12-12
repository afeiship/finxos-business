export default class {
  get keys() {
    return Object.keys(this.defs);
  }
  get groupList() {
    return this.keys.map(key => this.defs[key].group);
  }
  get randomKey() {
    return this.keys[0];
  }
  get dataSize() {
    return this.data[this.randomKey].length;
  }
  get resultSize() {
    return this.dataSize * this.keys.length;
  }
  constructor(inData, inDefs) {
    this.data = inData;
    this.defs = inDefs;
  }
  getEmptyList() {
    const result = [];
    for (let index = 0; index < this.resultSize; index++) {
      const item = {};
      this.groupList.forEach(groupId => {
        item[groupId] = null;
      });
      result.push(item);
    }
    return result;
  }
  convert() {
    const result = this.getEmptyList();
    let rstIndex = 0;
    for (let i = 0; i < this.dataSize; i++) {
      for (let j = 0; j < this.keys.length; j++) {
        const key = this.keys[j];
        const currentData = this.data[key][i];
        const groupKey = this.defs[key].group;
        const isIntervalData = this.defs[key].columns.length === 1;

        console.log("isIntervalData:->", isIntervalData);

        if (isIntervalData) {
          const { value, ...dataItem } = currentData;
          Object.assign(result[rstIndex], {
            ...dataItem,
            sid: key,
            [groupKey]: value
          });
        } else {
          const { open, close, high, low, ...dataItem } = currentData;
          Object.assign(result[rstIndex], {
            ...dataItem,
            sid: key,
            [groupKey]: [open, close, high, low],
            [`trend.${groupKey}`]: +(open > close)
          });
        }

        rstIndex++;
      }
    }
    return result;
  }
}
