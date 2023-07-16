function update() {
    selectElement = document.getElementById('edit');
    editvalue = selectElement.value;
    var token = localStorage.getItem('token');
    var editid = localStorage.getItem('upatedid')
    console.log(editid)
    console.log(token)

    fetch(`http://127.0.0.1:8000/api/admin/UpdateUSER/${editid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "role":editvalue,
            // "adminstrationid": deptid
        }),
    }).then(response => {
        if (response.ok) {
            alert("تم تعديل المستخدم بنجاج")
        } else {
            // Handle error case
            console.error('هناك خطاء في تعديل المستخدم');
        }
    })
}