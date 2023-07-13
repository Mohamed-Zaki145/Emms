// const oldsubjectsContainer = document.getElementById('oldsubjects');

// for(var i=1;i<=8;i++)
// {
// // Create the card element
// const cardElement = document.createElement('div');
// cardElement.classList.add('col');
// cardElement.innerHTML = `
//   <div class="card cardArc h-100">
//     <div class="card-body">
//       <h5 class="card-title classSub">محتوى الموضوع : ${i} </h5>
//       <p class="card-text classMeet">اسم الاجتماع :</p>
//       <p class="card-text classDate">التاريخ :</p>
//     </div>
//     <br>
//     <!-- Button trigger modal -->
//     <a href="viewsubject.html" class="btn viewbtn">
//       عرض
//     </a>
//   </div><br>
// `;

// Append the card element to the "oldsubjects" container
// oldsubjectsContainer.appendChild(cardElement);}

function getsearch() {
  form = document.getElementById("arc").addEventListener("submit", function (event) {
    event.preventDefault();
    searchkeyword = document.getElementById("sea").value;
    console.log(searchkeyword)
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/search/${searchkeyword}`, {
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
        document.getElementById("oldsubjects").innerHTML = "";
        for (subject of data) {
          let content = `<div class="card cardArc h-100">
                <div class="card-body">
                  <h5 class="card-title classSub">محتوى الموضوع : ${subject.description}</h5>
                  <p class="card-text classMeet">نوع الموضوع : ${subject.subjecttype}</p>
                </div>
                <br>
                <!-- Button trigger modal -->
                <a href="viewsubject.html" class="btn viewbtn">
                  عرض
                </a>
              </div><br>`

          document.getElementById("oldsubjects").innerHTML += content;
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  })
}


// < !DOCTYPE html >
//   <html>
//     <head>
//       <title>Search Result Highlighting</title>
//       <style>
//         .highlight {
//           background - color: yellow;
//         font-weight: bold;
//     }
//       </style>
//       <script>
//         function highlightSearchResults() {
//       var searchTerm = document.getElementById('search-term').value;
//         var content = document.getElementById('content').innerHTML;
//         var highlightedContent = content.replace(
//         new RegExp(searchTerm, 'gi'),
//         '<span class="highlight">$&</span>'
//         );
//         document.getElementById('content').innerHTML = highlightedContent;
//     }</script>
//     </head>
//     <body>
//       <h1>Search Result Highlighting:</h1>
//       <input type="text" id="search-term" placeholder="Enter search term">
//         <button onclick="highlightSearchResults()">Search</button>
//         <div id="content">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula lacus, varius id enim non, lacinia tristique tortor. Sed at eros rhoncus, bibendum tortor quis, sagittis nunc. Integer sed varius orci, sit amet lobortis felis. Pellentesque tincidunt sem quis ultrices facilisis. Sed nec enim eget nunc efficitur venenatis. Donec lobortis mi quis pharetra consectetur. Donec consequat, massa ac euismod tempor, sem massa ultrices nisi, sed sagittis tellus velit nec ex.
//         </div>
//     </body>
//   </html>