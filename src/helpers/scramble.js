const scrambleWords = (words, homoglyphs, limit = 0, filters) => {
  const scrambledWords = []
  for (const word of words) {
    let newWord = ""
    for (const letter of word) {
      if (filters.remove.includes(letter)) continue
      newWord += letter
    }
    let scrambledWordArr = scrambleWordRec(
      newWord,
      homoglyphs,
      [],
      limit,
      filters
    )
    if (!scrambledWordArr.length) {
      const retryCount = 10
      for (let i = 0; i < retryCount; i++) {
        scrambledWordArr = scrambleWordRec(
          newWord,
          homoglyphs,
          [],
          limit,
          filters
        )
      }
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
