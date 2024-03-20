function checkbutton() {
    // Retrieve the 'loggedIn' value from localStorage
    const loggedIn = localStorage.getItem('loggedIn');

    // Get the user button and hidden titles
    const userButton = document.getElementById('userButton');
    const titleHidden1 = document.getElementById('update') || null;
    const titleHidden2 = document.getElementById('signout');

    console.log('userButton:', userButton);
    console.log('titleHidden1:', titleHidden1);
    console.log('titleHidden2:', titleHidden2);

    // Function to show titles
    function showTitles() {
        if (titleHidden1 && titleHidden2) {
            titleHidden1.style.display = 'block';
            titleHidden2.style.display = 'block';
        } else {
            console.error('One or more titleHidden elements not found.');
        }
    }

    // Function to hide titles
    function hideTitles() {
        if (titleHidden1 && titleHidden2) {
            titleHidden1.style.display = 'none';
            titleHidden2.style.display = 'none';
        } else {
            console.error('One or more titleHidden elements not found.');
        }
    }

    hideTitles();

        // Check if the user is logged in
    if (loggedIn === 'true') {
        // If logged in, add a click event listener to the user button
        if (userButton) {
            userButton.addEventListener('click', function (event) {
                // Toggle titles visibility when the user button is clicked
                if (titleHidden1.style.display === 'none' && titleHidden2.style.display === 'none') {
                    showTitles();
                } else {
                    hideTitles();
                }

                // Prevent the click event from propagating to the document
                event.stopPropagation();
            });
        } else {
            console.error('userButton not found.');
        }

        // Add a click event listener to the document body
        document.body.addEventListener('click', function hideTitlesOutside() {
            // Hide the titles when the user clicks anywhere else on the page
            hideTitles();
        });
    } else {
        // If not logged in, redirect to the login page when the user button is clicked
        if (userButton) {
            userButton.addEventListener('click', function redirectToLogin() {
                window.location.href = 'login.html';
            });
        } else {
            console.error('userButton not found.');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkbutton();
});


// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    checkbutton();
});
