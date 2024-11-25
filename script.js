const addReview = () => {
    const fname = document.getElementById("fname");    
    const message = "🖊️ " + fname.value + " has signed the petition!"
    const signatureList = document.getElementById("signatures");
    const newSignature = document.createElement("p");
    newSignature.innerText = message;
    signatureList.appendChild(newSignature);
    document.getElementById("petition").reset();
};




