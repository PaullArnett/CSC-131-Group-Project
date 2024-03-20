function checkLoginAndRedirect() {
    // Retrieve the isLoggedIn value or default to 'false' if the key is missing
    const isLoggedIn = localStorage.getItem('loggedIn') || 'false';
    console.log(isLoggedIn);
    // Redirect to the login page if isLoggedIn is not 'true'
    if (isLoggedIn !== 'true') {
        const restrictedUrls = [
            '/VW/apply',
            '/VW/apply.html',
            '/VW/userinfo.html',
            '/VW/userinfo',
        ];
        const currentPage = window.location.pathname;
        if (restrictedUrls.includes(currentPage)) {
            window.location.href = '/VW/login.html'; // Redirect to the login page
        }
    }
}

document.addEventListener('DOMContentLoaded', checkLoginAndRedirect);
