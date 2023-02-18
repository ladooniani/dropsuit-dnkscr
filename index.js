//#region Info

/**
 * @file <h3>DropSuit</h3>
 * <p>
 *   DropSuit is a JavaScript(ES6) and Node.js(v14.x) module library
 *   created by Lado Oniani that offers a diverse collection of functions
 *   for natural language processing (NLP) and data manipulation.
 *   It provides a curated collection of original and classic techniques and methods
 *   for tasks such as text analysis, language understanding and generation,
 *   as well as for data manipulation tasks. Additionally,
 *   it includes unique tools and features for chatbot dialog flow logic
 *   and other specific use cases.
 *   The library is open-source and available under the Apache License 2.0.
 *   Whether you're a researcher, developer, or data scientist,
 *   DropSuit offers a range of tools to enhance your work,
 *   with a focus on diversity and experimentation.
 * </p>
 * @author Lado Oniani
 * {@link https://github.com/ladooniani GitHub}
 * @see mailto:ladooniani@gmail.com
 * @version 1.0.0
 * @see https://github.com/ladooniani/DropSuit#readme
 * @copyright 2016-2023 Lado Oniani - DropSuit. All Rights Reserved.
 * @license Apache License 2.0
 */

//#endregion

//#region  Constructor

function Constructor(
  input,
  requests,
  responses,
  rootkeys,
  stopwords_amount,
  dsout
) {
  this.input = input;
  this.requests = requests;
  this.responses = responses;
  this.rootkeys = rootkeys;
  this.stopwords_amount = stopwords_amount;
  this.dsout = dsout;
}

//#endregion

//#region dnkscr (sync)

/**
 * @Constructs dnkscr
 * @description - dnkscr(null, 0-3, 0-2, true/false) function -
 * Direct or derivative noun root keys inference score count.
 * Processes default object instance json key value\n(req_arr: requests), (res_arr: responses) array patterns.
 * @param {string} input - Input 'myInputString' sentence, or keep NULL to process constructor 'input'.
 * @param {number} depth - Derivative noun search level depth parameter arguments (1-3).
 * @param {number} proctype - Specifies the type of processing to be done, either 0 or 1.
 * A value of 0 means that repeated keys will not be counted, while a value of 1 allows repeated keys to be counted.
 * @returns {object} - score() Score downward curve and oppositions equality contradiction.
 */

Constructor.prototype.dnkscr = function (input, depth, proctype) {
  input = objOrFncInp(input, this.input);
  let out = dnkscr_f(
    input,
    depth,
    proctype,
    this.stopwords_amount,
    this.requests,
    this.responses,
    this.rootkeys,
    this.dsout
  );
  return out;
};

//#endregion

//#region dnkscr_async

/**
 * @Constructs dnkscr_async
 * @description - dnkscr(null, 0-3, 0-2) function -
 * Direct or derivative noun root keys inference score count.
 * Processes default object instance json key value\n(req_arr: requests), (res_arr: responses) array patterns.
 * @param {string} input - Input 'myInputString' sentence, or keep NULL to process constructor 'input'.
 * @param {number} depth - Derivative noun search level depth parameter arguments (1-3).
 * @param {number} proctype - Specifies the type of processing to be done, either 0 or 1.
 * A value of 0 means that repeated keys will not be counted, while a value of 1 allows repeated keys to be counted.
 * @returns {object} - score() Score downward curve and oppositions equality contradiction.
 */

Constructor.prototype.dnkscr_async = async function (input, depth, proctype) {
  input = objOrFncInp(input, this.input);
  let out = dnkscr_async_f(
    input,
    depth,
    proctype,
    this.stopwords_amount,
    this.requests,
    this.responses,
    this.rootkeys,
    this.dsout
  );
  return out;
};

//#endregion

//#region dnkscr_f

const dropsuit_clnarr = require("../dropsuit-clnarr/index.js");
var ds_clnarr = new dropsuit_clnarr(false);

const dropsuit_clnstr = require("../dropsuit-clnstr/index.js");
var ds_clnstr = new dropsuit_clnstr(null, false);

const dropsuit_dersnt = require("../dropsuit-dersnt/index.js");

