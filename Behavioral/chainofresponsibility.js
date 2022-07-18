// is a pattern that allows some request to be sent, received, and handled by multiple objects
// The first object in the chain receives the request and either handles it or forwards it to the next candidate on the chain, which does likewise.
// They can also either abort the whole chain or decide to let the request continue on to the next object
// The Chain of Responsiblity patterns is related to the Chaining Pattern which is frequently used in JavaScript
// Here are some scenarios where the COR pattern fits nicely with:
//      Coffee Maker
//      ATM Machine
//      Transformers: Utilize a chain of transformer/parsers in some custom AST

// Sample 1
const handleColors = (obj, key, value, next) => {
    if (typeof value === 'string' && value.startsWith('0x'))
        obj[key] = value.replace('0x', '#');

    next();
};

const handleSizes = (obj, key, value, next) => {
    if (/(width|height|fontSize)/.test(key)) {
        const isDec = Number(value) % 1 !== 0;
        obj[key] = String(value).endsWith('px')
            ? value
            : `${String(isDec ? value * 100 : value)}px`;
    }
    next();
};

class TNode {
    next = null;

    constructor(callback) {
        this.callback = callback;
    }

    execute(...args) {
        return this.callback(...args, () => {
            this.next && this.next.execute(...args);
        });
    }
}

function createTransform(...transformers) {
    transformers = transformers.slice().reverse();

    function withNode(transformer) {
        return new TNode(transformer);
    }

    let executor = withNode(transformers.pop());
    let curr = executor;

    while (transformers.length) {
        curr.next = withNode(transformers.pop());
        curr = curr.next;
    }

    function transform(obj) {
        for (const [key, value] of Object.entries(obj)) {
            executor.execute(obj, key, value);
        }

        return obj;
    }

    return transform;
}

const rowData = {
    backgroundColor: '0xFF0000',
    fontSize: '12',
    width: '0.9',
    height: '0.5',
    color: '0xFFFFFF'
};

const transform = createTransform(handleColors, handleSizes);
const result = transform(rowData);
console.log(result);
// {
//   "backgroundColor": "#020303",
//   "color": "#201313",
//   "fontSize": "14px",
//   "width": "90px",
//   "height": "50px",
// }
