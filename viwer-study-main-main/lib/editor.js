function f1() {
    //function to make the text bold using DOM method
    document.getElementById("codeEditor").style.fontWeight = "bold";
}

function f2() {
    //function to make the text italic using DOM method
    document.getElementById("codeEditor").style.fontStyle = "italic";
}

function f3() {
    //function to make the text alignment left using DOM method
    document.getElementById("codeEditor").style.textAlign = "left";
}

function f4() {
    //function to make the text alignment center using DOM method
    document.getElementById("codeEditor").style.textAlign = "center";
}

function f5() {
    //function to make the text alignment right using DOM method
    document.getElementById("codeEditor").style.textAlign = "right";
}

function f6() {
    //function to make the text in Uppercase using DOM method
    document.getElementById("codeEditor").style.textTransform = "uppercase";
}

function f7() {
    //function to make the text in Lowercase using DOM method
    document.getElementById("codeEditor").style.textTransform = "lowercase";
}

function f8() {
    //function to make the text capitalize using DOM method
    document.getElementById("codeEditor").style.textTransform = "capitalize";
}

function f9() {
    //function to make the text back to normal by removing all the methods applied
    //using DOM method
    document.getElementById("codeEditor").style.fontWeight = "normal";
    document.getElementById("codeEditor").style.textAlign = "left";
    document.getElementById("codeEditor").style.fontStyle = "normal";
    document.getElementById("codeEditor").style.textTransform = "capitalize";
    document.getElementById("codeEditor").value = " ";
}


// Function to send text to the API
function submitTextToAPI() {
    // Get the edited text from the textarea
    const editedText = document.getElementById("codeEditor").value;

    // Prepare the data to be sent in the POST request
    const data = {
        id: "650ecb30afb8887a5212decc",
        reportText: editedText,
    };

    // Make the POST request to the API
    fetch("http://localhost:8000/api/v2/savereports", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((responseData) => {
            // Handle the API response here if needed
            console.log("API response:", responseData);

            // Close the modal if the request was successful
            $('#myModal').modal('hide');
        })
        .catch((error) => {
            // Handle errors here
            console.error("Error:", error);
        });
}

// Text editing functions (f1(), f2(), ..., f9()) can be defined here as needed

function openHalfSizeWindow() {
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;
    const newWidth = (screenWidth / 2) + 10;
    const newHeight = screenHeight;

    // Calculate the left and top positions for the two windows
    const left1 = -10;
    const top1 = 0;
    const left2 = newWidth;
    const top2 = 0;

    // Open the first window
    window.open('index.html', '_blank', `width=${newWidth},height=${newHeight},left=${left1},top=${top1}`);
    // window.open('https://user-newdemo.vercel.app/user/reports/4009', '_blank', `width=${newWidth-30},height=${newHeight},left=${left2},top=${top2}`);
    window.open('http://localhost:4001/user/reports/4009', '_blank', `width=${newWidth - 30},height=${newHeight},left=${left2},top=${top2}`);
}
