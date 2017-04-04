export default class Node {
  constructor(data, children = null) {
    this.data = data;
    this.children = children
    this.isWord = false;
  }

}
