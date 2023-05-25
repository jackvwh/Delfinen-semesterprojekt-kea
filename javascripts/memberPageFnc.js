import { calcMemberPayment } from "./payment.js";  
import { fetchItem } from "./rest-fnc.js"; 
export{ insertRegularMemberInfo, insertCompMemberInfo}

const endpoint = "https://delfin-kea-default-rtdb.firebaseio.com/";

async function insertRegularMemberInfo(id) {
  // fetching the JSON data from the endpoint for regular members
  const member = await fetchItem(id, "members");
  console.log("regular member:", member);

  // accessing the HTML elements for regular members using their IDs
  const welcomeRegularUser = document.getElementById("welcomeRegularUser");
  const regularMemberInfoName = document.getElementById("regular-member-info-name");
  const regularMemberInfoAge = document.getElementById("regular-member-info-age");
  const regularMemberInfoGender = document.getElementById("regular-member-info-gender");
  const regularMemberInfoAddress = document.getElementById("regular-member-info-address");
  const regularMemberInfoEmail = document.getElementById("regular-member-info-email");
  const regularMemberInfoPhone = document.getElementById("regular-member-info-phone");
  const regularMemberPrice = document.getElementById("regular-member-price");
  const regularMemberDiscount = document.getElementById("regular-member-discount");

    // populating the HTML elements with fetched JSON data
    welcomeRegularUser.textContent = "Velkommen: " + member["athlete"] + "!";
    regularMemberInfoName.textContent = "Navn: " + member["athlete"];
    regularMemberInfoAge.textContent ="Alder: " + calculateAge(member["birthdate"]);
    regularMemberInfoGender.textContent = "Køn: " + member["gender"];
    regularMemberInfoAddress.textContent = "Adresse: " + member["address"];
    regularMemberInfoEmail.textContent = "E-mail: " + member["mail"];
    regularMemberInfoPhone.textContent = "Telefon: " + member["phone"];

      const memberPayment = calcMemberPayment(member);
      regularMemberPrice.textContent ="Pris for kontigent: " + memberPayment + "kr";

      const memberDiscount = calcMemberDiscount(member);
      regularMemberDiscount.textContent = "Aldersrabat: " + memberDiscount;
}

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
    return "Ungsvømmer";
  } else if (age >= discountAge) {
    return `Seniorsvømmer ${discount}% rabat`;
  } else {
    return "Ingen rabat";
  }
}

// discount configuration
const youthAge = 17;
const discountAge = 60;
const discount = 25; // percent


async function insertCompMemberInfo(id) {
  const compMember = await fetchItem(id, "members");
  console.log("comp member:", compMember);

  // accessing the HTML elements for competitive members using their IDs
  const welcomeCompMember = document.getElementById("comp-member-welcome");
  const compMemberInfoName = document.getElementById("comp-member-info-name");
  const compMemberInfoAge = document.getElementById("comp-member-info-age");
  const compMemberInfoGender = document.getElementById("comp-member-info-gender");
  const compMemberInfoAddress = document.getElementById("comp-member-info-address");
  const compMemberInfoEmail = document.getElementById("comp-member-info-email");
  const compMemberInfoPhone = document.getElementById("comp-member-info-phone");
  const compMemberCoach = document.getElementById("comp-member-coach-name");

    // populating the HTML elements with fetched JSON data
    welcomeCompMember.textContent = "Velkommen: " + compMember.athlete + "!";
    compMemberInfoName.textContent = "Navn: " + compMember["athlete"];
    compMemberInfoAge.textContent = "Alder: " + calculateAge(compMember["birthdate"]);
    compMemberInfoGender.textContent = "Køn: " + compMember["gender"];
    compMemberInfoAddress.textContent = "Adresse: " + compMember["address"];
    compMemberInfoEmail.textContent = "E-mail: " + compMember["mail"];
    compMemberInfoPhone.textContent = "Telefon: " + compMember["phone"];
    compMemberCoach.textContent = "Træner: ??? "; // a coach value could be used here

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
