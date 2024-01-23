const popup2 = document.getElementById("popup2");

function displayUserData(userData) {
    console.log(userData);
    // Update Student Information
    document.getElementById("en_name").textContent = "Name (EN): " + userData['en_name'];
    document.getElementById("th_name").textContent = "Name (TH): " + userData['th_name'];
    document.getElementById("stu_id").textContent = "Student ID: " + userData['stu_id'];
    document.getElementById("stu_email").textContent = "Email: " + userData['stu_email'];

    // Update Simulation Test
    document.getElementById("pre_listening").textContent = "Listening: " + userData['pre_listening'];
    document.getElementById("pre_reading").textContent = "Reading: " + userData['pre_reading'];
    var preTotal = parseInt(userData['pre_listening']) + parseInt(userData['pre_reading']);
    document.getElementById("pre_total").textContent = "Total: " + preTotal;

    // Update Post-Test
    document.getElementById("post_listening").textContent = "Listening: " + userData['post_listening'];
    document.getElementById("post_reading").textContent = "Reading: " + userData['post_reading'];
    var postTotal = parseInt(userData['post_listening']) + parseInt(userData['post_reading']);
    document.getElementById("post_total").textContent = "Total: " + postTotal;

    popup2.classList.add("d-none");
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
