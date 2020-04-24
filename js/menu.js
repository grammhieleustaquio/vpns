if (localStorage.getItem("username") == null) {
    window.location.replace("index.html");
}
if (localStorage.getItem("username") != "ADMIN") {
    document.getElementById("pageAccounts").style = "display: none";

}

function logout() {

    window.location.replace("index.html");
    localStorage.clear();
}

function checkRecords() {
    document.getElementById("homeMenu").innerHTML = `

    <div class="card">
      <br>
      
      <h3 style="text-align: center;">Input Plate Number</h3>
      <div class="card-body card-block">
        <button onclick="backToMenu()" style="float: left;" class="btn btn-danger btn-sm">
            <i class=" fa fa-arrow-left"> BACK</i>
        </button>
        <div class="form-group">
        <button onclick="checkPlateNumber()" style="float: right;" class="btn btn-success btn-sm">CHECK 
        <i class="fa fa-check"> </i>
       </button>
            <input class="form-control" type="text" id="inputPlateNumber" style="text-align: center;"
             onkeyup="removeSpecialchar(this)" placeholder="Enter Plate Number" required />
        </div>
      </div>
    </div>
    `;
}

function checkPlateNumber() {
    var str = document.getElementById("inputPlateNumber").value;
    var inputPlateNumber = str.toUpperCase();

    firebase.database().ref("Vehicles/" + inputPlateNumber).once('value', function (snapshot) {
        let plateNumber = snapshot.child('plateNumber').val();
        if (inputPlateNumber == plateNumber) {
            alert("Vehicle with Plate Number: " + inputPlateNumber + " is in question");
            var r = confirm("View record details?");
            if (r == true) {
                window.location.href = "viewRecords.html";
                localStorage.setItem("viewRecord", inputPlateNumber);
            }
        } else {
            alert("VEHICLE is CLEAR");
        }

    })

}
