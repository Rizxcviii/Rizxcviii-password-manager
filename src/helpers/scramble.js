const scrambleWords = (words, homoglyphs, limit = 0) => {
  const scrambledWords = []
  for (const word of words) {
    scrambledWords.push(
      scrambleWordRec(word.toLowerCase(), homoglyphs, [], limit)
    )
  }
  return scrambledWords
}

const scrambleWordRec = (
  word = "",
  homoglyphs,
  generatedWords = [],
  limit = 0
) => {
  if (limit && generatedWords.length >= limit) {
    console.log(true)
    return generatedWords
  }
  for (const letter of word) {
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
