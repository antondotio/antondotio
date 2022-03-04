// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB


function getStats(txt) {
    // you need to write your own code here

  // if txt is empty just return nothing
  if (txt.length === 0){
    return {
      nChars: 0,                                                     
      nWords: 0,
      nLines: 0,
      nNonEmptyLines: 0,
      averageWordLength: 0,
      maxLineLength: 0,
      tenLongestWords: [],
      tenMostFrequentWords: []
    };
  }  

  // turn everything into lowercase for easier processing
  txt = txt.toLowerCase();

  // initialize variables
  let numChars = 0;
  let numLines = 1;
  let numNonEmptyLines = 0;
  let numWords = 0;
  let wordFreqMap = new Map();
  let wordLengthMap = new Map();
  let longestLine = 0;
  let sumWordLength = 0;

  // count chars and number of lines
  for (let i = 0; i < txt.length ; i++){
    numChars += 1;
    if(txt[i] == '\n') {
      numLines += 1;
    }
  }

  // get the lines
  lines = txt.split('\n');
  numNonEmptyLines = lines.length; // first assume everything is not empty

  lines.forEach(line => {
    // get longest line
    if(line.length > longestLine){
      longestLine = line.length;
    }
    line = line.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ''); // remove punctuation
    line = line.trim(); // remove trailing spaces
    if(line == ''){
      numNonEmptyLines -= 1; // subtract non empty lines when coming across empty lines.
    }

    let words = line.split(/(\d+)/); // split by number
    words = words.join(' '); // join together with space
    words = words.split(/(\s+)/) // split by space

    words.forEach(word => {
      word = word.trim(); // remove trailing spaces
      if(word != ''){
        numWords += 1; // only count words if it is not empty string
        sumWordLength += word.length; // get sum of length
        wordLengthMap.set(word, word.length); // add word and length to map to keep it unique

        // if map has word increase it's frequency, otherwise add it to the map
        if(wordFreqMap.has(word)){
          wordFreqMap.get(word).freq++; 
        } else {
          wordFreqMap.set(word, { freq: 1 });
        }
      }
    });
  });

  // get avg word length
  let avgWordLength = sumWordLength / numWords;

  // sort the maps
  let wordLengthSort = new Map([...wordLengthMap.entries()].sort((a, b) => b[1] - a[1]));
  let wordFreqSort = new Map([...wordFreqMap.entries()].sort((a, b) => b[1].freq - a[1].freq));

  // turn map into array
  let longestWords = Array.from(wordLengthSort.keys()).slice(0, 10);

  // add frequency to string
  let mostFrequentWords = [];
  for(const [key, value] of wordFreqSort.entries()){
    let input = key + ' (' + value.freq + ')';
    mostFrequentWords.push(input);  
  }
  mostFrequentWords = mostFrequentWords.slice(0, 10);

  return {
    nChars: numChars,                                                     
    nWords: numWords,
    nLines: numLines,
    nNonEmptyLines: numNonEmptyLines,
    averageWordLength: avgWordLength,
    maxLineLength: longestLine,
    tenLongestWords: longestWords,
    tenMostFrequentWords: mostFrequentWords
  }

}
