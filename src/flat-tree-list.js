export default class {
  get rootId() {
    return '__root__'
  }

  get items() {
    let result = []
    this._groups.forEach((group) => {
      result = result.concat(group.children)
    })
    return result
  }

  constructor(inItems) {
    this._groups = [
      {
        id: this.rootId,
        children: inItems
      }
    ]
  }

  id(inItem) {
    return typeof this._id === 'function' ? this._id(inItem) : inItem[this._id]
  }

  add(inId, inItem) {
    const length = this.items.length
    for (let i = 0; i < this._groups.length; i++) {
      const group = this._groups[i]
      if (group.id === inId) {
        group.children.push(inItem)
        break
      }
    }

    if (this.items.length === length) {
      this._groups.push({
        id: inId,
        children: [inItem]
      })
    }
  }

  remove(inId) {
    let idx = -1
    this._groups.forEach((item, index) => {
      if (inId === item.id) {
        idx = index
      }
    })
    this._groups.splice(idx, 1)
  }
}
