function format(formatFn) {
    return function (str) {
        return formatFn(str);
    };
}

const lower = format((str = '') => str.toLocaleLowerCase());
const question = format((str = '') => `${str}?`);

console.log(question(lower('JORGE')));
