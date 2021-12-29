/**
 * - Joins words together with a separator within a 2D array. Where:
 * - The aim of this function is to create all possible permutations of words, joining only the columns, not the rows
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
const joinWords = (wordsArr, separator = ".", limit = 0) => {
  if (wordsArr.length === 0) return []
  if (wordsArr.length === 1) return wordsArr[0]

  const generatedStrings = []
  // stores whcih word we want to grach each perumtation inside another array
  const tracker = []
  for (let i = 0; i < wordsArr.length; i++) {
    tracker.push(0)
  }

  // calculates the number of possible permutations
  let permutations = 1
  for (let i = 0; i < wordsArr.length; i++) {
    permutations *= wordsArr[i].length
  }

  for (let i = 0; i < permutations; i++) {
    let str = ""
    for (let j = 0; j < wordsArr.length; j++) {
      str += wordsArr[j][tracker[j]] + separator
    }
    generatedStrings.push(str.slice(0, -1))
    console.log(tracker)
    tracker[tracker.length - 1]++
    for (let j = tracker.length - 1; j >= 0; j--) {
      if (!(tracker[j] < wordsArr[j].length)) {
        tracker[j] = 0
        tracker[j - 1]++
      }
    }
  }
  return generatedStrings
}

export default joinWords
