
import {loadCompData, loadMemberData, loadPracticeData, createData} from "./rest-fnc.js";
import {iterateMembers, iterateComps, iteratePractice, insertCompMembers} from "./displayFnc.js";
import { sortCompMembers, sortForSenior, sortForYouth } from "./sortingFnc.js";

export {loginDialog}

function loginDialog(event){
    event.preventDefault();

    document.querySelector("#login-dialog").showModal();

    document.querySelector("#login-form").addEventListener("submit", loginFunction);
}

async function loginFunction(event){
    event.preventDefault();
    const user = event.target.email.value;
    const psw = event.target.psw.value;
    
        switch (user){
            case "admin":
                if (psw === "admin"){
                    document.querySelector("#admin-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                    //change log btn 
                    document.querySelector("#logOut-btn").classList.remove("hidden");
                    document.querySelector("#login-btn").classList = ""; 
                    document.querySelector("#login-btn").classList.add("hidden"); 
                    const memberArray = await loadMemberData();
                    iterateMembers(memberArray, "admin");

                }
                break;
            case "cash":
                if (psw === "cash"){
                    document.querySelector("#cashier-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                    //change log btn 
                    document.querySelector("#logOut-btn").classList.remove("hidden");
                    document.querySelector("#login-btn").classList = ""; 
                    document.querySelector("#login-btn").classList.add("hidden");  
                    const memberArray = await loadMemberData();
                    iterateMembers(memberArray, "cashier");

                };
                break;
            case "coach":
                if (psw === "coach"){
                    //insert com member in drop-down list
                    const memberArray = await loadMemberData();
                    const compArray = sortCompMembers(memberArray);
                    console.log("compmember: ", compArray);
                    insertCompMembers(compArray);
                    //show coach page
                    document.querySelector("#coach-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                    //change log btn 
                    document.querySelector("#logOut-btn").classList.remove("hidden");
                    document.querySelector("#login-btn").classList = ""; 
                    document.querySelector("#login-btn").classList.add("hidden");  
                    const compResults = await loadCompData();
                    const practiceResults = await loadPracticeData();
                    iterateComps(compResults);
                    iteratePractice(practiceResults);
                    //eventListners for la coúch butóns
                    document.querySelector("#all").addEventListener("click", ()=>iterateComps(compResults));
                    document.querySelector("#all").addEventListener("click", ()=>iteratePractice(practiceResults));
                    document.querySelector("#refresh").addEventListener("click", ()=>iterateComps(compResults));
                    document.querySelector("#refresh").addEventListener("click", ()=>iteratePractice(practiceResults));
                    document.querySelector("#youth").addEventListener("click", ()=>iterateComps(sortForYouth(compResults)))
                    document.querySelector("#youth").addEventListener("click", ()=>iteratePractice(sortForYouth(practiceResults)))
                    document.querySelector("#senior").addEventListener("click", ()=>iterateComps(sortForSenior(compResults)))
                    document.querySelector("#senior").addEventListener("click", ()=>iteratePractice(sortForSenior(practiceResults)))
                };
                break;
            case "comp":
                if (psw === "comp"){
                    document.querySelector("#comp-member-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                     //change log btn 
                     document.querySelector("#logOut-btn").classList.remove("hidden");
                     document.querySelector("#login-btn").classList = ""; 
                     document.querySelector("#login-btn").classList.add("hidden");                
                };
                break;
            case "regular":
                if (psw === "regular"){
                    document.querySelector("#regular-member-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                    //change log btn 
                    document.querySelector("#logOut-btn").classList.remove("hidden");
                    document.querySelector("#login-btn").classList = ""; 
                    document.querySelector("#login-btn").classList.add("hidden");
                };
                break;
            default:
                window.location.reload();         
        }
    // close login dialog
    document.querySelector("#login-dialog").close();

}