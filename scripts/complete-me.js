import { Node } from './node'

export class CompleteMe {
  constructor() {
    this.head = new Node('');
    this.data = [];
    this.suggestions = [];
  }

  insert (userInput) {
    let currentNode = this.head;

    this.data.push(userInput)
    userInput.split('').forEach(letter => {

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }

      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
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
}
