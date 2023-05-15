"use strict"

export {calcMemberPayment, calcTotalIncome}

const youthAge = 17;
const discountAge = 60;
const discount = 25; // procent
const youthPrice = 1000;
const seniorPrize = 1600;
const passivePrice = 500;

function calcMemberPayment(memberObject){
    const currentDate = date();
    const age = Math.floor(currentDate - memberObject.birthDate);

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
