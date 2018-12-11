/*
{
  date: ['20180101', '20180102', '20180103'],
  value: [13, 14, 15]
}


{
    "code": 20000,
    "message": "OK",
    "data": {
        "index": [
            20080930,
            20081231,
            20090331
        ],
        "meta":{"sid":"1010000007","columns":["value"]
        "value": [
            [
                "8254.19",
                "8879.43",
                "7405.31"
            ]
        ]
    }
}
*/

import FinxosDataConverter from '../src';

var response = {
  "code": 20000,
  "message": "OK",
  "data": {
    "index": [
      20080930,
      20081231,
      20090331
    ],
    "meta": {
      "sid": "1010000007",
      "columns": ["value"]
    },
    "value": [
      [
        "8254.19",
        "8879.43",
        "7405.31"
      ]
    ]
  }
};

test('test interval data:', () => {
  const cv = new FinxosDataConverter(response.data).convert();
  const cv2 = new FinxosDataConverter(response.data).convert((item) => {
    return {
      key: item.index,
      value: item.value
    };
  });

  const exValue = [{ index: 20080930, value: '8254.19' },
  { index: 20081231, value: '8879.43' },
  { index: 20090331, value: '7405.31' }];
  const exValue2 = [{ key: 20080930, value: '8254.19' },
  { key: 20081231, value: '8879.43' },
  { key: 20090331, value: '7405.31' }];

  expect(cv).toEqual(exValue)
  expect(cv2).toEqual(exValue2)
});
