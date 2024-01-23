function displayUserData(userData) {
    // Update Student Information
    document.getElementById("en_name").textContent = "Name (EN): " + userData['English Full Name / ชื่อ-นามสกุลภาษาอังกฤษ'];
    document.getElementById("th_name").textContent = "Name (TH): " + userData['Thai Full Name / ชื่อ-นามสกุลภาษาไทย'];
    document.getElementById("stu_id").textContent = "Student ID: " + userData['Student ID / รหัสนักศึกษา'];
    document.getElementById("stu_email").textContent = "Email: " + userData['ที่อยู่อีเมล'];
  
    // Update Simulation Test
    document.getElementById("pre_listening").textContent = "Listening: " + userData['PRE_LISTENING'];
    document.getElementById("pre_reading").textContent = "Reading: " + userData['PRE_READING'];
    var preTotal = parseInt(userData['PRE_LISTENING']) + parseInt(userData['PRE_READING']);
    document.getElementById("pre_total").textContent = "Total: " + preTotal;
  
    // Update Post-Test
    document.getElementById("post_listening").textContent = "Listening: " + userData['POST_LISTENING'];
    document.getElementById("post_reading").textContent = "Reading: " + userData['POST_READING'];
    var postTotal = parseInt(userData['POST_LISTENING']) + parseInt(userData['POST_READING']);
    document.getElementById("post_total").textContent = "Total: " + postTotal;
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
    (err) => console.error(err.code, err.message)
  );
  
