function addplace() {
    place = document.getElementById('textinput').value;
    var token = localStorage.getItem('token');
    var ID = localStorage.getItem('notifiy');

    console.log(ID);
    console.log(place)
    fetch('http://127.0.0.1:8000/api/admin/addPlace', {
        method: 'POST',
        body: JSON.stringify({
            "adminid": ID,
            "placename": place
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {

                alert("تم اضافة " + place + " بنجاح")
                form.reset();
            }
        }).catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
}
function getplaces() {
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/admin/places`, {
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
            document.getElementById("Location2").innerHTML = "";
            for (place of data) {
                let content = `<option value=${place.id}> ${place.placename}</option>`
                document.getElementById("Location2").innerHTML += content;
            }
        })
}

function fun() {
    selectElement = document.getElementById('Location2');
    placeId = selectElement.value;
    console.log(placeId);
    const form = document.getElementById('admin-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const button = document.getElementById('butt');
        const result = window.confirm("هل تريد مسح هذه القاعه؟");
        if (result) {
            button.addEventListener('click', deleteplace(placeId));
            console.log("Delete confirmed");
        } else {
            console.log("Delete canceled");
        }
    })
}
// Define the specific function to be called

function deleteplace(placeId) {

    var token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:8000/api/admin/deletePlace/${placeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                // User successfully deleted
                console.log(`place with ID ${placeId} deleted.`);
                // window.location.reload()
            } else {
                // Handle error case
                console.error('Failed to delete place.');
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Network error occurred.', error);
        });
}