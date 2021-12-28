const scrambleWords = (words, homoglyphs) => {
  const scrambledWords = []
  for (const word of words) {
    scrambledWords.push(scrambleWordRec(word.toLowerCase(), homoglyphs, []))
  }
  return scrambledWords
}

const scrambleWordRec = (word, homoglyphs, generatedWords) => {
  for (const letter of word) {
    const homoglyphsForLetter = homoglyphs[letter]
    if (homoglyphsForLetter) {
      for (const homoglyph of homoglyphsForLetter) {
        const newWord = word.replace(letter, homoglyph)
        if (generatedWords.includes(newWord)) continue
        generatedWords.push(newWord)
        scrambleWordRec(newWord, homoglyphs, generatedWords)
      }
    }
  }
  return generatedWords
}

export default scrambleWords
