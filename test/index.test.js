//#region dnkscr test

const dropsuit_dnkscr = require("../index.js");

const json_data = require("../jsobj.js");
const json_rk = require("../jsobjrk.js");

const intents = "./test/intents.json";
const rootKeyValues = "./test/rootkeyval.json";

let intentData = json_data.jsonIntStrct(intents);
let rootkeysData = json_rk.jsonRootKeyStrct(rootKeyValues);

let input1 = "computer";
let input2 = "child";
//#region Inputting arrays

/*

let inputReqArr = [
  [
    "What is a computer?",
    "What are the components of a computer?",
    "How do computers work?",
  ],
  [
    "What is a robot?",
    "What is the definition of a robot?",
    "What are robots used for?",
  ],
];

let inputResArr = [
  [
    "A computer is an electronic device that processes data.",
    "Components of a computer: CPU, RAM, storage, motherboard, power supply.",
    "Computers work by processing data using the central processing unit and storing the processed data in memory.",
  ],
  [
    "A robot is a machine designed to carry out a complex series of actions automatically, especially by being programmed by a computer.",
    "Robots are automated machines designed to perform specific tasks.",
    "Robots are used for a variety of tasks including manufacturing, exploration, and scientific research.",
  ],
];

*/

//#endregion

let dsdnkscr = new dropsuit_dnkscr(
  null,
  intentData.req_arr, // inputReqArr
  intentData.res_arr, // inputResArr
  rootkeysData,
  2,
  true
);

describe("dropsuit-dnkscr", () => {
  describe("dnkscr()", () => {
    it("should return the derivative nouns root keys score with 'dnkscr' function", () => {
      let dnkscr_output = dsdnkscr.dnkscr(input1, 1, 0);
      /// let dnkscr_output = dsdnkscr.dnkscr(null, 1, 0).score();
      // console.log("\n\ndnkscr output:", dnkscr_output);
    });
    it("should return the derivative nouns root keys score with 'dnkscr_sync' function", () => {
      async function callFunctionAsync() {
        try {
          let dnkscr_output = await dsdnkscr.dnkscr_async(input2, 1, 0);
          /// let dnkscr_output = dsdnkscr.dnkscr(null, 1, 0).score();
          /// console.log("\n\ndnkscr output:", dnkscr_output);
        } catch (error) {
          console.error(error);
        }
      }
      callFunctionAsync();
    });
  });
});

//#endregion
