const popup2 = document.getElementById("popup2");

// Get the "Go Back" button by its ID
var backButton = document.getElementById("submitButton");
backButton.addEventListener("click", function () {
    window.location.href = "https://lin.ee/MGewJgF";
});

function displayUserData(userData) {
    console.log(userData);
    // Update Student Information
    document.getElementById("en_name").innerHTML = "<strong>Name (EN): </strong>" + userData['en_name'];
    document.getElementById("th_name").innerHTML = "<strong>Name (TH): </strong>" + userData['th_name'];
    document.getElementById("stu_id").innerHTML = "<strong>Student ID: </strong>" + userData['stu_id'];
    document.getElementById("stu_email").innerHTML = "<strong>Email: </strong>" + userData['stu_email'];

    // Update Simulation Test
    document.getElementById("pre_listening").innerHTML = "<strong>Listening: </strong>" + userData['pre_listening'];
    document.getElementById("pre_reading").innerHTML = "<strong>Reading: </strong>" + userData['pre_reading'];
    var preTotal = parseInt(userData['pre_listening']) + parseInt(userData['pre_reading']);
    document.getElementById("pre_total").innerHTML = "<strong>Total: </strong>" + preTotal;

    // Update Post-Test
    document.getElementById("post_listening").innerHTML = "<strong>Listening: </strong>" + userData['post_listening'];
    document.getElementById("post_reading").innerHTML = "<strong>Reading: </strong>" + userData['post_reading'];
    var postTotal = parseInt(userData['post_listening']) + parseInt(userData['post_reading']);
    document.getElementById("post_total").innerHTML = "<strong>Total: </strong>" + postTotal;

    var qrcode = new QRCode("qrcode",userData['stu_email']);

    popup2.classList.add("d-none");
}

async function runApp() {
    try {
        const profile = await liff.getProfile();
        var line_userId = profile.userId;
        var displayName = profile.displayName;

        var apiUrl = 'https://script.google.com/macros/s/AKfycbyORnSxMGZf3o90on0M0xHjRCT_pfDvNKuvvbmPOzs19Blx9t-Z_0SKhXUcP7w80c3g3Q/exec'; // Replace with the actual URL of your deployed web app

        fetch(apiUrl + '?userlineid=' + line_userId)
            .then(response => response.json())
            .then(data => displayUserData(data))
            .catch(error => {
                console.error('Error fetching user data:', error);
                // Redirect to another page in case of an error
                window.location.href = 'https://liff.line.me/2002580879-lYQ3Q9VL'; // Replace 'error-page.html' with the actual URL of your error page
            });
    } catch (error) {
        console.error('Error getting LINE profile:', error);
        // Redirect to another page in case of an error
        window.location.href = 'https://liff.line.me/2002580879-lYQ3Q9VL';
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
