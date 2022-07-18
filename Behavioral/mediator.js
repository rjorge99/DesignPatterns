// The Mediator pattern provides central authority over a group of objects by encapsulating how these objects interact
// This model is useful for scenarios where there is a need to manage complex conditions in which every object is aware of any state change in any other object in the group.

// Sample 1
function Participant(name) {
    this.name = name;
    this.chatroom = null;
}

Participant.prototype = {
    send: function (message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function (message, from) {
        console.log(`${from.name} to ${this.name}: ${message}`);
    }
};

// Mediator
function ChatRoom() {
    const participants = {};

    return {
        register: function (participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },
        send: function (message, from, to) {
            if (to) {
                to.receive(message, from);
            } else {
                for (const key in participants) {
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
}

var yoko = new Participant('Yoko');
var john = new Participant('John');
var paul = new Participant('Paul');
var ringo = new Participant('Ringo');

var chatroom = new Chatroom();
chatroom.register(yoko);
chatroom.register(john);
chatroom.register(paul);
chatroom.register(ringo);

yoko.send('All you need is love.');
yoko.send('I love you John.');
john.send('Hey, no need to broadcast', yoko);
paul.send('Ha, I heard that!');
ringo.send('Paul, what do you think?', paul);
// Yoko to John: All you need is love.
// Yoko to Paul: All you need is love.
// Yoko to Ringo: All you need is love.
// Yoko to John: I love you John.
// Yoko to Paul: I love you John.
// Yoko to Ringo: I love you John.
// John to Yoko: Hey, no need to broadcast
// Paul to Yoko: Ha, I heard that!
// Paul to John: Ha, I heard that!
// Paul to Ringo: Ha, I heard that!
// Ringo to Paul: Paul, what do you think?

// Sample 2
// Game instances to coordinate the party associations between multiple users
// makes the code a lot easier to read and maintain and it decouples logic between
// Party and Novice instances
function createId() {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

function Novice(name) {
    this.name = name;
    this.hp = 100;
    this.id = createId();
    this.party = null;
}

Novice.prototype.attack = function (target, hp) {
    target -= hp;
    return this;
};

const roy = new Novice('roy');
const ben = new Novice('ben');
const lucy = new Novice('lucy');
const sally = new Novice('sally');

function Party(leader, ...members) {
    this.id = createId();
    this.leader = leader;
    this.members = members;
}

function Game(options) {
    this.parties = {};

    if (options) {
        // do stuff
    }
}

Game.prototype.createParty = function (leader, ...members) {
    const party = new Party(leader, ...members);
    this.parties[party.id] = party;
    leader.party = party;
};

Game.prototype.removeParty = function (leader) {
    delete this.parties[leader.party.id];
    leader.party = null;
};

const game = new Game();
game.createParty(roy, ben, lucy);
