
let viewRecord = localStorage.getItem("viewRecord");
let getUserBadgeNumber = localStorage.getItem("username");
if (viewRecord == null) {
    window.location.replace("menu.html");
}

firebase.database().ref("Vehicles/" + viewRecord).once('value', function (snapshot) {

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


    document.getElementById("viewRecordForm").innerHTML =
        `
    <div class="card">
        <div class="card-header">
            <strong>RECORD INFO:</strong>
        </div>
        <div class="card-body card-block">
            <div class="form-group">
                <label class=" form-control-label">Date Reported:</label>
                <input type="datetime-local" id="reportedDate" value="${reportedDate}" class="form-control"
                    disabled />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Violation: (Ex.
                    Stolen)</label>
                <input type="text" id="recordType" value="${recordType}" 
                    class="form-control" disabled />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Plate Number:</label>
                <input type="text" id="plateNumber" value="${plateNumber} "
                    class="form-control" disabled />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Engine Number (if any):</label>
                <input type="text" id="engineNumber" 
                    class="form-control" value="${engineNumber}" disabled>
            </div>
            <div class="form-group">
                <label class=" form-control-label">Chassis Number (if any):</label>
                <input type="text" id="chassisNumber" 
                    class="form-control" value="${chassisNumber}" disabled>
            </div>
            <div class="form-group">
                <label class=" form-control-label">Maker: (Ex.Toyota)</label>
                <input type="text" id="maker" value="${maker} " class="form-control"
                disabled />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Series Type:
                    (Ex.Vios)</label>
                <input type="text" id="seriesType" value="${seriesType} "
                    class="form-control" disabled />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Vehicle Type: (Ex.
                    Van,Car)</label>
                <input type="text" id="vehicleType"  value="${vehicleType}"
                    class="form-control" disabled />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Vehicle Color: </label>
                <input type="text" id="vehicleColor" value="${vehicleColor} "
                    class="form-control" disabled />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Owner's Name:
                </label>
                <input type="text" id="ownerName" value="${ownerName} "
                    class="form-control" disabled />
            </div>
            <div class="form-group">
                <label class=" form-control-label">Owner's Contact Number (if any):
                </label>
                <input type="text" id="ownerNumber" class="form-control" value="${ownerNumber}"
                      disabled/>
            </div>
            <div class="form-group">
                <label class=" form-control-label">Date of Incident (if any):</label>
                <input type="datetime-local" id="incidentDate" class="form-control" value="${incidentDate}"
                disabled/>
            </div>
            
        </div>
    </div>
    <button class="au-btn au-btn--block au-btn--aqua m-b-20" onclick="confirmSolved()">
        Record Solved
    </button>

    `;


})

function confirmSolved() {
    var r = confirm("Do you want to proceed?");
    if (r == true) {
        recordSolved();
        alert("Record has been Solved.");
        window.location.replace("menu.html");

    }
}


function recordSolved() {
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var min = today.getMinutes();
    let dateToday = y + "-" + m + "-" + d + "T" + h + ":" + min;

    firebase.database().ref("Vehicles/" + viewRecord).once('value', function (snapshot) {

        var vehicleRecord = snapshot.val();
        localStorage.setItem("vehicleRecord", JSON.stringify(vehicleRecord));
        var jsonString = localStorage.getItem("vehicleRecord");
        var recordData = JSON.parse(jsonString);
        var historyReportedDate = recordData.reportedDate;
        var historyRecordType = recordData.violation;
        var historyPlateNumber = recordData.plateNumber;
        var historyEngineNumber = recordData.engineNumber;
        var historyChassisNumber = recordData.chassisNumber;
        var historyMaker = recordData.maker;
        var historySeriesType = recordData.model;
        var historyVehicleType = recordData.type;
        var historyVehicleColor = recordData.color;
        var historyOwnerName = recordData.owner;
        var historyOwnerNumber = recordData.contactNum;
        var historyIncidentDate = recordData.incidentDate;


        firebase.database().ref("History").child(viewRecord).set({
            dateCaught: dateToday,
            reportedDate: historyReportedDate,
            violation: historyRecordType,
            plateNumber: historyPlateNumber,
            engineNumber: historyEngineNumber,
            chassisNumber: historyChassisNumber,
            maker: historyMaker,
            model: historySeriesType,
            type: historyVehicleType,
            color: historyVehicleColor,
            owner: historyOwnerName,
            contactNum: historyOwnerNumber,
            incidentDate: historyIncidentDate,
            caughtBy: getUserBadgeNumber
        });
        firebase.database().ref("Vehicles").child(viewRecord).remove();
    })



}





