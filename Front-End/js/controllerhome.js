// function loadsubjects() {
//   var ID = localStorage.getItem('notifiy');
//   var token = localStorage.getItem('token');
//   console.log(ID)

//   fetch(`http://127.0.0.1:8000/api/subjectController/subjects-for-controller/${ID}`, {
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer ' + token
//     }
//   })
//     .then((response) => response.json())
//     .then(data => {
//       // Process the retrieved data
//       console.log(data);
//       // document.getElementById("meetingcontainer2").innerHTML = "";
//       // var checkboxIds = [];
//       // var counter = 1;
//       // for(subject of data){
//       //   let content=`
//       //   <div className="card crdsize1">
//       //     <div className="card-body">
//       //       <blockquote className="blockquote mb-0 blockquote1">
//       //         <label1 for="${counter}">c${counter}</label1>
//       //         <br></br>
//       //         <label2 for="${counter}>الى:</label2>
//       //         <br></br>
//       //         <a href="controllerviewbtn.html" className="btn archive">تعديل</a>
//       //         <input type="checkbox" className="checkbox22" id=${counter}></input>
//       //       </blockquote>
//       //     </div>
//       //   </div>`
//       //   document.getElementById("meetingcontainer2").innerHTML += content;
//       //   checkboxIds.push(counter);
//       //   counter++;
//       // }

//       }
//     )

// }

// //--------------------------------------------------- 


// var checkboxIds = [];

// for (var i = 1; i <= 2; i++) {

//   var id = `c${i}`;

//   var card = document.createElement("div");
//   card.className = "card crdsize1";
//   var cardBody = document.createElement("div");
//   cardBody.className = "card-body";
//   var blockquote = document.createElement("blockquote");
//   blockquote.className = "blockquote mb-0 blockquote1";

//   var label1 = document.createElement("label");
//   label1.setAttribute("for", id);
//   label1.innerText = `${i}`;
//   blockquote.appendChild(label1);
//   blockquote.appendChild(document.createElement("br"));
//   var label2 = document.createElement("label");
//   label2.setAttribute("for", id);
//   label2.innerText = "الي:";
//   blockquote.appendChild(label2);
//   blockquote.appendChild(document.createElement("br"));

//   var link = document.createElement("a");
//   link.href = "controllerviewbtn.html";
//   link.className = "btn archive";
//   link.innerText = "تعديل";
//   blockquote.appendChild(link);
//   var checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.className = "checkbox22";
//   checkbox.id = id;
//   blockquote.appendChild(checkbox);

//   cardBody.appendChild(blockquote);

//   card.appendChild(cardBody);

//   var container = document.getElementById("meetingcontainer1");
//   container.appendChild(card);
//   checkboxIds.push(id);
// }

// checkboxIds.forEach(function (checkboxId) {
//   document.getElementById(checkboxId).addEventListener("change", function () {
//     handleCheckboxChange(checkboxId);
//   });
// });

// function handleCheckboxChange(checkboxId) {
//   var checkbox = document.getElementById(checkboxId);
//   var label = checkbox.parentNode.querySelectorAll("label");
//   var container = document.getElementById("meetingcontainer2");

//   if (checkbox.checked) {

//     var card = document.createElement("div");
//     card.className = "card crdsize2";
//     card.id = checkboxId;
//     var cardbody = document.createElement("div");
//     cardbody.className = "card-body";
//     var blockquote = document.createElement("blockquote");
//     blockquote.className = "blockquote mb-0";
//     var unorderedlist = document.createElement("ul");
//     unorderedlist.style = "list-style-type: none;";
//     var listItem1 = document.createElement("li");
//     var listItem2 = document.createElement("li");
//     listItem1.innerHTML = label[0].innerHTML;
//     unorderedlist.appendChild(listItem1);
//     listItem2.innerHTML = label[1].innerHTML;
//     unorderedlist.appendChild(listItem2);

//     blockquote.appendChild(unorderedlist);
//     cardbody.appendChild(blockquote);
//     card.appendChild(cardbody);
//     container.appendChild(card);
//   } else {
//     var cards = container.getElementsByClassName("card crdsize2");
//     for (var i = 0; i < cards.length; i++) {
//       if (cards[i].id === checkboxId) {
//         container.removeChild(cards[i]);
//         break;
//       }
//     }
//   }
// }

function getupcomingmeetings(){
    var token = localStorage.getItem('token');
    var Id = localStorage.getItem('notifiy')
    fetch(`http://127.0.0.1:8000/api/subjectController/upcomings/${Id}`, {
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
            document.getElementById("meetings").innerHTML = "";
            for (meeting of data) {
                let content = `<option value=${meeting.id}> ${meeting.meetingtype} / ${meeting.date}</option>`
                document.getElementById("meetings").innerHTML += content;
            }
        })
}

function showsubjects() {
    var token = localStorage.getItem('token');
    var Id = localStorage.getItem('notifiy')
    fetch(`http://127.0.0.1:8000/api/subjectController/Subjects/${Id}`, {
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
            document.getElementById("group").innerHTML = "";
            for (subject of data) {
                let content = `
                <div class="row">
                    <div class="col-md-9">
                    <div class="card border-0 h-100">
                        <div class="card-body"> 
                        <p class="card-text" style="text-align:right;">${subject.description}</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                            <input class="chbox" type="checkbox" 
                            name="subjects" id=${subject.id}>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                `
                document.getElementById("group").innerHTML += content;
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });

}

function selectedSubjects(){
    var selected = document.querySelectorAll("input[name='subjects']");
    var selectedSubjects = [];

    selectElement = document.getElementById('meetings');
    meetingid = selectElement.value;

    selected.forEach(function (checkbox) {
        if (checkbox.checked) {
            var x = { "meetingid":meetingid, "subjectid": checkbox.id, "decision":""}
            selectedSubjects.push(x);
        }
        
    })
    
    var token = localStorage.getItem('token');
    var Id = localStorage.getItem('notifiy')
    fetch(`http://127.0.0.1:8000/api/subjectController/addSubject-in-Meeting`, {
        method: 'POST',
        body: JSON.stringify(selectedSubjects),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token

        },
    })
        .then(response => {
            if (!response.ok) {

                alert("تمت اضافة الموضوع الى اجندة الاجتماع")
            }
        })
}