/**
 * Direct or derivative noun root keys inference score count.
 * @param {string} userInput - Input sentence.
 * @param {number} depth - Derivative noun search level depth parameter arguments (1-3).
 * @param {number} proctype - Specifies the type of processing to be done, either 0 or 1.
 * A value of 0 means that repeated keys will not be counted, while a value of 1 allows repeated keys to be counted.
 * @param {number} swa - An integer in the range of 0-2, which determines the amount of stop words to be processed.
 * 0 processes the minimum amount, 1 adds extra stop words,
 * and 2 includes the maximum number of stop words from three distinct lists.
 * @param {array} req - Requests.
 * @param {array} res - Responces.
 * @param {json} rootkeys -  Rootkeys.
 * @param {boolean} dispout - (true/false) Display processing output results in terminal.
 * @returns {object} - score() Score downward curve and oppositions equality contradiction.
 * @example dnkscr_f(string, array, array, integer, bool)
 */

//#region Sync

function dnkscr_f(
  userInput,
  depth,
  proctype,
  swa,
  req,
  res,
  rootkeys,
  dispout
) {
  let input;
  let ds_dersnt = new dropsuit_dersnt(null, req, res, false);
  let arrNounStr = [];
  let valueArr = buildZeroArray(rootkeys.count);
  proctype = checkType(proctype, 1);
  swa = checkType(swa, 2);
  depth = chaeckDepth(depth);
  userInput = ds_clnstr.clnstr(userInput).txt();
  for (u = 0; u < depth; u++) {
    var dn0;
    dn0 = ds_dersnt.dersnt(userInput, swa).dsnSt();
    let splArr = dn0.split(" ");
    for (a = 0; a < splArr.length; a++) {
      let n = ds_clnstr.clnstr(splArr[a]).txt();
      if (proctype == 0) {
        if (!arrNounStr.includes(n)) {
          arrNounStr.push(n);
        }
      } else if (proctype == 1) {
        arrNounStr.push(n);
      }
    }
    input = ds_dersnt.dersnt(arrNounStr, swa).dsnSt();
  }
  let combarr = typeArray(arrNounStr, proctype);
  let arrOfArrayVariables = entblatura(rootkeys);
  let valArr = rootValScore(combarr, arrOfArrayVariables, valueArr);
  let winners = podium(userInput, input, valArr, combarr, depth, dispout);
  return winners;
}

//#endregion

//#region Async

async function dnkscr_async_f(
  userInput,
  depth,
  proctype,
  swa,
  req,
  res,
  rootkeys,
  dispout
) {
  let input;
  let ds_dersnt = new dropsuit_dersnt(null, req, res);
  let arrNounStr = [];
  let valueArr = buildZeroArray(12);
  proctype = checkType(proctype, 1);
  swa = checkType(swa, 2);
  depth = chaeckDepth(depth);
  userInput = ds_clnstr.clnstr(userInput).txt();
  const promises = Array.from({ length: depth }, (_, u) => {
    return new Promise(async (resolve) => {
      let splArr = ds_dersnt.dersnt(userInput, swa).dsnSt().split(" ");
      if (u == 0) {
        for (a = 0; a < splArr.length; a++) {
          let n = ds_clnstr.clnstr(splArr[a]).txt();
          if (proctype == 0) {
            if (!arrNounStr.includes(n)) {
              arrNounStr.push(n);
            }
          } else if (proctype == 1) {
            arrNounStr.push(n);
          }
        }
      }
      input = ds_dersnt.dersnt(arrNounStr, swa).dsnSt();
      resolve();
    });
  });
  await Promise.all(promises);
  let combarr = typeArray(arrNounStr, proctype);
  let arrOfArrayVariables = entblatura(rootkeys);

  const promises2 = combarr.map((comb, u) => {
    return new Promise((resolve) => {
      for (i = 0; i < arrOfArrayVariables.length; i++) {
        if (arrOfArrayVariables[i].includes(comb)) {
          valueArr[i] = valueArr[i] + 1;
        }
      }
      resolve();
    });
  });
  await Promise.all(promises2);

  let valArr = rootValScore(combarr, arrOfArrayVariables, valueArr);
  let winners = podium(userInput, input, valArr, combarr, depth, dispout);
  return winners;
}

