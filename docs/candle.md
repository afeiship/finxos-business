## 蜡烛图数据类型
sid: '100030.SH'
source data structure
```js
{
  date: ['20180101', '20180102', ...],
  open: [10, 11, ...],
  close: [10.4, 10.9, ...],
  high: [10.6, 11.9, ...],
  low: [9.8, 10.7, ...]
}
```
destination data structure
```js

[{
  date: '20180101',
  '100030.SH': [10, 10.4, 10.6, 9.8],
  trend: 1
}, {
  date: '20180102',
  '100030.SH': [11, 10.9, 11.9, 10.7],
  trend: 0
}]
chart
  .schema()
  .position('date*100030.SH')
  .color('trend', trend => ['#F4333C', '#1CA93D'][trend])
  .shape('candle)
```
