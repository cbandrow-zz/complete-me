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
    currentNode.isWord > 1 ? currentNode.isWord = 1 : currentNode.isWord += 1;
  }

  populate() {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    dictionary.forEach((word) =>{
      this.insert(word);
    })
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

  find(prefix) {

    let letters = prefix.split('');
    let currentNode = this.head;

    letters.forEach((letter) =>{

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
        return
      } else {
        return null;
      }
    })

    return currentNode
  }

  suggest(prefix) {
    let currentNode = this.find(prefix);
    let suggestions = [];
    let updateSuggestions;
    let prioritySuggestions;

    suggestions = this.suggestWords(currentNode, prefix, suggestions)
    updateSuggestions = this.sortSuggestions(suggestions);
    prioritySuggestions = updateSuggestions.map((word) =>{
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
    }

    letterKeys.forEach((letter)=>{
      let nextLetter = currentNode.children[letter]

      this.suggestWords(nextLetter, prefix + letter, suggestions)
    })
    return suggestions
  }

  sortSuggestions(arr) {
    let holder;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j + 1] > arr[j]) {
          holder = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = holder;
        }
      }
    }
    return arr;
  }


  count() {
    return this.data.length
  }
}
