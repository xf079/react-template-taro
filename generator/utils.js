function updateKey(key, len) {
  const whitespaceLen = len - key.length
  return new Array(whitespaceLen).fill(' ').join('') + key
}

module.exports = {
  updateKey,
}
