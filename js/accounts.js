

firebase.database().ref("Users/").once('value', function (snapshot) {
    var content = "";
    snapshot.forEach(function (child) {
        var val = child.val();
        content += `
        <tr>
            <td>${val.badgeNumber}</td>
            <td>${val.name}</td>
            <td>
                <button class="btn btn-success btn-sm" id=${val.badgeNumber} onclick=editThisAccount(this.id)><i class="fa fa-edit"> </i></button>
                <button class="btn btn-danger btn-sm" id=${val.badgeNumber + "x"} onclick=deleteThisAccount(this.id)><i class="fa fa-trash"> </i></button>
            </td>
        </tr>
    `;



    })
    document.getElementById("tableBody").innerHTML = content;
    $(document).ready(function () {
        $('#example').DataTable(
            {
                "order": [[0, "asc"]]
            });

    });

})
function deleteThisAccount(deleteBadgeNumber) {
    var newStr = deleteBadgeNumber.substring(0, deleteBadgeNumber.length - 1);
    var r = confirm("Delete this Account?\nBadge Number: " + newStr);
    if (r == true) {
        firebase.database().ref("Users/" + newStr).remove();
        window.location.href = "accounts.html";
        alert("Badge Number: " + newStr + "\nAccount Successfully Deleted")
    }


}


function editThisAccount(userBadgeNumber) {
    localStorage.setItem("editAccount", userBadgeNumber);
    window.location.href = "editAccount.html";
}


