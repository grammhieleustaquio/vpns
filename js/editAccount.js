let editAccountUsername = localStorage.getItem("editAccount");

firebase.database().ref("Users/" + editAccountUsername).once('value', function (snapshot) {
    let userBadgeNumber = snapshot.child("badgeNumber").val();
    let userFullName = snapshot.child("name").val();
    let address = snapshot.child("address").val();
    let position = snapshot.child("position").val();
    let password = snapshot.child("password").val();


    document.getElementById("editAccountForm").innerHTML =
        `
                <div class="card">
                                    <div class="card-header">
                                        <strong>Account Information:</strong>
                                    </div>
                                    <div class="card-body card-block">
                                        <div class="form-group">
                                            <label for="" class=" form-control-label">Full Name:</label>
                                            <input type="text" id="fullName" value="${userFullName}"
                                            onkeyup="lettersOnly(this)" style="text-align: center;" class="form-control" required />
                                        </div>
                                        <div class="form-group">
                                            <label for="country" class=" form-control-label">Position:</label>
                                            <div class="form-group">
                                                <!-- <input class=" au-input au-input--full" type="text" id="position"
                                                    style="text-align: center;" placeholder="Position" required /> -->
                                                <select name="position" id="position" class="form-control" required>
                                                    <option value="${position}">${position}</option>
                                                    <option value="PGEN">PGEN</option>
                                                    <option value="PLTGEN">PLTGEN</option>
                                                    <option value="PMGEN">PMGEN</option>
                                                    <option value="PBGEN">PBGEN</option>
                                                    <option value="PCOL">PCOL</option>
                                                    <option value="PLTCOL">PLTCOL</option>
                                                    <option value="PMAJ">PMAJ</option>
                                                    <option value="PCPT">PCPT</option>
                                                    <option value="PLT">PLT</option>
                                                    <option value="PEMS">PEMS</option>
                                                    <option value="PCMS">PCMS</option>
                                                    <option value="PSMS">PSMS</option>
                                                    <option value="PMSg">PMSg</option>
                                                    <option value="PSSg">PSSg</option>
                                                    <option value="PCpl">PCpl</option>
                                                    <option value="Pat">Pat</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="" class=" form-control-label">Address:</label>
                                            <input type="text" id="address" value="${address}"
                                                style="text-align: center;" class="form-control" required />
                                        </div>
                                        <div class="form-group">
                                            <label for="" class=" form-control-label">Badge No.: (ex. 000001 , 123456) </label>
                                            <input class="form-control" type="text" id="badgeNumber"
                                                style="text-align: center;" value="${userBadgeNumber}"
                                                onkeyup="numbersOnly(this)" pattern="[0-9]{6}" />
                                        </div>
                                        <div class="form-group">
                                            <label for="" class=" form-control-label">Password:  <a class="fa fa-eye" id="toggle-eye" onclick=eyeIcon()></a>
                                            </label>
                                            
                                            <input class="form-control" type="password" id="password"
                                                style="text-align: center;" value="${password}" minlength="5" required />
                                        </div>
                                        <div class="form-group">
                                            <label for="" class=" form-control-label">Retype Password:</label>
                                            <input class="form-control" type="password" id="retypePassword"
                                                style="text-align: center;" value="${password}" minlength="5" required />
                                        </div>
                                        <div class="form-group">
                                            <label for="" class=" form-control-label">ADMIN PASSWORD:</label>
                                            <input class="form-control" type="password" id="adminPassword"
                                                style="text-align: center;" placeholder="ENTER ADMIN PASSWORD"
                                                required />
                                        </div>
                                    </div>
                </div>
                                <button class="au-btn au-btn--block au-btn--aqua m-b-20" type="submit"
                                    sendData(),changePassType()>
                                    Update Account
                                </button>
    `;


    document.getElementById("editAccountForm").addEventListener("submit", function (e) {
        let newFullName = document.querySelector('#fullName').value;
        let newPosition = document.querySelector('#position').value;
        let newAddress = document.querySelector('#address').value;
        let newPassword = document.querySelector('#password').value;
        let newBadgeNumber = document.querySelector('#badgeNumber').value;
        let newRetypePassword = document.querySelector('#retypePassword').value;
        let adminPassword = document.querySelector('#adminPassword').value;

        firebase.database().ref("Users/ADMIN/").once('value', function (snapshot) {
            let updateAdminPassword = snapshot.child("password").val();
            var w = document.getElementById("adminPassword");
            if (adminPassword != updateAdminPassword) {
                alert("INCORRECT ADMIN PASSWORD");
                w.style = "text-align: center; border-color: red;";
            } else {
                var x = document.getElementById("password");
                var y = document.getElementById("retypePassword");
                if (newPassword != newRetypePassword) {
                    alert("PASSWORD DID NOT MATCH");
                    x.style = "text-align: center; border-color: red;";
                    y.style = "text-align: center; border-color: red;";
                    w.style = "text-align: center; border-color: black;";

                } else {
                    var r = confirm("Do you want to proceed?");
                    if (r == true) {
                        if (editAccountUsername == newBadgeNumber) {
                            x.style = "text-align: center; border-color: black;";
                            y.style = "text-align: center; border-color: black;";
                            w.style = "text-align: center; border-color: black;";
                            firebase.database().ref("Users").child(editAccountUsername).set({
                                name: newFullName,
                                position: newPosition,
                                address: newAddress,
                                badgeNumber: newBadgeNumber,
                                password: newPassword

                            });
                            alert("ACCOUNT SUCCESSFULLY UPDATED");
                            window.location.href = "accounts.html";
                        } else {
                            x.style = "text-align: center; border-color: black;";
                            y.style = "text-align: center; border-color: black;";
                            w.style = "text-align: center; border-color: black;";
                            firebase.database().ref("Users").child(editAccountUsername).remove();
                            firebase.database().ref("Users").child(newBadgeNumber).set({
                                name: newFullName,
                                position: newPosition,
                                address: newAddress,
                                badgeNumber: newBadgeNumber,
                                password: newPassword

                            });
                            alert("ACCOUNT SUCCESSFULLY UPDATED");
                            window.location.href = "accounts.html";
                        }
                    }

                }
            }
        })





        e.preventDefault();


    });

})

