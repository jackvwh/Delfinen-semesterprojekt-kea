export {calcMemberPayment, calcTotalIncome}

const youthAge = 17;
const discountAge = 60;
const discount = 25; // procent
const youthPrice = 1000;
const seniorPrize = 1600;
const passivePrice = 500;

function calcMemberPayment(memberObject){
   
    const age = calcAge(memberObject.birthdate);
    console.log("age: ", age);

        if (age <= youthAge){
            return youthPrice;
        }
        else if(age >= discountAge){
            return seniorPrize * (100 - discount);
        }
        else if (memberObject.active != true){
            return passivePrice;
        }
        return seniorPrize;
}
function calcTotalIncome(memberArray){
    let totalIncome = null;
    for (member of memberArray){
        totalIncome += calcMemberPayment(member);
    }
    return totalIncome;
}
function calcAge(dob){
    console.log("dob string: ", dob);
    const dobDate = new Date(dob);
    console.log("new dobDate ", dobDate);
    const nowMS = Date.now();
    console.log("now MS: ", nowMS);
    const dobMS = dobDate.getTime();
    console.log("dob MS: ", dobMS);
    const diffMS = nowMS - dobMS;
    console.log("diff MS: ", diffMS)
    const ageDate = new Date(diffMS);
    console.log("age Date:", ageDate);

    return Math.floor(ageDate.getUTCFullYear() - 1970)
}
