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

import GroupConverter from '../src/group';

test("test group convert", () => {
  const cv = new GroupConverter(sourceData, def);
  // console.log(cv.getResultList());
  console.log(cv.convert());
});
