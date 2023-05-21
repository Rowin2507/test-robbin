document.addEventListener('DOMContentLoaded', function() {
  const nameInput = document.getElementById('name-input');
  const startButton = document.getElementById('start-button');
  const userList = document.getElementById('user-list');
  const clearButton = document.getElementById('clear-button');

  let users = []; // Store the list of users

// Function to update the user list
function updateUserList() {
  // Clear the existing user list
  userList.innerHTML = '';

  // Iterate through the users and add them to the list
  users.forEach((user) => {
    const listItem = document.createElement('li');
    listItem.textContent = user.name;

    const status = document.createElement('span');
    status.classList.add('study-status');
    status.textContent = user.isStudying ? 'Studying' : 'Not studying';

    if (user.hasWindowOpen) {
      status.classList.add('studying');
    } else {
      status.classList.remove('studying');
    }

    listItem.appendChild(status);
    userList.appendChild(listItem);
  });


}




  // Function to fetch the updated user list from the server
  function fetchUserList() {
    fetch('user.php')
      .then(response => response.json())
      .then(data => {
        users = data; // Update the users array

        updateUserList();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Function to clear the user list
  function clearUserList() {
    fetch('clear.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
 
        users = []; // Clear the users array
        updateUserList(); // Update the user list after clearing
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

// Function to handle visibility change per user
// function handleUserVisibilityChange(user) {
//   return function() {
//     if (document.hidden || document.msHidden || document.webkitHidden) {
//       // Window is not actively visible
//       user.hasWindowOpen = false;
//       // console.log("NIET ACTIEF");
//     } else {
//       // Window is actively visible
//       user.hasWindowOpen = true;
//       // console.log("WEL ACTIEF");
//     }

//     updateUserList();
//   };
// }






  // Add event listeners for visibility change per user
  // function addVisibilityChangeListeners() {
  //   users.forEach(user => {
  //     const handleVisibilityChange = handleUserVisibilityChange(user);
  //     document.addEventListener('visibilitychange', handleVisibilityChange);
  //   });
  // }

  
// Function to periodically check if the window is open per user
function checkWindowOpen() {

  


  if (!document.hidden) {
    console.log("WEL ZICHTBAAR");

    // users.forEach(user => {
    //     user.hasWindowOpen = true;
    //     user.isStudying = true;
    //     console.log(user);
    // });




        // user.hasWindowOpen = true;
        // user.isStudying = true;
        // console.log(user);

        
      

  


    
  } else {
    console.log("NIET ZICHTBAAR");

    // users.forEach(user => {
    //     user.hasWindowOpen = false;
    //     user.isStudying = false;
    //     console.log(user);
    // });




    // Function to update the JSON file
function updateJSONObject() {
  // Path to the JSON file
  const filePath = 'data.json';

  // ID of the object to update
  const objectIdToUpdate = "Mac";

  // New values for the object properties
  const updatedValues = {
    isStudying: false,
    hasWindowOpen: false
  };


  // Fetch the JSON file
  fetch(filePath)
    .then(response => response.json())
    .then(data => {
      // Locate the specific object to update
      const objectToUpdate = data.find(obj => obj.name == objectIdToUpdate);
      // const objectToUpdate = 1;

      // Check if the object was found
      if (!objectToUpdate) {
        console.error('Object not found.');
        return;
      } 

      // Update the properties of the object
      Object.assign(objectToUpdate, updatedValues);

      // Convert the updated data to JSON string
      const updatedJson = JSON.stringify(data, null, 2);

      // Create a new File object with the updated JSON string
      const updatedFile = new File([updatedJson], filePath, { type: 'application/json' });

      // Create a new FormData object and append the updated file
      const formData = new FormData();
      formData.append('file', updatedFile);

      // Send the updated JSON file to the server
      fetch(filePath, { method: 'POST', body: updatedFile })
        .then(response => {
          if (response.ok) {
            console.log('JSON file updated successfully.');
          } else {
            console.error('Error updating JSON file.');
          }
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}

// Call the function to update the JSON object
updateJSONObject();








    // user.hasWindowOpen = false;
    // user.isStudying = false;

      



    // users.forEach(user => {
    //   user.hasWindowOpen = false;
    //   user.isStudying = false;
      
    // });
    
  }





  updateUserList();

}


  // Call the checkWindowOpen function every second
  setInterval(checkWindowOpen, 1000);

  // Listen for start button click event
  startButton.addEventListener('click', () => {
    const name = nameInput.value.trim();

    // Check if the name is not empty
    if (name !== '') {
      const userData = {
        name: name,
        isStudying: true, // Initialize the study status as false
        hasWindowOpen: true // Initialize the window open status as false
      };

      // Send the user data to the server
      fetch('user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      // Disable the input field and start button
      nameInput.disabled = true;
      startButton.disabled = true;
    }
  });

  // Listen for clear button click event
  clearButton.addEventListener('click', () => {
    clearUserList();
  });

  // Fetch the initial user list when the page loads
  fetchUserList();

  // Function to fetch the updated user list from the server
function fetchUserList() {
  fetch('user.php')
    .then(response => response.json())
    .then(data => {
      users = data; // Update the users array
      updateUserList();

      // Call fetchUserList() again after a delay (e.g., 1 second)
      setTimeout(fetchUserList, 1000);
    })
    .catch(error => {
      console.error('Error:', error);

      // Retry the fetch after a delay (e.g., 5 seconds) in case of error
      setTimeout(fetchUserList, 5000);
    });
}
      
});
