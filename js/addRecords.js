let formMessage = firebase.database().ref('Vehicles');
document.getElementById("addRecordsForm").addEventListener("submit", sendRecords);

function sendRecords(e) {
    e.preventDefault();
    let reportedDate = document.querySelector('#reportedDate').value;
    let recordType = document.querySelector('#recordType').value;
    let str = document.querySelector('#plateNumber').value;
    let plateNumber = str.toUpperCase();
    let engineNumber = document.querySelector('#engineNumber').value;
    let chassisNumber = document.querySelector('#chassisNumber').value;
    let maker = document.querySelector('#maker').value;
    let seriesType = document.querySelector('#seriesType').value;
    let vehicleType = document.querySelector('#vehicleType').value;
    let vehicleColor = document.querySelector('#vehicleColor').value;
    let ownerName = document.querySelector('#ownerName').value;
    let ownerNumber = document.querySelector('#ownerNumber').value;
    let incidentDate = document.querySelector('#incidentDate').value;
    let borderColor = "black";
    var r = confirm("Do you want to proceed?");
    if (r == true) {
        firebase.database().ref("Vehicles/" + plateNumber).once('value', function (snapshot) {
            let fbPlateNumber = snapshot.child("plateNumber").val();
            if (plateNumber == fbPlateNumber) {
                borderColor = "red";
                changeBorderColorPlate(borderColor);
                alert("Plate Number has a RECORD");
            } else if (reportedDate <= incidentDate) {
                borderColor = "red";
                changeBorderColor(borderColor);
                alert("ERROR: Incident Date must NOT exceed the Reported Date");

            } else {
                sendData(reportedDate, recordType, plateNumber, engineNumber, chassisNumber, maker, seriesType, vehicleType, vehicleColor, ownerName, ownerNumber, incidentDate);
                alert("RECORD SUCCESSFULLY ADDED.")
                borderColor = "black";
                changeBorderColor(borderColor);
                changeBorderColorPlate(borderColor);
                document.getElementById('addRecordsForm').reset();

            }
        })


    }



}

function sendData(reportedDate, recordType, plateNumber, engineNumber, chassisNumber, maker, seriesType, vehicleType, vehicleColor, ownerName, ownerNumber, incidentDate) {
    formMessage.child(plateNumber).set({

        reportedDate: reportedDate,
        violation: recordType,
        plateNumber: plateNumber,
        engineNumber: engineNumber,
        chassisNumber: chassisNumber,
        maker: maker,
        model: seriesType,
        type: vehicleType,
        color: vehicleColor,
        owner: ownerName,
        contactNum: ownerNumber,
        incidentDate: incidentDate
    });
}

function changeBorderColor(borderColor) {
    var x = document.getElementById("incidentDate");
    if (borderColor == "red") {
        x.style = "border-color: " + borderColor;
    } else {
        x.style = "border-color: " + borderColor;
    }


}

function changeBorderColorPlate(borderColor) {
    var y = document.getElementById("plateNumber");
    if (borderColor == "red") {
        y.style = "border-color: " + borderColor;
    } else {
        y.style = "border-color: " + borderColor;
    }


}



