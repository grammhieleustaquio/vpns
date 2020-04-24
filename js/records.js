var currentUser = localStorage.getItem("username");

firebase.database().ref("Vehicles/").once('value', function (snapshot) {
    var content = "";
    var contentPDF = "";
    snapshot.forEach(function (child) {
        var val = child.val();
        var str = val.reportedDate;
        var reportedDate = str.slice(0, 10);
        var str2 = val.incidentDate;
        var incidentDate = str2.slice(0, 10);

        if (currentUser == "ADMIN") {
            content += `
            <tr>
                <td>${reportedDate}</td>
                <td>${val.plateNumber}</td>
                <td>${val.violation}</td>
                <td>
                    <button class="btn btn-success btn-sm" id="${val.plateNumber}" onclick=editThisRecord(this.id)><i class="fa fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" id="${val.plateNumber + "x"}" onclick=deleteThisRecord(this.id)><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `;



            document.getElementById("tableBody").innerHTML = content;
        } else {
            content += `
            <tr>
                <td>${reportedDate}</td>
                <td>${val.plateNumber}</td>
                <td>${val.violation}</td>
                <td>
                    <button class="btn btn-success btn-sm" id="${val.plateNumber}" onclick=viewThisRecord(this.id)><i class="fa fa-folder-open"> VIEW</i></button>
                </td>
            </tr>
        `;


            document.getElementById("tableBody").innerHTML = content;
        }

        contentPDF += `
        <tr>
            <td>${reportedDate}</td>
            <td>${val.violation}</td>
            <td>${val.plateNumber}</td>
            <td>${val.engineNumber}</td>
            <td>${val.chassisNumber}</td>
            <td>${val.maker}</td>
            <td>${val.model}</td>
            <td>${val.type}</td>
            <td>${val.color}</td>
            <td>${val.owner}</td>
            <td>${val.contactNum}</td>
            <td>${incidentDate}</td>
        </tr>
    `; document.getElementById("pdfBody").innerHTML = contentPDF;




    })
    $(document).ready(function () {
        $('#example').DataTable(
            {
                "order": [[0, "desc"]]
            });

    });


})
function deleteThisRecord(deletePlateNumber) {
    var newStr = deletePlateNumber.substring(0, deletePlateNumber.length - 1);
    var r = confirm("Delete this Record?\nPlate Number: " + newStr);
    if (r == true) {
        firebase.database().ref("Vehicles").child(newStr).remove();
        window.location.href = "records.html";
        alert("Plate Number: " + newStr + "\nRecord Successfully Deleted")
    }

}


function editThisRecord(userPlateNumber) {
    localStorage.setItem("editRecord", userPlateNumber);
    window.location.href = "editRecords.html";
}

function viewThisRecord(userPlateNumber) {
    localStorage.setItem("viewRecord", userPlateNumber);
    window.location.href = "viewRecords.html";
}

function createPDF() {
    var sTable = document.getElementById('pdfTable').innerHTML;

    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 2px #DDD; border-collapse: collapse;";
    style = style + "padding: 5px 5px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=1000');

    win.document.write('<html><head>');
    win.document.write('<title>RECORDS</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
}
