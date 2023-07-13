function getnotifications() {
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');
  console.log(token)
  console.log(ID);
  fetch(`http://127.0.0.1:8000/api/meeting-initiator/notifications/${ID}`, {
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
        let content = `
          <div class="card cardu">
            <div class="card-body">
              <blockquote class="blockquote mb-0"  style="font-family: 'Amiri', serif;">
              <p>يدعوكم  ${notification.initiator.name} لحضور اجتماع ${notification.meeing.meetingtype} ,وذلك في تمام الساعه/ ${notification.meeing.startedtime} ,الموافق/ ${notification.meeing.date} ,في/ ${notification.meeing.location}</p>
            </blockquote>
            </div>
          </div>`
        document.getElementById("notificationtable").innerHTML += content;
      }
    })
    .catch(error => {
      console.error('Error in Notification:', error);
    });
}
