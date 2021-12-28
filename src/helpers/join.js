/**
 * Joins a row of words in a 2D array, with a seperator between each.
 * @param {string[][]} wordsArr 2D array of strings
 * @param {char} separator char to use as separator
 * @returns Array of new strings, joined by separator
 * @example
 * joinWords([["hello", "Hello"], ["world", "World"]], " ");
 * // ["hello,world", "hello,World", "Hello,world", "Hello,World"]
 */
const joinWords = (wordsArr, separator = ".") => {
  const joinedWords = []
  let row = 0
  let col = 0
  let newStr = ""
  while (row < wordsArr.length) {
    while (col < wordsArr[row].length) {
      newStr += wordsArr[row][col] + separator
      col++
    }
    joinedWords.push(newStr)
    newStr = ""
    row++
    col = 0
  }
  return joinedWords
}

export default joinWords
