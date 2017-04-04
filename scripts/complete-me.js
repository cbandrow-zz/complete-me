import { Node } from './node'

export class CompleteMe {
  constructor() {
    this.head = new Node('');
    this.data = [];
    this.suggestions = [];
  }

  insert (userInput) {
    let currentNode = this.head;
    let holdLetters = ''

    this.data.push(userInput)
    userInput.split('').forEach(letter => {

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];

        // holdLetters = holdLetters + letter;
        // currentNode.address = holdLetters;
        return;
      }

      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];

      // holdLetters = holdLetters + letter;
      // currentNode.address = holdLetters;
      // holdLetters = currentNode.address + letter;

    })
    currentNode.isWord = true;
  }

  suggest(prefix) {
    this.suggestions = [];
    let letters = prefix.split('');
    let currentNode = this.head;

    letters.forEach((letter) =>{
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
      } else {
        return null;
      }
    })
    
    return this.suggestWords(currentNode, prefix)
  }

  suggestWords(currentNode, prefix) {
    let letterKeys = Object.keys(currentNode.children)

    if (currentNode.isWord === true) {
      this.suggestions.push(prefix)
    }

    letterKeys.forEach((letter)=>{
      let nextLetter = currentNode.children[letter]

      this.suggestWords(nextLetter, prefix + letter)
    })
    return
  }

  count() {
    return this.data.length
  }


  find(input) {
    // uses Address, not needed.
    let currentNode = this.head;

    input.split('').forEach( letter => {
      if (currentNode.children[letter] !== letter) {
        currentNode = currentNode.children[letter];
      }
      if (currentNode.data === input.length) {
        return currentNode;
      }
      return currentNode
    })
    return currentNode
  }
}
