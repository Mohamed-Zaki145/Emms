function adddept() {
    dept = document.getElementById('textinput').value;
    console.log(dept)
    var token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/api/admin/addAdminstration', {
        method: 'POST',
        body: JSON.stringify({
            "name": dept
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                alert("تم اضافة " + dept + " بنجاح")
            }
        }).catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
}
function getdepartments() {
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/admin/Meetingtype`, {    /// ناقصه api
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the response as JSON and return another Promise
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("dept").innerHTML = "";
            for (dept of data) {
                let content = `<option value=${dept.id}> ${dept.name}</option>`
                document.getElementById("dept").innerHTML += content;
            }
        })
}

function fun() {
    selectElement = document.getElementById('dept');
    deptId = selectElement.value;
    console.log(deptId);
    const form = document.getElementById('admin-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const button = document.getElementById('butt');
        const result = window.confirm("هل تريد مسح هذا القسم");
        if (result) {
            button.addEventListener('click', deletedept(deptId));
            console.log("Delete confirmed");
        } else {
            console.log("Delete canceled");
        }
    })
}
// Define the specific function to be called

function deletedept(deptId) {

    var token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:8000/api/admin/deleteAdminstration/${deptId}`, {
        method: 'DElETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                // User successfully deleted
                console.log(`dept with ID ${deptId} deleted.`);
                // window.location.reload()
            } else {
                // Handle error case
                console.error('Failed to delete meetingtype.');
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Network error occurred.', error);
        });
}