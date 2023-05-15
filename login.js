"use strict"

export {loginDialog}

function loginDialog(event){
    console.log("login dialog open")
    event.preventDefault();

    document.querySelector("#login-dialog").showModal();

    document.querySelector("#login-form").addEventListener("submit", loginFunction);
}

function loginFunction(event){
    event.preventDefault();
    console.log("event is: ", event);
    const loginEmail = event.target.email.value;
    const loginPsw = event.target.psw.value;

    console.log("email is: ", loginEmail);
    console.log("psw is: ", loginPsw);

        if (loginEmail === "admin" && loginPsw === "admin"){
            document.querySelector("#adminPage").classList.remove("hidden");
        }

    // close login dialog
    document.querySelector("#login-dialog").close();

}