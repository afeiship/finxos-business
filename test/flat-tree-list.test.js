import FlatTreeList from '../src/flat-tree-list';

test('test group: 点击 同比', () => {
  const treeList = new FlatTreeList([
    {
      sid: 'dataA',
      data: 111
    },
    {
      sid: 'dataB',
      data: 222
    },
    {
      sid: 'dataB',
      data: 333
    }
  ]);

  // click1 -> ajax -> response({ sid: 'fn1(dataA)', data: 'xxx' })
  treeList.add('dataA', { sid: 'fn1(dataA)', data: 'xxx' });
  treeList.add('dataA', { sid: 'fn2(dataA)', data: 'yyy' });
  treeList.add('fn2(dataA)', { sid: 'fn1(fn2(dataA))', data: 'ccc' });
  console.log(treeList.serialize())
  treeList.remove('dataA');
  console.log(treeList.serialize())
});
