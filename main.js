import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://we-are-the-champions---dl-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);

console.log(app);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const fromFieldEl = document.getElementById("from-field");
const toFieldEl = document.getElementById("to-field");
const endorsCommentsEl = document.getElementById("comments");
const publishBtnEl = document.getElementById("publish-btn");
const endorsementItemsListEl = document.getElementById("endorsement-items");

publishBtnEl.addEventListener("click", function () {
  const inputValue = endorsCommentsEl.value;
  const fromValue = fromFieldEl.value;
  const toValue = toFieldEl.value;

  const newEndorsement = {
    message: inputValue,
    from: fromValue,
    to: toValue,
  };

  if(newEndorsement.message != "" && newEndorsement.from != "" && newEndorsement.to != "") {
    endorsementItemsListEl.innerHTML += `<li>From: ${newEndorsement.from} <br>
    ${newEndorsement.message} <br>
    ${newEndorsement.to}</li>`;
    push(endorsementsInDB, newEndorsement);
    } else {
        alert("you must fill in all text fields");

    }
    endorsCommentsEl.value = "";
    fromFieldEl.value = "";
    toFieldEl.value = "";
   

  endorsCommentsEl.value = "";
  fromFieldEl.value = "";
  toFieldEl.value = "";
});

onValue(endorsementsInDB, function (snapshot) {
  const endorsementsArray = Object.values(snapshot.val());

  clearEndorsementItemsListEl();

  endorsementsArray.forEach((endorsement) => {
    appendEndorsementsToEndorsementsListEl(endorsement);
  });
});

function appendEndorsementsToEndorsementsListEl(endorsement) {
  const listItem = document.createElement("li");

  const toSpan = document.createElement("span");
  toSpan.textContent = `To: ${endorsement.to}`;
  listItem.appendChild(toSpan);

  const br1 = document.createElement("br");
  listItem.appendChild(br1);

  const br2 = document.createElement("br");
  listItem.appendChild(br2);

  const messageSpan = document.createElement("span");
  messageSpan.textContent = endorsement.message;
  listItem.appendChild(messageSpan);

  const br3 = document.createElement("br");
  listItem.appendChild(br3);

  const br4 = document.createElement("br");
  listItem.appendChild(br4);

  const fromSpan = document.createElement("span");
  fromSpan.textContent = `From: ${endorsement.from}`;
  listItem.appendChild(fromSpan);

   endorsementItemsListEl.insertAdjacentElement("afterbegin", listItem);
}

function clearEndorsementItemsListEl() {
  endorsementItemsListEl.innerHTML = "";
}
