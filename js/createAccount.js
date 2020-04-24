let formMessage = firebase.database().ref('Users');
document.getElementById("createAccountForm").addEventListener("submit", signUp);

function signUp(e) {
    e.preventDefault();
    let fullName = document.querySelector('#fullName').value;
    let position = document.querySelector('#position').value;
    let address = document.querySelector('#address').value;
    let badgeNumber = document.querySelector('#badgeNumber').value;
    let password = document.querySelector('#password').value;
    let retypePassword = document.querySelector('#retypePassword').value;
    let adminPassword = document.querySelector('#adminPassword').value;
    firebase.database().ref("Users/ADMIN/").once('value', function (snapshot) {
        let signUpAdminPassword = snapshot.child("password").val();
        var w = document.getElementById("adminPassword");
        if (adminPassword != signUpAdminPassword) {
            alert("INCORRECT ADMIN PASSWORD");
            w.style = "text-align: center; border-color: red;";
        } else {
            firebase.database().ref("Users/" + badgeNumber).once('value', function (snapshot) {
                let signUpBadgeNumber = snapshot.child("badgeNumber").val();
                var z = document.getElementById("badgeNumber");
                var x = document.getElementById("password");
                var y = document.getElementById("retypePassword");
                if (password != retypePassword) {
                    alert("PASSWORD DID NOT MATCH");
                    x.style = "text-align: center; border-color: red;";
                    y.style = "text-align: center; border-color: red;";
                    z.style = "text-align: center; border-color: black;";
                    w.style = "text-align: center; border-color: black;";

                } else if (signUpBadgeNumber == badgeNumber) {
                    alert("USERNAME or SERIAL NUMBER already EXIST");
                    z.style = "text-align: center; border-color: red;";
                    x.style = "text-align: center; border-color: black;";
                    y.style = "text-align: center; border-color: black;";
                    w.style = "text-align: center; border-color: black;";

                } else {
                    var r = confirm("Do you want to proceed?");
                    if (r == true) {
                        sendData(fullName, position, address, badgeNumber, password);
                        document.getElementById('createAccountForm').reset();
                        alert("ACCOUNT SUCCESSFULLY CREATED");
                        x.style = "text-align: center; border-color: black;";
                        y.style = "text-align: center; border-color: black;";
                        z.style = "text-align: center; border-color: black;";
                        w.style = "text-align: center; border-color: black;";
                    }

                }
            })
        }
    })



}



function sendData(fullName, position, address, badgeNumber, password) {
    // let newFormMessage = formMessage.push();
    formMessage.child(badgeNumber).set({

        name: fullName,
        position: position,
        address: address,
        badgeNumber: badgeNumber,
        password: password

    });
}

function changePassType() {
    var x = document.getElementById("password");
    var y = document.getElementById("adminPassword");
    if (x.type === "password" || y.type === "password") {
        x.type = "text";
        y.type = "text";
    } else {
        x.type = "password";
        y.type = "password";
    }
}





