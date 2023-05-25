
import { loadCompData, loadMemberData, loadPracticeData} from "./rest-fnc.js";
import { iterateMembers, iterateComps, iteratePractice, insertCompMembers, insertTotalIncome} from "./displayFnc.js";
import { sortCompMembers, sortForSenior, sortForYouth, sortByPaid, sortForActive } from "./sortingFnc.js";
import { insertCompMemberInfo, insertRegularMemberInfo } from "./memberPageFnc.js";
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
    let memberArray;
        switch (user && psw){
            case "admin" && "admin":
                    // get and show members for admin
                    memberArray = await loadMemberData();
                    iterateMembers(memberArray, "admin");
                    document.querySelector("#admin-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                    //change log btn 
                    document.querySelector("#logOut-btn").classList.remove("hidden");
                    document.querySelector("#login-btn").classList = ""; 
                    document.querySelector("#login-btn").classList.add("hidden"); 

                    document.querySelector("#sort-active").addEventListener("change", ()=>iterateMembers(sortForActive(memberArray), "admin"))

                     // close login dialog
                    document.querySelector("#login-dialog").close();
                break;
            case "cash" && "cash":
                    // get and show members for cashier
                    memberArray = await loadMemberData();
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
                break;
            case "coach" && "coach":
                    // get and show results
                    const compResults = await loadCompData();
                    const practiceResults = await loadPracticeData();
                    iterateComps(compResults);
                    iteratePractice(practiceResults);
                    //insert com member in drop-down list
                    memberArray = await loadMemberData();
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
                    document.querySelector("#refresh").addEventListener("click", async ()=>{ const array =  await loadCompData(); iterateComps(array)});
                    document.querySelector("#refresh").addEventListener("click", async ()=>{ const array =  await loadPracticeData(); iteratePractice(array)});
                    document.querySelector("#youth").addEventListener("click", ()=>iterateComps(sortForYouth(compResults)));
                    document.querySelector("#youth").addEventListener("click", ()=>iteratePractice(sortForYouth(practiceResults)));
                    document.querySelector("#senior").addEventListener("click", ()=>iterateComps(sortForSenior(compResults)));
                    document.querySelector("#senior").addEventListener("click", ()=>iteratePractice(sortForSenior(practiceResults)));

                     // close login dialog
                    document.querySelector("#login-dialog").close();
                break;
            case "comp" && "comp":
                memberArray = await loadMemberData();
                iterateMembers(memberArray, "admin");
                
                insertCompMemberInfo("-NW3R8JVFfH1dMD0qRLe");
                    
                document.querySelector("#comp-member-page").classList.remove("hidden");
                document.querySelector("#home-page").classList.add("hidden");
                //change log btn 
                document.querySelector("#logOut-btn").classList.remove("hidden");
                document.querySelector("#login-btn").classList = ""; 
                document.querySelector("#login-btn").classList.add("hidden");   
                // close login dialog
                document.querySelector("#login-dialog").close();
                break;
            case "comp1" && "comp1":
                memberArray = await loadMemberData();
                iterateMembers(memberArray, "admin");
                
                insertCompMemberInfo("-NW5K7VCUO5hR0SXqdFP");
                    
                document.querySelector("#comp-member-page").classList.remove("hidden");
                document.querySelector("#home-page").classList.add("hidden");
                //change log btn 
                document.querySelector("#logOut-btn").classList.remove("hidden");
                document.querySelector("#login-btn").classList = ""; 
                document.querySelector("#login-btn").classList.add("hidden");   
                // close login dialog
                document.querySelector("#login-dialog").close();
                break;
            case "regular" && "regular":
                memberArray = await loadMemberData();
                iterateMembers(memberArray, "admin");
                
                insertRegularMemberInfo("-NW2R8JVFfH1dMD0qRLe");
                document.querySelector("#regular-member-page").classList.remove("hidden");
                document.querySelector("#home-page").classList.add("hidden");
                //change log btn 
                document.querySelector("#logOut-btn").classList.remove("hidden");
                document.querySelector("#login-btn").classList = ""; 
                document.querySelector("#login-btn").classList.add("hidden");
                    // close login dialog
                document.querySelector("#login-dialog").close();
                break;
            default:
                alert("Y U TRY HAK ME! ------ BAD KITTEN!")         
        }
}