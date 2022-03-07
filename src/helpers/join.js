/**
 * - Joins words together with a separator within a 2D array. Where:
 *   - row: each inner array, such that row = wordsArr[row]
 *   - column: each element in the inner array, where column = [wordsArr[row][x], wordsArr[row+1][x], ...], where x is constant
 *   - new strings do not contain words in the same row
 * - The aim of this function is to create a random number of permutations of the words, where the number of permutations is limited by LIMIT
 * @param {string[][]} wordsArr 2D array of strings, where each inner array is a row of words
 * @param {char} separator char to use as separator
 * @param {number} limit max number of comibnations to return
 * @param {string[]} generatedStrings array of strings
 * @returns {string[]} array of strings, containing the joined elements of the 2D array
 * @example
 * joinWords([["hello", "Hello"], ["world", "World"]], ",") => ["hello,world", "hello,World", "Hello,world", "Hello,World"]
 * @example
 * joinWords([["hello", "Hello"], ["world", "World"], ["john", "John", JOhn]], ",") => [
 *  "hello,world,john",
 *  "hello,world,John",
 *  "hello,world,JOhn",
 *  "hello,World,john",
 *  "hello,World,John",
 *  "hello,World,JOhn",
 *  "Hello,world,john",
 *  "Hello,world,John",
 *  "Hello,world,JOhn",
 *  "Hello,World,john",
 *  "Hello,World,John",
 *  "Hello,World,JOhn"
 * ]
 */
const joinWords = (wordsArr, limit = 0, options = {}) => {
  if (wordsArr.length === 0) return []

  const generatedStrings = []

  // calculates the number of possible permutations
  // however, the number of permutations is capped at the limit
  let permutations = 1
  for (let i = 0; i < wordsArr.length; i++) {
    permutations *= wordsArr[i].length
  }
  if (limit && permutations > limit) {
    permutations = limit
  }

  let i = 0

  // while there are still words to be appended
  while (i < permutations) {
    let str = ""
    let j = 0

    // generate a single string
    while (j < wordsArr.length) {
      // generates a random string in the scrambled word array
      const randIndex = Math.floor(Math.random() * wordsArr[j].length)
      str += wordsArr[j][randIndex] + options.separator
      j++
    }
    // remove the last separator
    const regex = new RegExp(`${options.separator}$`)
    generatedStrings.push(str.replace(regex, ""))

    i++
  }
  return generatedStrings
}

export default joinWords
