import { Node } from './node'
const text = "/usr/share/dict/words"
const fs = require('fs');

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
    currentNode.isWord += 1;
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

    suggestions = this.suggestWords(currentNode, prefix, suggestions)

    let prioritySuggestions = suggestions.map((word) =>{
      return word.split(":").pop()
    })

    return prioritySuggestions
  }

  suggestWords(currentNode, prefix, suggestions) {
    let letterKeys = Object.keys(currentNode.children)
    let count = currentNode.isWord

    if (currentNode.isWord > 0) {
      let updatedPrefix = count + " :" + prefix

      suggestions.push(updatedPrefix)
      suggestions.sort((a, b) =>{
        return a < b
      })
    }

    letterKeys.forEach((letter)=>{
      let nextLetter = currentNode.children[letter]

      this.suggestWords(nextLetter, prefix + letter, suggestions)
    })
    return suggestions
  }

  select(word) {
    let letters = word.split('');
    let currentNode = this.head;

    letters.forEach((letter) =>{

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
      }
      return currentNode
    })
    currentNode.isWord > 0 ? currentNode.isWord++ : null
  }

  populate() {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    dictionary.forEach((word) =>{
      this.insert(word);
    })
  }

  count() {
    return this.data.length
  }
}
