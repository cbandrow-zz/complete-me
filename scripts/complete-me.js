import Node from '../scripts/node'

export default class CompleteMe {
  constructor() {
    this.head = new Node();
    this.data = []
  }

  insert(input) {
    this.data.push(input);
    let current = this.head;
    let holder = input.split('');

    while (current.children[holder[0]]) {
      current = current.children[holder.shift()]
    }
    while (!current.children[holder[1]]) {
      if (!holder[0]) {
        return
      } else {
        current = new Node(holder[0], holder[1])
        holder.shift();
      }
    }
  }
  //   this.data.push(str)
  //   let word = str.split('')
  //
  //   word.forEach((val, i) => {
  //     if (!val.children[i + 1]) {
  //       let newNode = new Node(word[i + 1], this.insert(word.splice( i + 1, word.length)))
  //       console.log(newNode);
  //     } else if (!word[i + 1]) {
  //       return this.isWord = true;
  //     } else {
  //       val.children[i + 1] = this.insert(word.splice(i + 1, word.length))
  //     }
  //   })
  // }
}
