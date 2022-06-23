module.exports.urlSafe = (str) => {
    return str.replace(/\s/gi, '').toLocaleLowerCase();
};

module.exports.randomString = (type = 'CASE', length = 5) => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let finalString = '';

    for (let i = 0; i < length; i++) {
        const rand = Math.round(Math.random() * (35 - 0)) + 0

        finalString += str[rand];
    }

    return `${type}-${finalString}`;
}