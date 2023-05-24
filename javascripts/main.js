"use strict"

import {loginDialog} from "./login.js";
import {loadCompData, loadMemberData, loadPracticeData, createData} from "./rest-fnc.js";
import {iterateMembers, iterateComps, iteratePractice} from "./displayFnc.js";
import {calcMemberPayment, calcTotalIncome} from "./payment.js";


window.addEventListener("load", initApp);

async function initApp(){
    console.log("JS starting");

    addEventListeners();

    const memberArray = await loadMemberData();
    const practiceResults = await loadPracticeData();
    const compResults = await loadCompData();

    // for testing
    console.log("Members: ", memberArray)
    console.log("Practice: ", practiceResults)
    console.log("Comps: ", compResults)

    iterateMembers(memberArray, "admin");
    iterateMembers(memberArray, "cashier");

    iterateComps(compResults);
    iteratePractice(practiceResults);
}

function addEventListeners(){
    //disciplin checkbox hide listners
    document.querySelector("#create-competition-btn").addEventListener("click", ()=>document.querySelector("#create-disciplin-checkbox").classList.toggle("hidden"));
    document.querySelector("#update-competition-btn").addEventListener("click", ()=>document.querySelector("#update-disciplin-checkbox").classList.toggle("hidden"));

    // login dialog 
    document.querySelector("#login-btn").addEventListener("click", loginDialog);
    // log out btn
    document.querySelector("#logOut-btn").addEventListener("click", ()=>window.location.reload());

    // coach result dialogs
    document.querySelector("#insert-practice-result-btn").addEventListener("click", createPracticeDialog);
    document.querySelector("#insert-comp-result-btn").addEventListener("click", createCompsDialog);

    // create member dialog
    document.querySelector("#admin-create-member-btn").addEventListener("click", createMemberDialog);
}
function createPracticeDialog(){
    document.querySelector("#create-practice-result-dialog").showModal();

    document.querySelector("#practice-result-form").addEventListener("submit", createData);
}
function createCompsDialog(){
    document.querySelector("#create-comp-result-dialog").showModal();

    document.querySelector("#comp-result-form").addEventListener("submit", createData);
}

function createMemberDialog(){
    document.querySelector("#create-dialog").showModal();

    document.querySelector("#create-form").addEventListener("submit", createData);
}

const endpoint = "https://delfin-kea-default-rtdb.firebaseio.com/";

// Accessing the HTML elements using their IDs
const welcomeRegularUser = document.getElementById("welcomeRegularUser");
const regularMemberInfoName = document.getElementById("regular-member-info-name");
const regularMemberInfoAge = document.getElementById("regular-member-info-age");
const regularMemberInfoGender = document.getElementById("regular-member-info-gender");
const regularMemberInfoAddress = document.getElementById("regular-member-info-address");
const regularMemberInfoEmail = document.getElementById("regular-member-info-email");
const regularMemberInfoPhone = document.getElementById("regular-member-info-phone");
const regularMemberPrice = document.getElementById("regular-member-price");
const regularMemberDiscount = document.getElementById("regular-member-discount");

// Discount configuration
const youthAge = 17;
const discountAge = 60;
const discount = 25; // percent

// Fetching the JSON data from the endpoint
fetch(endpoint + "members.json")
  .then((response) => response.json())
  .then((data) => {
    // Retrieving each member's data and populating the HTML elements
    for (const memberId in data) {
      const member = data[memberId];
      welcomeRegularUser.textContent = "Velkommen: " + member["athlete"] + "!";
      regularMemberInfoName.textContent = "Navn: " + member["athlete"];
      regularMemberInfoAge.textContent = "Alder: " + calculateAge(member["birthdate"]);
      regularMemberInfoGender.textContent = "Køn: " + member["gender"];
      regularMemberInfoAddress.textContent = "Adresse: " + member["address"];
      regularMemberInfoEmail.textContent = "E-mail: " + member["mail"];
      regularMemberInfoPhone.textContent = "Telefon: " + member["phone"];

      const memberPayment = calcMemberPayment(member);
      regularMemberPrice.textContent = "Pris for kontigent: " + memberPayment;

      const memberDiscount = calcMemberDiscount(member);
      regularMemberDiscount.textContent = "Eventuel rabat: " + memberDiscount;

      // Break the loop after the first member to prevent overwriting the HTML elements
      break;
    }
  })
  .catch((error) => console.error(error));

// Function to calculate age based on birthdate
function calculateAge(birthdate) {
  const today = new Date();
  const birthdateObj = new Date(birthdate);
  let age = today.getFullYear() - birthdateObj.getFullYear();
  const monthDiff = today.getMonth() - birthdateObj.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdateObj.getDate())
  ) {
    age--;
  }

  return age;
}

function calcMemberDiscount(memberObject) {
  const age = calculateAge(memberObject.birthdate);

  if (age <= youthAge) {
    return "Ung svømmer rabat";
  } else if (age >= discountAge) {
    return `Senior svømmer ${discount}% rabat`;
  } else {
    return "Ingen aldersrabat";
  }
}