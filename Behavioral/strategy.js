// The Strategy pattern encapsulates alternative algorithms (or strategies) for a particular task.
// It allows a method to be swapped out at runtime by any other method (strategy) without the client realizing it.
// Strategy is a group of algorithms that are interchangeable

// Say we like to test the performance of different sorting algorithms to an array of numbers: shell sort, heap sort, bubble sort, quicksort, etc
// Applying the Strategy pattern to these algorithms allows the test program to loop through all
// algorithms, simply by changing them at runtime and test each of these against the array.

// Sample 1
function Shipping() {
    this.company = '';
}
Shipping.prototype.setCompany = function (company) {
    this.company = company;
};
Shipping.prototype.calculate = function () {
    return this.company.calculate();
};

// Company/Strategy
function Ups() {
    this.calculate = function (package) {
        return '45';
    };
}

// Company/Strategy
function Fedex() {
    this.calculate = function (package) {
        return '100';
    };
}

let package = { from: '7612', to: '10012', weight: '1kg' };
let ups = new Ups();
let fedex = new Fedex();

let shipping = new Shipping();
shipping.setCompany(ups);
console.log(`UPS Strategy: ${shipping.calculate(package)}`);
console.log(`Fedex Strategy: ${shipping.calculate(package)}`);
