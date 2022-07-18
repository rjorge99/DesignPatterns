// The Template Method pattern provides an outline of a series of steps for an algorithm
// Objects that implement these steps retain the original structure of the algorithm but have the option to redefine or adjust certain steps
// in order to implement the pattern, just call an inexistent method on the parent's prototype
// build method (that method will be the template) and simply implement that method on the sublcasses

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
