function displayUserData(userData) {
    var userDataContainer = document.getElementById('userDataContainer');
    userDataContainer.innerHTML = '';
  
    if (userData.hasOwnProperty('stu_id')) {
      // Display user data in a table
      var table = document.createElement('table');
      var headers = Object.keys(userData);
  
      for (var i = 0; i < headers.length; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
  
        cell1.textContent = headers[i];
        cell2.textContent = userData[headers[i]];
      }
  
      userDataContainer.appendChild(table);
    } else {
      // User not found
      userDataContainer.textContent = 'User not found';
    }
  }
  
  async function runApp() {
    try {
      const profile = await liff.getProfile();
      const line_userId = profile.userId;
  
      var apiUrl = 'https://script.google.com/macros/s/AKfycbyORnSxMGZf3o90on0M0xHjRCT_pfDvNKuvvbmPOzs19Blx9t-Z_0SKhXUcP7w80c3g3Q/exec'; // Replace with the actual URL of your deployed web app
  
      fetch(apiUrl + '?userlineid=' + line_userId)
        .then(response => response.json())
        .then(data => displayUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
  
      // Rest of your code
      // document.getElementById("line_userId").value = profile.userId;
      // document.getElementById("displayName").value = profile.displayName;
    } catch (err) {
      console.error(err);
    }
  }
  
  liff.init(
    { liffId: "2002580879-qJ4k4gVe" },
    async () => {
      if (liff.isLoggedIn()) {
        await runApp();
      } else {
        liff.login();
      }
    },
    (err) => console.error(err.code, error.message)
  );
  
