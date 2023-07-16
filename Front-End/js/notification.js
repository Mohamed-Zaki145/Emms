// var container1 = document.getElementById("meetingtable");
// var notificationTable = document.getElementById("notificationtable");
// for(var i =1; i<=8 ;i++)
// {

// var card = document.createElement("div");
// card.className = "card cardu";

// var cardBody = document.createElement("div");
// cardBody.className = "card-body";

// var blockquote = document.createElement("blockquote");
// blockquote.className = "blockquote mb-0";

// var paragraphs = [`من :${i}`, "عن :", "مكان :", "الموافق :","وقت الاجتماع :"];
// paragraphs.forEach(function(text) {
//   var paragraph = document.createElement("label");
//   var br = document.createElement("br");
//   paragraph.textContent = text;
//   blockquote.appendChild(paragraph);
//   blockquote.appendChild(br);
// });

// cardBody.appendChild(blockquote);

// card.appendChild(cardBody);

// notificationTable.appendChild(card);
// }
// for(var i = 1; i<=8 ; i++)
// {
// var row = document.createElement("div");
// row.className = "row";
// row.id= `r${i}`;
// var col1 = document.createElement("div");
// col1.className = "col-md-3";
// var card1 = document.createElement("div");
// card1.className = "card border-0 h-100";
// var cardBody1 = document.createElement("div");
// cardBody1.className = "card-body";
// var link1 = document.createElement("a");
// link1.className = "btn btn-transparent";
// link1.href = "btn1.html";
// link1.style.backgroundColor = "transparent";
// link1.style.border = "0px";
// var img1 = document.createElement("img");
// img1.src = "img/file.png";
// img1.height = "50";
// img1.width = "50";
// link1.appendChild(img1);
// cardBody1.appendChild(link1);
// card1.appendChild(cardBody1);
// col1.appendChild(card1);
// row.appendChild(col1);

// var col2 = document.createElement("div");
// col2.className = "col-md-6";
// var card2 = document.createElement("div");
// card2.className = "card border-0 h-100";
// var cardBody2 = document.createElement("div");
// cardBody2.className = "card-body";
// var texts = [`عن: ${i}`, "من :"];
// texts.forEach(function(text) {
//   var cardText = document.createElement("p");
//   cardText.textContent = text;
//   cardText.className = "card-text";
//   cardText.style.textAlign = "right";
//   cardBody2.appendChild(cardText);
// });
// card2.appendChild(cardBody2);
// col2.appendChild(card2);
// row.appendChild(col2);

// var col3 = document.createElement("div");
// col3.className = "col-md-3";
// var card3 = document.createElement("div");
// card3.className = "card border-0 h-100";
// var cardBody3 = document.createElement("div");
// cardBody3.className = "card-body";
// var button = document.createElement("button");
// button.style.backgroundColor = "transparent";
// button.style.border = "0px";
// button.addEventListener("click", function() {
//     confirmRemoveRow(this);
//   });
// var img2 = document.createElement("img");
// img2.src = "img/bin.png";
// img2.height = "25";
// img2.width = "25";
// button.appendChild(img2);
// cardBody3.appendChild(button);
// card3.appendChild(cardBody3);
// col3.appendChild(card3);
// row.appendChild(col3);

// container1.appendChild(row);

// var hr = document.createElement("hr");
// container1.appendChild(hr);
// }
// function confirmRemoveRow(button) {
//     var confirmed = confirm("هل انت متأكد من الغاء اجتماع؟");
//     if (confirmed) {
//       var row = button.closest(".row");
//       var hr = row.nextElementSibling; 
//       row.parentNode.removeChild(row);
//       if (hr.tagName === "HR") {
//         hr.parentNode.removeChild(hr);
//       }
//     }
//   }

// const attendContainer = document.getElementById('attendcontianer');

