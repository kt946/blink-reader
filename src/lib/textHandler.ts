/**
 * TextHandler class to store and process the text input.
 * @class
 */
class TextHandler {
  originalText: string;
  splitText: string[];
  wordGroups: string[];

  constructor(textString: string, chunkSize: number = 1) {
    this.originalText = textString;
    this.splitText = this.originalText.split(' ');
    this.wordGroups = this.groupWordsByChunk(this.splitText, chunkSize);
  }

  /**
   * Splits the text into chunks of words based on the chunk size.
   *
   * @param textArray
   * @param chunkSize
   * @returns
   */
  private groupWordsByChunk(textArray: string[], chunkSize: number): string[] {
    const wordGroups = [];

    // For loop to iterate over the array of words and group them into chunks separated by spaces.
    // If the chunk size is 1, then the array of words is returned as is.
    // If there are not enough words to fill a chunk, then the remaining words are grouped together.
    for (let i = 0; i < textArray.length; i += chunkSize) {
      const chunk = textArray.slice(i, i + chunkSize).join(' ');
      wordGroups.push(chunk);
    }

    return wordGroups;
  }
}

export default TextHandler;
