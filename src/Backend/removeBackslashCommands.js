function removeBackslashCommands(text) {
    return text.replace(/\\./g, '');
}

module.exports = {removeBackslashCommands};