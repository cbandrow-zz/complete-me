require('locus');
import { assert } from 'chai';
import CompleteMe from '../scripts/complete-me'
import Node from '../scripts/node'

describe('Trie functionality', () => {
  let completion = new CompleteMe();

  it('should be an instance of CompleteMe', () => {
    assert.instanceOf(completion, CompleteMe, "completion is an instance");
  })

  it('should have a function called "Insert"', () => {
    assert.isFunction(completion.insert, "insert is a function");
  })

  it.only('should insert a word into a searchable database', () => {

    completion.insert("pizza");
    assert.equal(completion.data[0], "pizza")
  });

  it('should create a new node for each character in the split array', () =>{

    completion.insert("bananas")
  })

})
