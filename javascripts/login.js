
import { loadCompData, loadMemberData, loadPracticeData} from "./rest-fnc.js";
import { iterateMembers, iterateComps, iteratePractice, insertCompMembers, insertTotalIncome} from "./displayFnc.js";
import { sortCompMembers, sortForSenior, sortForYouth, sortByPaid } from "./sortingFnc.js";

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
                    // get and show members for admin
                    const memberArray = await loadMemberData();
                    iterateMembers(memberArray, "admin");
                    document.querySelector("#admin-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                    //change log btn 
                    document.querySelector("#logOut-btn").classList.remove("hidden");
                    document.querySelector("#login-btn").classList = ""; 
                    document.querySelector("#login-btn").classList.add("hidden"); 

                     // close login dialog
                    document.querySelector("#login-dialog").close();
                }
                break;
            case "cash":
                if (psw === "cash"){
                    // get and show members for cashier
                    const memberArray = await loadMemberData();
                    iterateMembers(memberArray, "cashier");

                    // insert expected total income 
                    insertTotalIncome(memberArray);

                    document.querySelector("#cashier-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                    //change log btn 
                    document.querySelector("#logOut-btn").classList.remove("hidden");
                    document.querySelector("#login-btn").classList = ""; 
                    document.querySelector("#login-btn").classList.add("hidden");  
                   

                    document.querySelector("#sort-payments").addEventListener("change", ()=>iterateMembers(sortByPaid(memberArray), "cashier"))
                     
                    // close login dialog
                    document.querySelector("#login-dialog").close();

                };
                break;
            case "coach":
                if (psw === "coach"){
                    // get and show results
                    const compResults = await loadCompData();
                    const practiceResults = await loadPracticeData();
                    iterateComps(compResults);
                    iteratePractice(practiceResults);
                    //insert com member in drop-down list
                    const memberArray = await loadMemberData();
                    const compArray = sortCompMembers(memberArray);
                    insertCompMembers(compArray);
                    
                    //show coach page
                    document.querySelector("#coach-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                    //change log btn 
                    document.querySelector("#logOut-btn").classList.remove("hidden");
                    document.querySelector("#login-btn").classList = ""; 
                    document.querySelector("#login-btn").classList.add("hidden");  
                    
                    //eventListners for la coách butóns
                    document.querySelector("#all").addEventListener("click", ()=>iterateComps(compResults));
                    document.querySelector("#all").addEventListener("click", ()=>iteratePractice(practiceResults));
                    document.querySelector("#refresh").addEventListener("click", ()=>iterateComps(async ()=> await loadCompData()));
                    document.querySelector("#refresh").addEventListener("click",()=>iteratePractice(async ()=> await loadPracticeData()));
                    document.querySelector("#youth").addEventListener("click", ()=>iterateComps(sortForYouth(compResults)));
                    document.querySelector("#youth").addEventListener("click", ()=>iteratePractice(sortForYouth(practiceResults)));
                    document.querySelector("#senior").addEventListener("click", ()=>iterateComps(sortForSenior(compResults)));
                    document.querySelector("#senior").addEventListener("click", ()=>iteratePractice(sortForSenior(practiceResults)));

                     // close login dialog
                        document.querySelector("#login-dialog").close();

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
                    // close login dialog
                    document.querySelector("#login-dialog").close();
             
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
                     // close login dialog
                    document.querySelector("#login-dialog").close();

                };
                break;
            default:
                window.location.reload();         
        }
}