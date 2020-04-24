let editRecord = localStorage.getItem("editRecord");

firebase.database().ref("Vehicles/" + editRecord).once('value', function (snapshot) {

    let reportedDate = snapshot.child('reportedDate').val();
    let recordType = snapshot.child('violation').val();
    let plateNumber = snapshot.child('plateNumber').val();
    let engineNumber = snapshot.child('engineNumber').val();
    let chassisNumber = snapshot.child('chassisNumber').val();
    let maker = snapshot.child('maker').val();
    let seriesType = snapshot.child('model').val();
    let vehicleType = snapshot.child('type').val();
    let vehicleColor = snapshot.child('color').val();
    let ownerName = snapshot.child('owner').val();
    let ownerNumber = snapshot.child('contactNum').val();
    let incidentDate = snapshot.child('incidentDate').val();

    document.getElementById("editRecordForm").innerHTML =
        `
        <div class="card">
        <div class="card-header">
            <strong>RECORD INFO:</strong>
        </div>
        <div class="card-body card-block">
            <div class="form-group">
                <label class=" form-control-label">Date Reported:</label>
                <input type="datetime-local" id="reportedDate" value="${reportedDate}" class="form-control"
                    required />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Violation: (Ex.
                    Stolen)</label>
                <input type="text" id="recordType" value="${recordType}"
                    class="form-control" required />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Plate Number:</label>
                <input type="text" id="plateNumber" value="${plateNumber}" 
                    class="form-control" required />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Engine Number (if any):</label>
                <input type="text" id="engineNumber" 
                    class="form-control" value="${engineNumber}">
            </div>
            <div class="form-group">
                <label class=" form-control-label">Chassis Number (if any):</label>
                <input type="text" id="chassisNumber" 
                    class="form-control" value="${chassisNumber}" >
            </div>
            <div class="form-group">
                <label class=" form-control-label">Maker: (Ex.Toyota)</label>
                <input type="text" id="maker" value="${maker}"  class="form-control"
                    required />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Series Type:
                    (Ex.Vios)</label>
                <input type="text" id="seriesType" value="${seriesType}" 
                    class="form-control" required />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Vehicle Type: (Ex.
                    Van,Car)</label>
                <input type="text" id="vehicleType"  value="${vehicleType}"
                    class="form-control" required />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Vehicle Color: </label>
                <input type="text" id="vehicleColor" value="${vehicleColor}" 
                    class="form-control" required />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Owner's Name:
                </label>
                <input type="text" id="ownerName" value="${ownerName}"
                    class="form-control" required />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Owner's Contact Number (if any):
                </label>
                <input type="text" id="ownerNumber" 
                     class="form-control" value="${ownerNumber}">
            </div>
            <div class="form-group">
                <label class=" form-control-label">Date of Incident (if any):</label>
                <input type="datetime-local" id="incidentDate"  class="form-control" value="${incidentDate}" >
            </div>
        </div>
    </div>

    <button class="au-btn au-btn--block au-btn--aqua m-b-20" type="submit">
        Update Record
    </button>
    `;


    document.getElementById("editRecordForm").addEventListener("submit", function (e) {
        let newReportedDate = document.querySelector('#reportedDate').value;
        let newRecordType = document.querySelector('#recordType').value;
        let newPlateNumber = document.querySelector('#plateNumber').value;
        let newEngineNumber = document.querySelector('#engineNumber').value;
        let newChassisNumber = document.querySelector('#chassisNumber').value;
        let newMaker = document.querySelector('#maker').value;
        let newSeriesType = document.querySelector('#seriesType').value;
        let newVehicleType = document.querySelector('#vehicleType').value;
        let newVehicleColor = document.querySelector('#vehicleColor').value;
        let newOwnerName = document.querySelector('#ownerName').value;
        let newOwnerNumber = document.querySelector('#ownerNumber').value;
        let newIncidentDate = document.querySelector('#incidentDate').value;
        var r = confirm("Do you want to proceed?");
        if (r == true) {
            if (editRecord == newPlateNumber) {
                firebase.database().ref("Vehicles").child(editRecord).set({
                    reportedDate: newReportedDate,
                    violation: newRecordType,
                    plateNumber: newPlateNumber,
                    engineNumber: newEngineNumber,
                    chassisNumber: newChassisNumber,
                    maker: newMaker,
                    model: newSeriesType,
                    type: newVehicleType,
                    color: newVehicleColor,
                    owner: newOwnerName,
                    contactNum: newOwnerNumber,
                    incidentDate: newIncidentDate
                });


            } else {
                firebase.database().ref("Vehicles").child(editRecord).remove();
                firebase.database().ref("Vehicles").child(newPlateNumber).set({
                    reportedDate: newReportedDate,
                    violation: newRecordType,
                    plateNumber: newPlateNumber,
                    engineNumber: newEngineNumber,
                    chassisNumber: newChassisNumber,
                    maker: newMaker,
                    model: newSeriesType,
                    type: newVehicleType,
                    color: newVehicleColor,
                    owner: newOwnerName,
                    contactNum: newOwnerNumber,
                    incidentDate: newIncidentDate

                });




            }

        }
        alert("RECORD SUCCESSFULLY UPDATED");
        window.location.href = "records.html";
        e.preventDefault();
    })


})


