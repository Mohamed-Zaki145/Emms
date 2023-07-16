function send() {
    selectElement = document.getElementById('subjecttype');
    subjectid = selectElement.value;
    const description = document.getElementById('description').value;
    const file1 = document.getElementById('myFile1').value;
    const file2 = document.getElementById('myFile2').value;
    if (file2) {
        // here code for model
    } else {
        var token = localStorage.getItem('token');
        var Id = localStorage.getItem('notifiy')
        fetch('http://127.0.0.1:8000/api/meeting-initiator/create-subject', {
            method: 'POST',
            body: JSON.stringify({
                "userid": Id,
                "description": description,
                "attachmentlink": file1,
                "subjecttypeid": subjectid
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token

            },
        })
            .then(response => {
                if (response.ok) {

                    alert("تمت اضافة الموضوع بنجاح")
                } else {
                    alert("لم يتم اضافة الموضوع")
                }
            })
        form.reset();
    }


}


function displaySubjetsType() {
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/Subjecttype`, {
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
            document.getElementById("subjecttype").innerHTML = "";
            for (subjectty of data) {
                let content = `<option value=${subjectty.id}> ${subjectty.name}</option>`
                document.getElementById("subjecttype").innerHTML += content;
            }
        })
}