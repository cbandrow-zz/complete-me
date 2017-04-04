import { Node } from './node'

export class CompleteMe {
  constructor() {
    this.head = new Node('');
    this.data = [];
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
    let letters = prefix.split('');
    let currentNode = this.head;

    let suggestions = [];

    letters.forEach((letter) =>{
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
        return
      } else {
        return null;
      }
    })

    return suggestions = this.suggestWords(currentNode, prefix, suggestions)
  }

  suggestWords(currentNode, prefix, suggestions) {
    let letterKeys = Object.keys(currentNode.children)

    if (currentNode.isWord === true) {
      suggestions.push(prefix)
    }

    letterKeys.forEach((letter)=>{
      let nextLetter = currentNode.children[letter]

      this.suggestWords(nextLetter, prefix + letter, suggestions)
    })
    return suggestions
  }

  count() {
    return this.data.length
  }
}
