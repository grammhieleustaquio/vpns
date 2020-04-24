
let viewHistory = localStorage.getItem("viewHistory");
let getUserBadgeNumber = localStorage.getItem("username");
if (viewHistory == null) {
    window.location.replace("menu.html");
}

firebase.database().ref("History/" + viewHistory).once('value', function (snapshot) {

    let dateCaughtRaw = snapshot.child('dateCaught').val();
    var str = dateCaughtRaw;
    dateCaught = str.replace("T", " ");
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
    let caughtBy = snapshot.child('caughtBy').val();

    document.getElementById("viewHistoryForm").innerHTML =
        `
    <div class="card">
        <div class="card-header">
            <strong>RECORD SOLVED:</strong>
        </div>
        <div class="card-body card-block">
            <div class="form-group">
                <label class=" form-control-label">Date Solved:</label>
                <input type="text" id="dateCaught" value="${dateCaught}" class="form-control"
                    disabled />
            </div>
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
            <div class="form-group">
                <label class=" form-control-label">Officer:</label>
                <input type="text" id="reportedDate" value="${caughtBy}" class="form-control"
                    disabled />
            </div>
            
        </div>
    </div>

    `;


})






