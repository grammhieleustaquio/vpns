function changePassType() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let badgeNumber = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    verifyLogin(badgeNumber, password);
});


function verifyLogin(badgeNumber, password) {
    firebase.database().ref("Users/" + badgeNumber).once('value', function (snapshot) {
        let userBadgeNumber = snapshot.child("badgeNumber").val();
        let userFullName = snapshot.child("name").val();
        let userPass = snapshot.child("password").val();
        if (userBadgeNumber != null) {
            if ((userBadgeNumber == badgeNumber) && (userPass == password)) {
                localStorage.setItem("username", badgeNumber);
                localStorage.setItem("userFullName", userFullName);
                window.location.href = "menu.html";
            } else {
                alert("INCORRECT USERNAME OR PASSWORD");
            }
        } else {
            alert("ACCOUNT DOES NOT EXIST");
        }
    })
}

if (localStorage.getItem("username") != null) {
    window.location.replace("menu.html");
}











