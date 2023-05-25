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
    
    // update member personal info dialog
  document.querySelector("#regular-member-update-btn").addEventListener("click", updateMemberPersonalDialog);
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

function updateMemberPersonalDialog() {
  document.querySelector("#update-dialog").showModal();

  document
    .querySelector("#update-from")
    .addEventListener("submit", createData);
}

// regular member page
const endpoint = "https://delfin-kea-default-rtdb.firebaseio.com/";

// accessing the HTML elements using their IDs
const welcomeRegularUser = document.getElementById("welcomeRegularUser");
const regularMemberInfoName = document.getElementById("regular-member-info-name");
const regularMemberInfoAge = document.getElementById("regular-member-info-age");
const regularMemberInfoGender = document.getElementById("regular-member-info-gender");
const regularMemberInfoAddress = document.getElementById("regular-member-info-address");
const regularMemberInfoEmail = document.getElementById("regular-member-info-email");
const regularMemberInfoPhone = document.getElementById("regular-member-info-phone");
const regularMemberPrice = document.getElementById("regular-member-price");
const regularMemberDiscount = document.getElementById("regular-member-discount");
const regularMemberTotal = document.getElementById("regular-member-total");

// discount configuration
const youthAge = 17;
const discountAge = 60;
const discount = 25; // percent

// Fetching the JSON data from the endpoint for regular members
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
      regularMemberPrice.textContent = "Pris for kontigent: " + memberPayment + "kr";

      const memberDiscount = calcMemberDiscount(member);
      regularMemberDiscount.textContent = "Aldersrabat: " + memberDiscount;
      
      // I don't think actually works
      const totalPayment = memberPayment;
      regularMemberTotal.textContent = "Total beløb at betale: " + totalPayment + "kr";

      // break the loop after the first member to prevent overwriting the HTML elements
      break;
    }
  })
  .catch((error) => console.error(error));

// function to calculate age based on birthdate
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

// function to calculate regular member discount
function calcMemberDiscount(memberObject) {
  const age = calculateAge(memberObject.birthdate);

  if (age <= youthAge) {
    return "Ungsvømmer rabat";
  } else if (age >= discountAge) {
    return `Seniorsvømmer ${discount}% rabat`;
  } else {
    return "Ingen rabat";
  }
}

// comp member page
const welcomeCompMember = document.getElementById("comp-member-welcome");
const compMemberInfoName = document.getElementById("comp-member-info-name");
const compMemberInfoAge = document.getElementById("comp-member-info-age");
const compMemberInfoGender = document.getElementById("comp-member-info-gender");
const compMemberInfoAddress = document.getElementById("comp-member-info-address");
const compMemberInfoEmail = document.getElementById("comp-member-info-email");
const compMemberInfoPhone = document.getElementById("comp-member-info-phone");
const compMemberCoach = document.getElementById("comp-member-coach-name");

fetch(endpoint + "members.json")
  .then((response) => response.json())
  .then((data) => {
    // retrieve and filter members with "comp" value set to "true"
    const compMembers = Object.values(data).filter(
      (member) => member.comp === "true"
    );

    // retrieve the first comp member's data and populate the HTML elements
    if (compMembers.length > 0) {
      const compMember = compMembers[0];
      welcomeCompMember.textContent = "Velkommen: " + compMember["athlete"] + "!";
      compMemberInfoName.textContent = "Navn: " + compMember["athlete"];
      compMemberInfoAge.textContent = "Alder: " + calculateAge(compMember["birthdate"]);
      compMemberInfoGender.textContent = "Køn: " + compMember["gender"];
      compMemberInfoAddress.textContent = "Adresse: " + compMember["address"];
      compMemberInfoEmail.textContent = "E-mail: " + compMember["mail"];
      compMemberInfoPhone.textContent = "Telefon: " + compMember["phone"];
      compMemberCoach.textContent = "Træner: " + compMember["coach"]; // coach value missing?

      // disable all checkboxes
      const checkboxes = document.querySelectorAll(".checkbox-styling");
      checkboxes.forEach((checkbox) => {
        checkbox.disabled = true;
      });

      // check the checkboxes based on the member's disciplines
      const disciplines = compMember.disciplins;
      for (const disciplineName in disciplines) {
        const checkbox = document.querySelector(`input[name="${disciplineName}"]`);
        if (checkbox && disciplines[disciplineName] === "true") {
          checkbox.checked = true;
        }
      }
    }
  })
  .catch((error) => console.error(error));
