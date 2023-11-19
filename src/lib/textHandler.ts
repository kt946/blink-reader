/** 
 * TextHandler class to store and process the text input.
 * @class
*/
class TextHandler {
  textString: string;
  textArray: string[];
  wordGroups: string[];

  constructor(textString: string, chunkSize: number = 1) {
    this.textString = textString;
    this.textArray = textString.split(' ');
    this.wordGroups = this.groupWordsByChunk(this.textArray, chunkSize);
  }

  /**
   * Splits the text into chunks of words based on the chunk size.
   *
   * @param textArray
   * @param chunkSize
   * @returns
   */
  private groupWordsByChunk(textArray: string[], chunkSize: number): string[] {
    const result = [];

    // For loop to iterate over the array of words and group them into chunks separated by spaces.
    // If the chunk size is 1, then the array of words is returned as is.
    // If there are not enough words to fill a chunk, then the remaining words are grouped together.
    for (let i = 0; i < textArray.length; i += chunkSize) {
      const chunk = textArray.slice(i, i + chunkSize).join(' ');
      result.push(chunk);
    }

    // Testing output
    console.log(result);

    return result;
  }
}

export default TextHandler;
