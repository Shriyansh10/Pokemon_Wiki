function removeBackslashCommands(text) {
    return text.replace(/\\./g, '');
    // return text;
}

module.exports = {removeBackslashCommands};