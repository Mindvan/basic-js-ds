const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.node === null) {
      this.node = newNode;
      return;
    }

    this.addNode(this.node, newNode);
  }

  addNode(node, data) {
    if (data.data < node.data) {
      if (node.left === null) {
        node.left = data;
        return;
      }

      this.addNode(node.left, data);
      return;
    }

    if (node.right === null) {
      node.right = data;
      return;
    }

    this.addNode(node.right, data);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data, node = this.node) {
    if (node === null || node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this.find(data, node.left);
    } else {
      return this.find(data, node.right);
    }
  }

  remove(data) {
    let node = this.find(data);
    if (!node) return;

    this.removeNode(this.node, data);
  }

  removeNode(node, data) {
    if (node === null) return null;

    if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    }

    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.left === null) {
      return node.right;
    }

    if (node.right === null) {
      return node.left;
    }

    let newNode = this.min(node.right);
    node.data = newNode;
    node.right = this.removeNode(node.right, newNode);
    return node;
  }

  min(node = this.node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  max(node = this.node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
