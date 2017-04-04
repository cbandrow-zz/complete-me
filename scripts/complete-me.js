import { Node } from './node'

export class CompleteMe {
  constructor() {
    this.head = new Node('');
    this.data = []
  }
  insert (userInput) {
    let currentNode = this.head;
    let holdLetters = '';

    this.data.push(userInput)
    userInput.split('').forEach(letter => {

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }

      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
      holdLetters = holdLetters + letter;
      currentNode.address = holdLetters;

    })
    currentNode.isWord = true;
  }

  find(input) {
    // let findLetters = '';
    let currentNode = this.head;

    input.split('').forEach( letter => {
      if (currentNode.children[letter] !== letter) {
        currentNode = currentNode.children[letter];
      }
      if (currentNode.address === input) {
        return currentNode;
      }
      return currentNode
    })
    return currentNode
  }

  suggest(address) {
    let suggestion = [];
    let currentNode = this.find(address)
    // find node
    // check node children isWord ? addToArray : false
    // suggest children nodes
    // return array of children
  }
  count() {
    return this.data.length
  }
}
