require('locus');
import { assert } from 'chai';
import { CompleteMe } from '../scripts/complete-me'
import { Node } from '../scripts/node'

describe('Node Attributes', () => {

let node = new Node("ugh");

  it('should be an instance of Node', () => {
    assert.instanceOf(node, Node, "node is a new node instance");
  })

  it('should have data value', () => {
    assert.equal(node.data,  "ugh");
  })

  it('children should be an empty object', () => {
    assert.deepEqual(node.children, {});
  })

  it('should not be a word by default', () => {
    assert.equal(node.isWord, false);
  })

  it('should have an address which contains letters, but starts empty', () =>{
    assert.equal(node.address, '');
  })

  it('should have an incompleted address before the last node', () =>{
    let completion = new CompleteMe;
    completion.insert("fire")
    assert.deepEqual(completion.head.children['f'].children['i'].children['r'].address, 'fir');
  })

  it('should have a completed address at the last node', () =>{
    let completion = new CompleteMe;
    completion.insert("fire")
    assert.deepEqual(completion.head.children['f'].children['i'].children['r'].children['e'].address, 'fire');
  })

})
