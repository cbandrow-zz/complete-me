import { Node } from './node'
const text = "/usr/share/dict/words"
const fs = require('fs');

export class CompleteMe {
  constructor() {
    this.head = new Node('');
    this.data = [];
  }

  insert (userInput) {
    //start the node chain at the head in the constructor
    let currentNode = this.head;

    //push each input into the user data as our dictionary.
    //this will be used later to input our entire dictionary.
    this.data.push(userInput)
    //split each word into it's own array of letters.
    userInput.split('').forEach(letter => {
      //for each letter in each array, check to see if the Current Node we are on exists at that character.
      //IF NOT go to lower line.
      //IF SO, create a new node at of that character.
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }
      //If above is n/e, create a new node at that letter, as a child of the current node.
      //Input = cat. C is first node, A is child.
      // A is next node, T is child.
      // T is next node, null is child.
      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
    })
    //once the return statement bumps you out, take the last node, and log it as a word. Used for counting later.
    currentNode.isWord += 1;
  }

  suggest(prefix) {
    //user inputs part of a word or full word to find.
    //split the entered word into a new array
    let letters = prefix.split('');
    let currentNode = this.head;
    //we will store results in a new array.
    let suggestions = [];

    //similar to first method, lets iterate through the node down the chain at each letter till we get to the last node.
    letters.forEach((letter) =>{

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter]
        return
      } else {
        return null;
      }
    })
    //push currentNode, prefix, and the empty array to the next function.
    suggestions = this.suggestWords(currentNode, prefix, suggestions)

    let prioritySuggestions = suggestions.map((word) =>{
      return word.split(":").pop()
    })

    return prioritySuggestions
  }

  suggestWords(currentNode, prefix, suggestions) {
    //look at the child nodes of each current key
    let letterKeys = Object.keys(currentNode.children)
    //also store the number of times a word has been used.
    let count = currentNode.isWord

    //if the word exists, push it plus the new count into the array.
    //sort the values.
    if (currentNode.isWord > 0) {
      let updatedPrefix = count + " :" + prefix

      suggestions.push(updatedPrefix)
      suggestions.sort((a, b) =>{
        return a < b
      })
    }
    //iterate through each letter. Letters are only available as possible children to the currentNode.
    //changes through every recursive loop, called below.
    //runs until it hits null.
    //then returns down the stack.
    letterKeys.forEach((letter)=>{
      let nextLetter = currentNode.children[letter]
      
      //move the nextletter to the next child in the node to evaluate it's children nodes.
      //
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
        currentNode.isWord > 0 ? currentNode.isWord++ : null
      }
      return
    })
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
