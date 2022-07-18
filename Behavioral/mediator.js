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
