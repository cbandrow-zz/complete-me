require('locus');
import { assert } from 'chai';
import { CompleteMe } from '../scripts/complete-me'
const text = "/usr/share/dict/words"
const fs = require('fs');

//console.log(JSON.stringify(completion, null, 4))

describe('Trie basic attributes', () => {
  let completion = new CompleteMe();

  it('should be an instance of CompleteMe', () => {
    assert.instanceOf(completion, CompleteMe, "completion is an instance");
  })

  it('should be have a collection, starting with an empty array', () => {
    assert.deepEqual(completion.data, []);
  })

  it('should be have a head or root value', () => {
    assert.deepEqual(completion.head.data, "");
  })
})

describe('Trie Insert', () => {
  let completion = new CompleteMe();

  it('should have a function called "Insert"', () => {
    assert.isFunction(completion.insert, "insert is a function");
  })

  it('should insert a word into a database', () => {

    completion.insert("pizza");
    assert.equal(completion.data[0], "pizza")
  });

  it('should insert another letter into a database', () => {

    completion.insert("car");
    assert.equal(completion.data[1], "car")
  });

  it('should check multiple items in the database ', () => {

    completion.insert("banana");
    completion.insert("papaya");
    assert.equal(completion.data[2], "banana")
    assert.equal(completion.data[3], "papaya")
  });

  it('should have a node for letter down the chain for a first word', () =>{

    completion.insert("car")
    assert.property(completion.head.children['c'].children['a'].children, 'r')
  })

  it('should have a node for letter down the chain for a different ending word, evaluating cat vs car', () =>{

    completion.insert("cat")
    assert.property(completion.head.children['c'].children['a'].children, 't')
  })
})

describe('Trie Count data length', () => {
  let completion = new CompleteMe();

  it('should start at zero', () => {

    assert.deepEqual(completion.count(), 0);
  })

  it('should count up', () => {
    completion.insert("cater");
    completion.insert("banana");
    completion.insert("papaya");

    assert.deepEqual(completion.count(), 3);
  })


  it('should continue to count up', () => {
    completion.insert("car")
    completion.insert("cat")

    assert.deepEqual(completion.count(), 5);
  })

})

describe('Trie Suggestion', () => {
  let completion = new CompleteMe();

  it('should suggest a small array', () => {
    completion.insert("pick")
    completion.insert("picture")

    let autoSuggest = completion.suggest('pic')

    assert.equal(autoSuggest.includes("pick"), true)
    assert.equal(autoSuggest.includes("picture"), true)

  })

  it('should suggest another small array', () => {
    completion.insert("fin")
    completion.insert("finish")
    completion.insert("finally")



    let autoSuggest = completion.suggest('fi')

    assert.equal(autoSuggest.includes("fin"), true)
    assert.equal(autoSuggest.includes("finish"), true)
    assert.equal(autoSuggest.includes("finally"), true)
  })
})

describe('Trie Populate: Store the Dictionary', () => {
  let completion = new CompleteMe();

  it('should be loaded in as an array', () => {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    assert.equal(dictionary.length, 235886)
  })

  it('should be called in the Trie', () =>{
    completion.populate()

    assert.equal(completion.data.length > 235000, true);
  })

  it('should auto suggest some options from the dictionary.', ()=>{
    let autoSuggest = completion.suggest('fi')


    assert.equal(autoSuggest.includes("fish"), true)
    assert.equal(autoSuggest.includes("finite"), true)
    assert.equal(autoSuggest.includes("fin"), true)
    assert.equal(autoSuggest.includes("fiction"), true)
  })
})

describe('Trie Select Relevant Suggestions', () => {


  it('have a function called Select', () =>{
    let completion = new CompleteMe();

    assert.isFunction(completion.select, true);
  })

  it('should select a word based on input, and increment its node isWord value', () =>{

    let completion = new CompleteMe();

    completion.insert('frog');

    assert.deepEqual(completion.head.children['f'].children['r'].children['o'].children['g'].isWord, 1)

    completion.select('frog');

    assert.deepEqual(completion.head.children['f'].children['r'].children['o'].children['g'].isWord, 2)

  })

  it('should increase count every time it is called', ()=>{
    let completion = new CompleteMe();

    completion.insert('frog');
    completion.insert('from');
    completion.insert('froglegs');

    completion.select('frog');
    completion.select('frog');
    completion.select('frog');
    completion.select('froglegs');

    completion.suggest('fro');

    assert.deepEqual(completion.head.children['f'].children['r'].children['o'].children['g'].isWord, 5)
    assert.deepEqual(completion.head.children['f'].children['r'].children['o'].children['m'].isWord, 1)
    assert.deepEqual(completion.head.children['f'].children['r'].children['o'].children['g'].children['l'].children['e'].children['g'].children['s'].isWord, 2)

  })

  it('should sort the suggestions array based on words of highest value', () =>{
    let completion = new CompleteMe();

    completion.insert('pickle');
    completion.insert('pine');
    completion.insert('pills');
    completion.insert('pizza');
    completion.insert('pizzazz');
    completion.insert('pizzle');
    completion.insert('pint');
    completion.insert('pity');

    completion.select('pizza');
    completion.select('pizza');
    completion.select('pizza');
    completion.select('pint');
    completion.select('pint');
    completion.select('pizzazz');

    let suggestion = completion.suggest('pi');

    assert.deepEqual(suggestion, ['pizza', 'pint', 'pizzazz', 'pizzle', 'pity', 'pine', 'pills', 'pickle'])
  })

})
