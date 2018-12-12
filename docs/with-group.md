# data with group:

## uml:
- getOneKey: 得到一个 key from defs
- 直接从 soureData 得到这个 key 对应的 value
- 得到这个 value 的 length
- 得到 sourceData 的 keys
- for --- length 组装数据
  ~~~
  var result = [];
  for ... length
    keys.forEach(key=>{
      if(def[key].columns.len === 4){
        result.push({
          date: sourceData[key][i].date,
          sid: key,
          [def[key].group]: [sourceData[key][i].open, sourceData[key][i].close, sourceData[key][i].high, sourceData[key][i].low],
          [`trident.${def[key].group}`]: +(sourceData[key][i].open > sourceData[key][i].close)
        })
      }
      if(def[key].columns.len === 1){
        result.push({
          date: sourceData[key][i].date,
          sid: key,
          [def[key].group]: sourceData[key][i].value,
          [`trident.${def[key].group}`]: +(sourceData[key][i].open > sourceData[key][i].close)
        })
      }
    })
  end
  ~~~

## data structure:

```js
const sourceData = {
  "100030.SH": [
    { date: "20180101", open: 1, close: 2, high: 3, low: 4 },
    { date: "20180102", open: 2, close: 1, high: 2, low: 2 },
    { date: "20180103", open: 3, close: 3, high: 3, low: 3 }
  ],
  "20304827": [
    { date: "20180101", value: 1 },
    { date: "20180102", value: 2 },
    { date: "20180103", value: 3 }
  ]
};

const def = {
  "100030.SH": {
    group: "g1",
    columns: ["open", "close", "high", "low"]
  },
  "20304827": {
    group: "g2",
    columns: ["value"]
  }
};

const destData = [
  {
    date: "20180101",
    g1: [1, 2, 3, 4],
    g2: null,
    sid: "100030.SH",
    "trend.g1": 1
  },
  {
    date: "20180101",
    g1: null,
    g2: 1,
    sid: "20304827",
    "trend.g1": null
  },
  {
    date: "20180102",
    g1: [2, 1, 3, 4],
    g2: null,
    sid: "100030.SH",
    "trend.g1": 0
  },
  {
    date: "20180102",
    g1: null,
    g2: 2,
    sid: "20304827",
    "trend.g1": null
  }
];
```
