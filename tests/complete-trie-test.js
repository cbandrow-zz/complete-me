require('locus');
import { assert } from 'chai';
import { CompleteMe } from '../scripts/complete-me'
import { Node } from '../scripts/node'

describe('Trie functionality', () => {
  let completion = new CompleteMe();

  it('should be an instance of CompleteMe', () => {
    assert.instanceOf(completion, CompleteMe, "completion is an instance");
  })

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
