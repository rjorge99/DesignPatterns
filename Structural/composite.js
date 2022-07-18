// The Composite pattern allows the creation of objects with properties that are primitive items or a collection of objects
// Each item in the collection can hold other collections themselves, creating deeply nested structures.
// A tree control is a perfect example of a Composite pattern

// Sample 1

function Node(name) {
    this.children = [];
    this.name = name;
}

Node.prototype = {
    add: function (child) {
        this.children.push(child);
    },
    remove: function (child) {
        var index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    },
    getChild: function (index) {
        return this.children[index];
    },
    hasChildren: function () {
        return this.children.length > 0;
    }
};

// Recursively traverse a (sub) tree
function traverse(indent, node) {
    console.log(Array(indent++).join('--') + node.name);

    for (var i = 0; i < node.children.length; i++) {
        traverse(indent, node.getChild(i));
    }
}

const tree = new Node('root');
const left = new Node('left');
const right = new Node('right');
const leftLeft = new Node('leftLeft');
const leftRight = new Node('leftRight');
const rightLeft = new Node('rightLeft');
const rightRight = new Node('rightRight');

tree.add(left);
tree.add(right);
tree.remove(right);
tree.add(right);

left.add(leftLeft);
left.add(leftRight);

right.add(rightLeft);
right.add(rightRight);

traverse(1, tree);
