export class Node {
  constructor(data = null, children = {}) {
    this.data = data
    this.children = children
    this.isWord = false;
    this.address = ''
  }
}
