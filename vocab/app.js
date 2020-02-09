// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAz61VmU8GRkY8y8xjbt_D0xcUjDu1lT2o",
  authDomain: "vocabulary-241715.firebaseapp.com",
  databaseURL: "https://vocabulary-241715.firebaseio.com",
  projectId: "vocabulary-241715",
  storageBucket: "vocabulary-241715.appspot.com",
  messagingSenderId: "876293057270",
  appId: "1:876293057270:web:6eb7ed4d8c4599cc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var vocabs = [];
var currentWord = undefined;

function renderControls(count) {
  let arr = [1, 3, 7, 16, 32, 64, 128, 256];
  let arrStr = [
    "hard",
    "medium",
    "medium1",
    "medium2",
    "easy",
    "easy1",
    "easy2",
    "easy3"
  ];
  let controlsHTML = '<button class="red" onclick="again()">Again</button>';

  let c = 1;
  for (let n = 0; n < arr.length; n++) {
    if (c > 3) {
      break;
    }
    if (n < count) {
      continue;
    }
    c++;
    controlsHTML += `<button class="blue" onclick="next(${arr[n]})">${arrStr[n]}(${arr[n]})</button>`;
  }
  document.getElementById("controls").innerHTML = controlsHTML;
}

function manualFetch() {
  fetchMore(function(data) {
    if (!data) {
      return;
    }
    for (k in data) {
      vocabs.push(data[k]);
    }
    shuffle(vocabs);
    if (!currentWord) {
      nextWord();
    }
  });
}
manualFetch();
function nextWord() {
  if (vocabs.length <= 0) {
    return;
  }
  let ww = vocabs.shift();
  if (ww) {
    currentWord = ww;
    renderWord(ww);
    renderControls(ww.count ? ww.count : 0);
  }
}
function again() {
  if (currentWord) {
    currentWord.count = 0;
    currentWord.review_date = null;
    writeWord(currentWord);
  }
  nextWord();
}
function next(noDays) {
  if (currentWord) {
    let nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + noDays);
    currentWord.review_date = formatDate(nextReviewDate);
    currentWord.count = currentWord.count ? currentWord.count + 1 : 1;
    console.log(currentWord);
    writeWord(currentWord);
  }
  nextWord();
}

function fetchMore(callback) {
  //

  console.log("fetch more");
  var newWords = firebase
    .database()
    .ref("words")
    .orderByChild("review_date")
    .equalTo(null)
    .limitToFirst(20);

  newWords.on("value", function(data) {
    callback(data.val());
  });
  var today = new Date();
  var reviewWords = firebase
    .database()
    .ref("words")
    .orderByChild("review_date")
    .equalTo(formatDate(today))
    .limitToFirst(100);

  reviewWords.on("value", function(data) {
    callback(data.val());
  });
}
function formatDate(date) {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

function renderWord(w) {
  let wE = document.getElementById("word");
  let transE = document.getElementById("translations");
  let trans = "";
  w.trans.forEach(function(v) {
    trans += tranHTML(w.word, v);
  });
  transE.innerHTML = `<ul>${trans}</ul>`;
  wE.innerHTML = `<h3>${w.word}</h3>`;
}

function tranHTML(w, tran) {
  let ex = "";
  if (tran.examples) {
    tran.examples.forEach(function(v) {
      ex += `<li>${boldString(v, w)}</li>`;
    });
  }
  return `
    <li>${tran.text}
      <ul>
        ${ex}
      </ul>
    </li>
  `;
}

function boldString(str, find) {
  var re = new RegExp(find, "g");
  return str.replace(re, "<b>" + find + "</b>");
}

function writeWord(w) {
  firebase
    .database()
    .ref("words/" + w.word)
    .set(w);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