// for(var i =1; i<=8 ; i++)
// {
// const rowElement = document.createElement('div');
// rowElement.classList.add('row');
// rowElement.innerHTML = `
//   <div class="col-md-4">
//     <div class="card border-0 h-100">
//       <div class="card-body">
//         <img src="logos/avatar.png" height="70" width="70" alt="">
//       </div>
//     </div>
//   </div>
//   <div class="col-md-8">
//     <div class="card border-0 h-100">
//       <div class="card-body">
//         <p class="card-text" style="text-align:right;">القسم: <br> الاسم : ${i}</p>
//       </div>
//     </div>
//   </div>
// `;

// attendContainer.appendChild(rowElement);
// var hr = document.createElement("hr");
// attendContainer.appendChild(hr);
// }

// // async function getupcomingmeeting(){
// //   try{
// //   let result = await fetch('http://127.0.0.1:8000/api/upcoming-Meetings');
// //   console.log(await result.json());
// //   return result;
// //   }catch(reason){console.log(reason)}
// // }  
// // let first = await getupcomingmeeting();
// // console.log(first);
function getnotifications() {
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');
  console.log(token)
  console.log(ID);
  fetch(`http://127.0.0.1:8000/api/doctor/notifications/${ID}`, {
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

      document.getElementById("notificationtable").innerHTML = "";
      for (notification of data) {
        let mtype;
        var IDD=notification.meeing.meetingtypeid
        fetch(`http://127.0.0.1:8000/api/doctor/Meetingtype/${IDD}`, {
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
            mtype = data.name
            let content = `
              <div class="card cardu">
              <div class="card-body" class="forPlaces">
                <blockquote class="blockquote mb-0" style="font-family: 'Amiri', serif;">
                <p>يدعوكم  ${notification.initiator.name} لحضور اجتماع ${mtype} ,وذلك في تمام الساعه/
                ${notification.meeing.startedtime} ,الموافق/ ${notification.meeing.date} ,في/ ${notification.meeing.location}</p>
                </blockquote>
                <hr>
                <div class="col-5">
                  <div>
                    <button type="button" class="agenda" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                      محضر الاجتماع 
                    </button>
                    <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">الموضوع</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                              style="margin-left: 0;"></button>
                          </div>
                          <div class="modal-body">
                            <div class="container" id="">

                              <p class="card-text" style="text-align:right;">نوع الموضوع: </p>
                              <textarea placeholder="الموضوع" cols="57" rows="7" disabled>  </textarea>

                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="accept">
                      الموافقه
                    </button>
                    <button type="submit" class="reject">
                      الاعتذار عن الحضور
                    </button>
                  </div>
                </div>
              </div>
            </div>  `
            document.getElementById("notificationtable").innerHTML += content;
          })
      }
    })
    .catch(error => {
      console.error('Error in Notification:', error);
    });
}

function upcommingmeeting() {
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');
  console.log(token)
  console.log(ID);
  fetch(`http://127.0.0.1:8000/api/doctor/upcomingMeeting/${ID}`, {
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
      document.getElementById("upcomming").innerHTML = "";
      var IDD=data.meetingtypeid
        fetch(`http://127.0.0.1:8000/api/doctor/Meetingtype/${IDD}`, {
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
          .then(data1 => {
            // Process the retrieved data
            console.log(data1);
            mtype = data1.name
            let content = `
              <div class="left1Layer1">
                <label class="h2-1">
                  الاجتماعات القادمة
                </label>
                <label class="h3-1">
                  نوع الاجتماع: ${mtype}
                </label>
                <label class="h3-2">
                  المكان: ${data.location}
                </label>
                <label class="h3-3">
                  التاريخ: ${data.date}
                </label>
                <br>
                <label class="h3-4">
                  الساعه: ${data.startedtime}
                </label>
              </div>`
            document.getElementById("upcomming").innerHTML += content;})
    })
}
function acceptRequest(){

}
function rejectRequest(){
  
}