//#endregion

function typeArray(arrNounStr, proctype) {
  let combarr = [];
  if (proctype == 0) {
    combarr = ds_clnarr.clnarr(arrNounStr, 2);
  } else if (proctype == 1) {
    combarr = ds_clnarr.clnarr(arrNounStr, 0);
  }
  return combarr;
}

function entblatura(rootkeys) {
  let positiveLst = rootkeys.positive;
  let negativeLst = rootkeys.negative;
  let maternalLst = rootkeys.maternal;
  let paternalLst = rootkeys.paternal;
  let materialLst = rootkeys.material;
  let immaterialLst = rootkeys.immaterial;
  let animateLst = rootkeys.animate;
  let inanimateLst = rootkeys.inanimate;
  let sensitiveLst = rootkeys.sensitive;
  let insensitiveLst = rootkeys.insensitive;
  let rationalLst = rootkeys.rational;
  let irrationalLst = rootkeys.irrational;

  let arrOfArrayVariables = [
    positiveLst,
    negativeLst,
    maternalLst,
    paternalLst,
    materialLst,
    immaterialLst,
    animateLst,
    inanimateLst,
    sensitiveLst,
    insensitiveLst,
    rationalLst,
    irrationalLst,
  ];
  return arrOfArrayVariables;
}

function podium(userInput, input, valueArr, combarr, depth, dispout) {
  let pos = valueArr[0]; /// Positive score count value
  let neg = valueArr[1]; /// Negative
  let mat = valueArr[2]; /// Maternal
  let pat = valueArr[3]; /// Paternal
  let mate = valueArr[4]; /// Material
  let imat = valueArr[5]; /// Immaterial
  let anim = valueArr[6]; /// Animate
  let inan = valueArr[7]; /// Inanimate
  let sens = valueArr[8]; /// Sensitive
  let inse = valueArr[9]; /// Insensitive
  let rat = valueArr[10]; /// Rational
  let irr = valueArr[11]; /// Irrational

  let winners = calculateWiners(
    pos,
    neg,
    mat,
    pat,
    mate,
    imat,
    anim,
    inan,
    sens,
    inse,
    rat,
    irr
  );

  winners = return_dnkiOut(winners, depth);
  display(
    userInput,
    dispout,
    depth,
    winners,
    input,
    combarr,
    valueArr,
    pos,
    neg,
    mat,
    pat,
    mate,
    imat,
    anim,
    inan,
    sens,
    inse,
    rat,
    irr
  );
  return winners;
}

function rootValScore(combarr, arrOfArrayVariables, valueArr) {
  for (u = 0; u < combarr.length; u++) {
    for (i = 0; i < arrOfArrayVariables.length; i++) {
      if (arrOfArrayVariables[i].includes(combarr[u])) {
        valueArr[i] = valueArr[i] + 1;
      }
    }
  }
  return valueArr;
}

function return_dnkiOut(winners, depth) {
  const dnkiObj = {
    level_depth: depth,
    score_ptDcoec: winners,
    score: function () {
      return this.score_ptDcoec;
    },
  };
  return dnkiObj;
}

function buildZeroArray(nmb) {
  var valArr = [];
  for (n = 0; n < nmb; n++) {
    valArr.push(0); /// 0 array of words number
  }
  return valArr;
}

function chaeckDepth(depth) {
  if (depth <= 3 && depth > 0) {
    return depth;
  } else {
    return (depth = 1);
  }
}

function checkType(type, range) {
  if (range == 1) {
    if (type == 0 || type == 1) {
      return type;
    } else {
      return (type = 0);
    }
  }
  if (range == 2) {
    if (type == 0 || type == 1 || type == 2) {
      return type;
    } else {
      return (type = 0);
    }
  }
}

