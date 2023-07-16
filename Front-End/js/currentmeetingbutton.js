function getdoctors() {
    var token = localStorage.getItem('token');
    fetch(``, {
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
            // Process the retrieved data
            console.log(data);
            document.getElementById("doctors").innerHTML = "";
            for (doctor of data) {
                let content = `<div class="row formayainshallah">
            <div class="col-md-3">
              <div class="card border-0 h-100">
                <div class="card-body">
                  <img src="logos/avatar.png" height="70" width="70" alt="">
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="card border-0 h-100">
                <div class="card-body">
                  <p class="card-text" style="text-align:right;">القسم: نظم معلومات<br>الاسم: حسام الدين حسن حامد </p>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card border-0 h-100">
                <div class="card-body">
                  <input class="chbox" type="checkbox" id=${doctor.id} name="Doc1" value="Doc1">
                </div>
              </div>
            </div>
          </div>
          <hr>`

            document.getElementById("doctors").innerHTML += content;
            }
        })
}

function getsubjects(){
    var token = localStorage.getItem('token');
    fetch(``, {
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
            // Process the retrieved data
            console.log(data);
            document.getElementById("subjects").innerHTML = "";
            for (subject of data) {
                let content = `<div class="carousel-item active">
                <div class="linkat">
                  <label>المرفقات :</label>
                  <a href="#">www.clickhereonthelink.com</a>
                </div>
                <input id="type" style="margin-bottom: 3%; margin-top: 3%; border-radius: 5px; width: 40%;"
                  placeholder="نوع الموضوع" readonly>
                <textarea name="Subject" placeholder="موضوع 1" id="" cols="100" rows="14" disabled></textarea>
                <textarea name="Decision" placeholder=" قرار 1" id=${subject.id} cols="100" rows="7"></textarea>
                <button class="carousel-control-next" style="right: -100px;" onclick="click(${subject.id})" type="button"
                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon"
                        style="background-color: black;padding: 20px; border-radius: 6px;" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                    </button>
                </div>`
            document.getElementById("subjects").innerHTML += content;
            }
        })
}

function click(id){
   var Decision = document.getElementById(id).value;
    console.log(Decision)
    if(Decision==""){
        return alert(" من فضلك ادخل القرار")
    }
    var token = localStorage.getItem('token');
    fetch(``, {
        method: 'POST',
        body: JSON.stringify({
            "meetingid": "jbj" ,
            "subjectid": "hvh" ,
            "decision":	Decision

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                alert("تم اضافة " + name + " بنجاح")
            }
        })

}

function attendees(){
    var checkb = document.querySelectorAll("input[name='Doc1']");
    var checkeddoc = [];
    checkb.forEach(function (checkbox) {
      if (checkbox.checked) {
        // var x = {"invitedid": checkbox.id, "meetingid":meid}
        checkeddoc.push(checkbox.id);
      }
    })
    var token = localStorage.getItem('token');
    fetch(``, {
        method: 'POST',
        body: JSON.stringify({
            "meetingid": "jbj" 
            

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                alert("تم اضافة " + name + " بنجاح")
            }
        })
}
