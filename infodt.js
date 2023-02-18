//#region Dysplay info data

function displayInfoData() {
  const liblink =
    "DropSuit: https://github.com/ladooniani/DropSuit#readme\n" +
    "Copyright © 2016-" +
    getYear() +
    " Lado Oniani - DropSuit. All Rights Reserved.\n\n";
  const libName = "DropSuit NLP module library function:\n";
  const line =
    "\n———————————————————————————————————————————————————————————\n\n";
  const divider =
    "\n-----------------------------------------------------------\n";
  const libraryInformation = line + liblink + libName;
  const functionDescription = `${libraryInformation}
  dnkscr(null/string, integer, integer)
  
  Input: 
    string: Input sentence raw string, or keep NULL to process constructor 'input'.
    integer: Derivative noun search level depth parameter arguments (1-3).
    array: 'Rootkeys' json key value lists.

  proctype: Processing type, either 0 or 1. 0 doesn't count repeated keys, 1 allows repeated key counting.

  Processes default object instance json key value (rootkeys),
  including the (req_arr: requests) and (res_arr: responses) array patterns.

  Output object:
    score(): Direct or derivative noun root keys inference score count.

  Flowchart:
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
  └─┬────────────────────────┘
  ┌─┴──────────────┐
  │ Downward Curve
  └────────────────┘
  ${divider}`;

  const displayInfoData = {
    descript: functionDescription,
    line: line,
  };

  return displayInfoData;
}

function getYear() {
  return new Date().getFullYear();
}

//#endregion

//#region Modules

module.exports = {
  displayInfoData,
};

//#endregion
