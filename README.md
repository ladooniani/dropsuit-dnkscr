[<img alt="TAI Lab." width="59px" src="https://github.com/ladooniani/Terbinari-CBM-Robot/blob/main/images/dropsuit.png" />](https://github.com/ladooniani/dropsuit#readme)

[![npm version](https://img.shields.io/npm/v/dropsuit-dnkscr.svg?style=flat)](https://www.npmjs.com/package/dropsuit-dnkscr) [![npm](https://img.shields.io/npm/dt/dropsuit-dnkscr.svg?style=flat-square)](https://www.npmjs.com/package/dropsuit-dnkscr) [![License](https://img.shields.io/npm/l/dropsuit-dnkscr.svg)](https://www.npmjs.com/package/dropsuit-dnkscr)

# Overview of [DropSuit](https://github.com/ladooniani/dropsuit#readme) NLP and the dnkscr Function

[DropSuit](https://github.com/ladooniani/dropsuit#readme) NLP is an open-source JavaScript and Node.js library offering diverse functions for natural language processing and data manipulation. The dnkscr function is one of its modules, designed for extracting derivative nouns from a given input string or json object and returns the count of scores for each root key. It is available under the Apache License 2.0.

## DropSuit NLP Method: dnkscr - A JavaScript and Node.js function for extracting derivative nouns

The dnkscr function is a part of the DropSuit NLP library, it's a JavaScript and Node.js function that extracts derivative nouns from a given input string or json object and returns the count of scores for each root key. It's open-source and available under the Apache License 2.0.

### Installation

Add the library function by installing it via npm:

```
npm install dropsuit-dnkscr
```

### Usage

Import the library in your project:

```
const dropsuit_dnkscr = require("dropsuit-dnkscr");

```

Process [intents.json](https://github.com/ladooniani/dropsuit-dnkscr/blob/main/test/intents.json) using 'jsonIntStrct' function:

```
const json_int = require("dropsuit-dnkscr/jsobj.js");
let intentData = json_int.jsonIntStrct("assets/json/intents.json");
```

Process [rootkeyval.json](https://github.com/ladooniani/dropsuit-dnkscr/blob/main/test/rootkeyval.json) using 'jsonRootKeyStrct' function:

```
const json_rk = require("dropsuit-dnkscr/jsobjrk.js");
let rootkeysData = json_rk.jsonRootKeyStrct("assets/json/root_keys.json");
```

Set 'stopWordsAmount', a number 0-2, where 0 is minimum, 1 adds extra, and 2 is maximum from 3 lists.

Set boolean parameter (true/false) argument value to display console log processing results output information in terminal:

```
let dsdnkscr = new dropsuit_dnkscr(null, intentData.req_arr, intentData.res_arr, rootkeysData, stopWordsAmount, false);
```

#### dnkscr(input, depth, proctype)

- **input**: A string input to process, or keep NULL to process the constructor 'input'. Processes the default object instance json key value (req_arr: requests), (res_arr: responses) array patterns.
- **depth**: Derivative noun search level depth parameter arguments (1-3).
- **proctype**: Specifies the type of processing to be done, either 0 or 1. A value of 0 means that repeated keys will not be counted, while a value of 1 allows repeated keys to be counted.

#### Output object:

- **score()** Returns a count of the direct or derivative noun root keys inference score.

#### Derivative Noun Key Score

The algorithm is a multi-dimensional sentiment analysis method that evaluates the meaning of words or sentences by determining the score of derivative nouns within the data structure. The process involves extracting nouns from the input phrase, searching for sentences that include those nouns, and repeating this process to expand the search according to the specified depth level.

The algorithm uses a dichotomous model based on the Porphyrian tree to assign semantic weights to the nouns and interpret their meaning, with the values derived from the downward curve principle and considering both oppositions preponderance and equality contradiction in the output. The default depth level is set to 1, but the function is limited to a maximum of 3 due to the computational complexity of processing large amounts of data `(word/sentence -> nouns -> sentences -> nouns -> sentences -> nouns -> sentences).`

#### Flowchart:

```
┌──────────────────────┐
│ Input Sentence Words
└──┬───────────────────┘
┌──┴────────────┐
│ Extract Nouns
└──┬────────────┘
┌──┴───────────────────┐
│ Derivative Sentences
└──┬───────────────────┘
┌──┴─────────────────────┐
│ Derivative Sent. Nouns
└──┬─────────────────────┘
┌──┴────────────────┐
│ Compare with Keys
└──┬────────────────┘
┌──┴────────────────────────┐
│ If equal incr. Root Value
└──┬────────────────────────┘
┌──┴────────────────────────┐
│ Count & Weigh Oppositions
└──┬────────────────────────┘
┌──┴───────────────────────┐
│ Score highest Peak Value
└──┬───────────────────────┘
┌──┴─────────────┐
│ Downward Curve
└────────────────┘
```

#### Synchronous and Asynchronous Usage of dnkscr and dnkscr_async Functions

The 'dnkscr' and 'dnkscr_async' functions provide the capability to process requests in both synchronous and asynchronous modes. For more detailed information on how to use the functions in either mode, please refer to the [usage example](https://github.com/ladooniani/dropsuit-dnkscr/blob/main/test/index.test.js)

```
let out = dsdnkscr.dnkscr(myInputString, 3, 2);
console.log(out);
```

Return object instance:

```
Input:

 [ 'computer' ]

nDerivative sentences nouns:

 [
  'language new programmers computer eating habits balanced avoid junk food take breaks fruits nuts seeds carrots celery delivery shipping receive definition explain mean tech mimics perception reasoning learning technology acts simulates act humans robots automated specific used variety including manufacturing exploration scientific research child young age majority behaves thinks algorithms anyone available chat items simple terms bye farewell hope see wide range books state art sensor tablets best beginner easiest programming beginners starting write programs python java javascript good choices people recommend often considered'
]

Derivative Nouns (Depth Level:  1 ) length: ( 58 ): [
  'recommended', 'healthy',      'snacks',        'users',
  'focus',       'diet',         'working',       'long',
  'hours',       'components',   'computers',     'work',
  'artificial',  'intelligence', 'develops',      'systems',
  'perform',     'tasks',        'requiring',     'human',
  'speech',      'recognition',  'decision',      'making',
  'ai',          'science',      'focused',       'creating',
  'machines',    'intelligent',  'behavior',      'robot',
  'machine',     'designed',     'carry',         'complex',
  'series',      'actions',      'automatically', 'especially',
  'programmed',  'electronic',   'device',        'processes',
  'data',        'cpu',          'ram',           'storage',
  'motherboard', 'power',        'supply',        'processing',
  'using',       'central',      'unit',          'storing',
  'processed',   'memory'
]

Score count: [
  1, 0, 0, 0, 0,
  0, 1, 2, 1, 2,
  4, 0
]

POS/NEG

Positive: ( 1 ) Negative: ( 0 )

MAT/PAT

Maternal: ( 0 ) Paternal: ( 0 )

PORPHYRIAN TREE

Material: ( 0 ) Immaterial: ( 0 )
Animate: ( 1 ) Inanimate: ( 2 )
Sensitive: ( 1 ) Insensitive: ( 2 )
Rational: ( 4 ) Irrational: ( 0 )

Output:

- Score Downward Curve and Oppositions Equality Contradiction -

 {
  level_depth: 1,
  score_ptDcoec: [
    '4 -> rational',
    '2 -> inanimate',
    '2 -> insensitive',
    '1 -> positive'
  ],
  score: [Function: score]
}

```

## Links

- npm: https://www.npmjs.com/package/dropsuit-dnkscr

## Supporting DropSuit

DropSuit is an open-source library and I am dedicated to ensuring its continued development and improvement. If you have any questions, feedback, or encounter any issues, please reach out through the [support via PayPal](https://www.paypal.com/paypalme/dropsuit?country.x=GE&locale.x=en_US), and read more about [support details](https://github.com/ladooniani/DropSuit/blob/main/Support.md).

Your support is crucial for the library's success. You can also contribute to the project by submitting bug reports, feature requests, or by providing feedback. Sharing the library with others who may find it useful and giving it a star on GitHub are also great ways to show your support. Thank you for using DropSuit!

## License

[Apache License 2.0](LICENSE.txt)
