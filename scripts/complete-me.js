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
        return currentNode = currentNode.children[letter];
      }
      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
      holdLetters = holdLetters + letter;
      currentNode.address = holdLetters;

    })
    currentNode.isWord = true;
  }

  find(userInput) {

  }
}
