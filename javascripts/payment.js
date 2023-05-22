export {calcMemberPayment, calcTotalIncome, calcAge}

const youthAge = 17;
const discountAge = 60;
const discount = 25; // procent
const youthPrice = 1000;
const seniorPrize = 1600;
const passivePrice = 500;

function calcMemberPayment(memberObject){ 

    const age = calcAge(memberObject.birthdate);

    while(memberObject.title !== "admin"){
        if (age <= youthAge){
            return youthPrice;
        }
        else if(age >= discountAge){
            return seniorPrize - (seniorPrize / 100 * discount);
        }
        else if (memberObject.active != true){
            return passivePrice;
        }
        return seniorPrize; 
    }
    return 0;
}
function calcTotalIncome(memberArray){
    let totalIncome = null;
    for (let member of memberArray){
        totalIncome += calcMemberPayment(member);
    }
    return totalIncome;
}
function calcAge(dob){
    const dobDate = new Date(dob);
    const diffMS = Date.now() - dobDate.getTime();
    const ageDate = new Date(diffMS);

    return Math.floor(ageDate.getUTCFullYear() - 1970)
}
