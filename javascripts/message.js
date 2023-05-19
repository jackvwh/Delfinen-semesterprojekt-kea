
export {response_message}

// show reponse message to user 
function response_message(msg) {
    const message_element = document.getElementById("response-message");
    message_element.innerHTML = msg;
    message_element.classList.remove("hidden");
   
    // automatically remove toast message if user doesn´t click it
    setTimeout(function(){message_element.classList.add("hidden")}, 7000);
}   