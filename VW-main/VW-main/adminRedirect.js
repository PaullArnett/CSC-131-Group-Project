async function checkAdminAndRedirect() {
  // Retrieve the isLoggedIn value or default to 'false' if the key is missing
  const isLoggedIn = localStorage.getItem('loggedIn') || 'false';
  const userId = localStorage.getItem('googleId')
  console.log(isLoggedIn);
  let response = await fetch(`https://vast-wave-12355-e83778ef23ea.herokuapp.com/admin-check?userId=${userId}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        let adminStatus = await response.json(); // Parse JSON response
  // Redirect to the login page if isLoggedIn is not 'true'
  if (isLoggedIn !== 'true' && adminStatus.isAdmin !== true) {
      const restrictedUrls = [
          '/VW/admin',
          '/VW/admin.html',
          '/VW/admin/manage-events',
          '/VW/admin/manage-events.hmtl',
          '/VW/admin/event-creation.hmtl',
          '/VW/admin/event-creation.hmtl',
      ];
      const currentPage = window.location.pathname;
      if (restrictedUrls.includes(currentPage)) {
          window.location.href = '/VW/login.html'; // Redirect to the login page
      }
  }
}

document.addEventListener('DOMContentLoaded', checkAdminAndRedirect);
