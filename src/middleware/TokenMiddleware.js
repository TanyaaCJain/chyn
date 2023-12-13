// export const tokenMiddleware = (next) => {
//     // const idToken = localStorage.getItem('idToken');
//     // const accessToken = localStorage.getItem('acessToken');
//     const userId = localStorage.getItem('userId');

//     if (!userId) {
//         // Handle the case where the token is not set
//         // For example, redirect to login page
//         window.location.href = '/login';
//         return;
//     }
//     // if (accessToken) {
//     //     // Set Authorization header for all requests
//     //     // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//     //     // console.log(accessToken);
//     //     // This also helps in session management. One can get the right user for it.
//     //     // and maintain the session.

//     //     // If no user is received, redirect to login page
//     // }
    

//     // Optional: Validate the token's integrity here if necessary

//     // If the token is set (and valid), proceed to the next operation
//     next();
// };