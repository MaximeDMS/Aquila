const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    var mail = form.elements.mail.value;
    var mdp = form.elements.mdp.value;

    if (mail == "max@max.fr" && mdp == "max") {
        console.log("ok");
    }else {
        console.log("bad credential");
        e.preventDefault(); // Annulation de l'envoi des données
    }
});