// Singleton is a manifestation of a common JavaScript pattern: the Module pattern

// Sample 1
// Lazy Load
const Singleton = (function () {
    let instance;

    function constructor() {
        return {
            method() {}
        };
    }

    return {
        getInstance: function () {
            if (!instance) instance = constructor();
            return instance;
        }
    };
})();

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2);

// Sample 2
const INSTANCE = Symbol('instance');
function Singleton2() {
    if (Singleton2[INSTANCE]) return Singleton2[INSTANCE];
    return (Singleton2[INSTANCE] = {
        method() {}
    });
}

const s11 = Singleton2();
const s22 = Singleton2();
console.log(s11 === s22);
