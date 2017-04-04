require('locus');
import { assert } from 'chai';
import CompleteMe from '../scripts/complete-me'
import Node from '../scripts/node'

describe('Node Attributes', () => {

  let node = new Node("ugh");

  it('should be an instance of Node', () => {
    assert.instanceOf(node, Node, "node is a new node instance");
  })

  it('should have data value', () => {
    assert.equal(node.data,  "ugh");
  })

  it('should have no children by default', () => {
    assert.equal(node.children, null);
  })
  
  it('should not be a word by default', () => {
    assert.equal(node.isWord, false);
  })

})
