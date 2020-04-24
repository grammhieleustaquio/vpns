var currentUser = localStorage.getItem("username");

firebase.database().ref("History/").once('value', function (snapshot) {
    var content = "";
    var contentPDF = "";
    snapshot.forEach(function (child) {
        var val = child.val();
        var str = val.reportedDate;
        var reportedDate = str.slice(0, 10);
        var str2 = val.incidentDate;
        var incidentDate = str2.slice(0, 10);
        var str3 = val.dateCaught;
        var dateCaught = str3.slice(0, -6);


        content += `
            <tr>
                <td>${dateCaught}</td>
                <td>${val.plateNumber}</td>
                <td>${val.caughtBy}</td>
                <td>
                    <button class="btn btn-success btn-sm" id="${val.plateNumber}" onclick=viewThisHistory(this.id)><i class="fa fa-folder-open"> VIEW</i></button>
                </td>
            </tr>
        `;


        document.getElementById("tableBody").innerHTML = content;


        contentPDF += `
        <tr>
            <td>${dateCaught}</td>
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
            <td>${val.caughtBy}</td>
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


function viewThisHistory(userPlateNumber) {
    localStorage.setItem("viewHistory", userPlateNumber);
    window.location.href = "viewHistory.html";
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
    win.document.write('<title>RECORDS SOLVED</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
}

