const form = document.getElementById('createsubjectform');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const link = document.getElementById('link').value;
    const description = document.getElementById('description').value;
    const subjecttype = document.getElementById('subjecttype').value;
    console.log(link);
    console.log(description)
    if (subjecttype == "") {
        return alert("برجاء ادخال نوع الموضوع")
    }
    if (description == "") {
        return alert("برجاء ادخال الموضوع")
    }

    var token = localStorage.getItem('token');
    var Id = localStorage.getItem('notifiy')
    // add subject
    fetch('http://127.0.0.1:8000/api/subjectController/create-subject', {
        method: 'POST',
        body: JSON.stringify({
            "userid": Id,
            "description": description,
            "attachmentlink": link,
            "subjecttype": subjecttype
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
})
