module.exports.urlSafe = (str) => {
    return str.replace(/\s/gi, '').toLocaleLowerCase();
};