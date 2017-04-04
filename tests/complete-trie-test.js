require('locus');
import { assert } from 'chai';
import { CompleteMe } from '../scripts/complete-me'
import { Node } from '../scripts/node'

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

describe('Trie Find', () => {
  let completion = new CompleteMe();

  completion.insert("car")
  completion.insert("cat")
  completion.insert("cater");
  it('return the node of a spcecific word', () => {
    assert.deepEqual(completion.find('car'), completion.head.children['c'].children['a'].children['r']);
  })

  it('should return the node of similar words', () =>{
    assert.deepEqual(completion.find('cat'), completion.head.children['c'].children['a'].children['t']);

    assert.deepEqual(completion.find('cater'), completion.head.children['c'].children['a'].children['t'].children['e'].children['r']);
  })
})

describe('Trie Count', () => {
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

    assert.deepEqual(completion.suggestion(), );
  })

  it('should suggest a bigger array', () => {
    assert.deepEqual(completion.suggestion(), );
  })

  it('should suggest a large array', () => {
    assert.deepEqual(completion.suggestion(), );
  })
})
