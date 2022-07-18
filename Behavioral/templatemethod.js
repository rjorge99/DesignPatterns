// The Template Method pattern provides an outline of a series of steps for an algorithm
// Objects that implement these steps retain the original structure of the algorithm but have the option to redefine or adjust certain steps

var datastore = {
    process: function () {
        this.connect();
        this.select();
        this.disconnect();
        return true;
    }
};

function run() {
    var mySql = Object.create(datastore);

    // implement template steps

    mySql.connect = function () {
        console.log('MySQL: connect step');
    };

    mySql.select = function () {
        console.log('MySQL: select step');
    };

    mySql.disconnect = function () {
        console.log('MySQL: disconnect step');
    };

    mySql.process();
}

// MySQL: connect step
// MySQL: select step
// MySQL: disconnect step
