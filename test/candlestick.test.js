import FinxosDataConverter from '../src';


var response = {
  "code": 20000, "message": "OK", "data": {
    "meta": {
      "sid": "000001.SZ/ochl",
      "columns": ["open", "close", "high", "low"]
    },
    "index": [20171211, 20171212, 20171213],
    "value": [
      ["13.08", "13.4", "13.0"],
      ["13.5", "13.02", "13.13"],
      ["13.57", "13.48", "13.2"],
      ["12.88", "13.02", "12.88"]
    ]
  }
};


test('test candlestick', () => {
  const cv = new FinxosDataConverter(response.data);
  const cvRes = cv.convert();
  expect(cvRes.length).toBe(3);
  expect(cvRes[0]).toEqual({
    date: 20171211,
    trend: 0,
    '000001.SZ/ochl': ['13.08', '13.08', '13.08', '13.08']
  })
});
