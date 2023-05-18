export {loginDialog}

function loginDialog(event){
    event.preventDefault();

    document.querySelector("#login-dialog").showModal();

    document.querySelector("#login-form").addEventListener("submit", loginFunction);
}

function loginFunction(event){
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
                };
                break;
            case "coach":
                if (psw === "coach"){
                    document.querySelector("#coach-page").classList.remove("hidden");
                    document.querySelector("#home-page").classList.add("hidden");
                    //change log btn 
                    document.querySelector("#logOut-btn").classList.remove("hidden");
                    document.querySelector("#login-btn").classList = ""; 
                    document.querySelector("#login-btn").classList.add("hidden");                
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