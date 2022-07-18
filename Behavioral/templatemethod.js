// The Template Method pattern provides an outline of a series of steps for an algorithm
// Objects that implement these steps retain the original structure of the algorithm but have the option to redefine or adjust certain steps
// in order to implement the pattern, just call an inexistent method on the parent's prototype
// build method (that method will be the template) and simply implement that method on the sublcasses
// is a pattern which can avoids duplicating code in your project, when an algorithm has both invariant and variant par

// Sample 1
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

// Sample 2
// https://dev.to/carlillo/design-patterns---template-method-180k
class Pokemon {
    constructor(pokemon) {
        this.name = pokemon.name;
        this.power = pokemon.power;
        this.attack = pokemon.attack;
        this.defense = pokemon.defense;
    }

    toString() {
        return `${this.name} - power: ${this.power}, attack: ${this.attack}, defense: ${this.defense}`;
    }

    calculateMultiplier() {
        retrun(1 / 2) * this.power * Math.random();
    }

    showDamage(damage) {
        console.log(`${this.name} took ${damage} damage`);
    }

    calculateDamage() {
        const multipliers = this.calculateMultiplier(); // Step 1
        const damage = this.calculateImpact(multipliers); // Step 2 (Implemented in subclasses)
        this.showDamage(damage); // Step 3
    }
}

class FightingPokemon extends Pokemon {
    constructor(pokemon) {
        super(pokemon);
    }

    calculateImpact(multipliers) {
        return Math.floor((this.attack / this.defense) * multipliers) + 1;
    }
}

class PoisonPokemon extends Pokemon {
    constructor(pokemon) {
        super(pokemon);
    }

    calculateImpact(multipliers) {
        return Math.floor((this.attack - this.defense) * multipliers) + 1;
    }
}

class GroundPokemon extends Pokemon {
    constructor(pokemon) {
        super(pokemon);
    }

    calculateImpact(multipliers) {
        return Math.floor((this.attack + this.defense) * multipliers) + 1;
    }
}

// Sameple 3
function Autocomplete() {
    this.timeout = null;
}

Autocomplete.prototype.clearPreviousRequests = function () {
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
};

Autocomplete.prototype.search = function (searchTerm) {
    var self = this;
    var deferred = new $.Deferred();

    this.clearPreviousRequests();

    this.timeout = setTimeout(function () {
        self.request(searchTerm).then(function (results) {
            deferred.resolve(results);
        });
        self.timeout = null;
    }, 300);

    return deferred.promise();
};

// Subclass Autocomplete
function ItunesAutocomplete() {
    Autocomplete.apply(this, arguments);
}

ItunesAutocomplete.prototype = Object.create(Autocomplete.prototype);
ItunesAutocomplete.prototype.constructor = ItunesAutocomplete;

ItunesAutocomplete.prototype.request = function (searchTerm) {
    var url =
        'https://itunes.apple.com/search?' +
        $.param({
            term: searchTerm
        });

    url += '&callback=?';

    return $.getJSON(url).then(function (response) {
        return response.results;
    });
};

// Subclass Autocomplete
function FacebookAutocomplete() {
    Autocomplete.apply(this, arguments);
}

FacebookAutocomplete.prototype = Object.create(Autocomplete.prototype);
FacebookAutocomplete.prototype.constructor = FacebookAutocomplete;

FacebookAutocomplete.prototype.request = function (searchTerm) {
    var url = 'https://graph.facebook.com/' + searchTerm;
    url += '?callback=?';

    return $.getJSON(url);
};
