function GenderHelper(genderRate) {
    if (genderRate === -1) {
      return 'Genderless';
    } else if (genderRate === 0) {
      return '100% Male';
    } else if (genderRate === 8) {
      return '100% Female';
    } else {
      return `Can be Male or a Female`;
    }
}

module.exports = {GenderHelper};