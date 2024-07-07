document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
        alert("No authentication token found. Redirecting to login page.");
        window.location.href = "pages/login.html";
        return;
      }

    // Add event listener to the logout button
    document.getElementById('logoutBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action (e.g., following the link)
        logout();
    });
});

//function logout(jwtToken) {
    // $.ajax({
    //     url: Constants.get_api_base_url() + 'rest/logout', // Ensure this is the correct URL
    //     method: 'POST', // Ensure the server is set to handle POST requests at this endpoint
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authentication': `${jwtToken}` // Usually, the token is sent as a Bearer token
    //     },
    //     success: function(response) {
    //         // Logout successful, clear local storage and redirect to login page
    //         localStorage.removeItem('token'); // Remove JWT token from local storage
    //         window.location.href = 'pages/login.html'; // Redirect to login page
    //     },
    //     error: function(jqXHR, textStatus, errorThrown) {
    //         // Logout failed, handle the error
    //         console.error('Logout failed:', textStatus, errorThrown);
    //         alert('Logout failed. Please try again.');
    //     }
    // });
// }
    function logout() {
        RestClient.post('rest/logout', {}, function(response) {
            // Clear token from local storage
            Utils.logout('token');
            // Redirect to login page
            window.location.href = 'pages/login.html';
        }, function(error) {
            // Handle error (e.g., show an error message)
            console.error('Logout failed:', error);
            toastr.error('Logout failed. Please try again.');
        });
    }

// Prevent users from using the back button after logging out
window.onpopstate = function(event) {
    if (!localStorage.getItem('token')) {
        window.location.href = 'pages/login.html'; // Redirect to login page if no token
    }
};
