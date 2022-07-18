// The Interpreter pattern offers a scripting language that allows end-users to customize their solution
// You could offer a basic scripting language which allows the end-user to manipulate your application through simple instructions.
// The Interpreter pattern helps to convert information from one language into another

// Sample 1
function Context(input) {
    this.input = input;
    this.output = 0;
}

Context.prototype = {
    startsWith: function (str) {
        return this.input.substring(0, str.length) === str;
    }
};

function Expression(name, one, four, five, nine, multiplier) {
    this.name = name;
    this.one = one;
    this.four = four;
    this.five = five;
    this.nine = nine;
    this.multiplier = multiplier;
}

Expression.prototype = {
    interpret: function (context) {
        if (context.input.length === 0) return;

        if (context.startsWith(this.nine)) {
            context.output += 9 * this.multiplier;
            context.input = context.input.substring(2);
        } else if (context.startsWith(this.four)) {
            context.output += 4 * this.multiplier;
            context.input = context.input.substring(2);
        } else if (context.startsWith(this.five)) {
            context.output += 5 * this.multiplier;
            context.input = context.input.substring(1);
        }

        while (context.startsWith(this.one)) {
            context.output += 1 * this.multiplier;
            context.input = context.input.substring(1);
        }
    }
};

const roman = 'MCMXXVIII';
const context = new Context(roman);
const tree = [];

tree.push(new Expression('thousand', 'M', ' ', ' ', ' ', 1000));
tree.push(new Expression('hundred', 'C', 'CD', 'D', 'CM', 100));
tree.push(new Expression('ten', 'X', 'XL', 'L', 'XC', 10));
tree.push(new Expression('one', 'I', 'IV', 'V', 'IX', 1));

for (var i = 0, len = tree.length; i < len; i++) {
    tree[i].interpret(context);
}

console.log(roman + ' = ' + context.output);
// MCMXXVIII = 1928
