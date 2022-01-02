const scrambleWords = (words, homoglyphs, limit = 0) => {
  const scrambledWords = []
  for (const word of words) {
    let scrambledWordArr = scrambleWordRec(word, homoglyphs, [], limit)
    while (scrambledWordArr.length === 0) {
      scrambledWordArr = scrambleWordRec(word, homoglyphs, [], limit)
    }
    scrambledWords.push(scrambledWordArr)
  }
  return scrambledWords
}

const scrambleWordRec = (
  word = "",
  homoglyphs,
  generatedWords = [],
  limit = 0
) => {
  if (limit && generatedWords.length >= limit) return generatedWords

  const randLetters = []
  const randIterable = Math.floor(Math.random() * word.length) + 1
  for (let i = 0; i < randIterable; i++) {
    const randIndex = Math.floor(Math.random() * word.length)
    randLetters.push(word[randIndex])
  }

  for (const letter of randLetters) {
    const homoglyphsForLetter = homoglyphs[letter]
    if (homoglyphsForLetter) {
      for (const homoglyph of homoglyphsForLetter) {
        const newWord = word.replace(letter, homoglyph)
        if (generatedWords.includes(newWord)) continue
        generatedWords.push(newWord)
        scrambleWordRec(newWord, homoglyphs, generatedWords, limit)
      }
    }
  }
  return generatedWords
}

export default scrambleWords
