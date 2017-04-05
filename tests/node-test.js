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

  it('should not be a word by default, or have a zero count', () => {
    assert.equal(node.isWord, 0);
  })

  it('should grab an incomplete word', () =>{
    let completion = new CompleteMe;
    completion.insert("fire")
    assert.property(completion.head.children['f'].children['i'].children, 'r');
    assert.equal(completion.head.children['f'].children['i'].children['r'].isWord, false);
  })

  it('should grab a complete word', () =>{
    let completion = new CompleteMe;

    completion.insert("fire")
    assert.property(completion.head.children['f'].children['i'].children['r'].children, 'e');
    assert.equal(completion.head.children['f'].children['i'].children['r'].children['e'].isWord, true);
  })

})