function calculateWiners(
  pos,
  neg,
  mat,
  pat,
  mate,
  imat,
  anim,
  inan,
  sens,
  inse,
  rat,
  irr
) {
  var pn, fm, mi, ai, si, ri;

  if (pos == 0 && neg == 0) {
    pn = undefined;
  } else {
    if (pos == neg) {
      pn = pos + " positive = " + neg + " negative";
    } else if (pos > neg) {
      pn = pos + " -> positive";
    } else if (pos < neg) {
      pn = neg + " -> negative";
    }
  }

  if (mat == 0 && pat == 0) {
    fm = undefined;
  } else {
    if (mat == pat) {
      fm = mat + " maternal = " + pat + " paternal";
    } else if (mat > pat) {
      fm = mat + " -> maternal";
    } else if (mat < pat) {
      fm = pat + " -> paternal";
    }
  }

  if (mate == 0 && imat == 0) {
    mi = undefined;
  } else {
    if (mate == imat) {
      mi = mate + " material = " + imat + " immaterial";
    } else if (mate > imat) {
      mi = mate + " -> material";
    } else if (mate < imat) {
      mi = imat + " -> immaterial";
    }
  }

  if (anim == 0 && inan == 0) {
    ai = undefined;
  } else {
    if (anim == inan) {
      ai = anim + " animate = " + inan + " inanimate";
    } else if (anim > inan) {
      ai = anim + " -> animate";
    } else if (anim < inan) {
      ai = inan + " -> inanimate";
    }
  }

  if (sens == 0 && inse == 0) {
    si = undefined;
  } else {
    if (sens == inse) {
      si = sens + " sensitive = " + inse + " insensitive";
    } else if (sens > inse) {
      si = sens + " -> sensitive";
    } else if (sens < inse) {
      si = inse + " -> insensitive";
    }
  }

  if (rat == 0 && irr == 0) {
    ri == undefined;
  } else {
    if (rat == irr) {
      ri = rat + " rational = " + irr + " irrational";
    } else if (rat > irr) {
      ri = rat + " -> rational";
    } else if (rat < irr) {
      ri = irr + " -> irrational";
    }
  }

  let arr = [pn, fm, mi, ai, si, ri];

  const results = arr.filter((element) => {
    return element !== undefined;
  });
  let sortedArr = results.sort((a, b) => {
    let [numA] = a.split(" ");
    let [numB] = b.split(" ");
    return +numB - +numA;
  });
  return sortedArr; /// .reverse();
}

function objOrFncInp(function_input, constructor_input) {
  if (function_input !== "" && function_input !== null) {
    function_input = function_input;
  } else {
    function_input = constructor_input;
  }
  return function_input;
}

//#endregion

//#region console log

const getdt = require("./infodt.js");
let fnctit = getdt.displayInfoData();
const line = fnctit.line;
var description = fnctit.descript;

function display(
  userInput,
  dispout,
  depth,
  winners,
  input,
  combarr,
  valueArr,
  pos,
  neg,
  mat,
  pat,
  mate,
  imat,
  anim,
  inan,
  sens,
  inse,
  rat,
  irr
) {
  if (dispout == true) {
    console.log(
      description,
      "\nInput:\n\n",
      [userInput],
      "\n\nDerivative sentences nouns:\n\n",
      [input],
      "\n\nDerivative Nouns (Depth Level: ",
      depth,
      ") length: (",
      combarr.length,
      "):",
      combarr,
      "\n\nScore count:",
      valueArr,
      "\n\nPOS/NEG\n\nPositive: (",
      pos,
      ") Negative: (",
      neg,
      ")",
      "\n\nMAT/PAT\n\nMaternal: (",
      mat,
      ") Paternal: (",
      pat,
      ")\n\nPORPHYRIAN TREE\n\nMaterial: (",
      mate,
      ") Immaterial: (",
      imat,
      ")\nAnimate: (",
      anim,
      ") Inanimate: (",
      inan,
      ")\nSensitive: (",
      sens,
      ") Insensitive: (",
      inse,
      ")\nRational: (",
      rat,
      ") Irrational: (",
      irr,
      ")",
      "\n\nOutput:\n\n- Score Downward Curve and Oppositions Equality Contradiction -\n\n",
      winners,
      "\n",
      line
    );
  }
}

//#endregion

//#region Export Module Constructor

module.exports = Constructor;

//#endregion
