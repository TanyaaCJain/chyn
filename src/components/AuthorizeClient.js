import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthorizeClient = () => {
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        console.log('hash', hash); // 'access_token=...&scope=...&id_token=...&token_type=...&expires_in=...
        const params = new URLSearchParams(hash);
        console.log('params', params);

        const idToken = params.get('id_token');
        console.log('idToken', idToken);
        const accessToken = params.get('access_token');
        console.log('accessToken', accessToken);

        if (idToken && accessToken) {
            const decoded = jwtDecode(idToken);
            const userId = decoded['sub'];
            localStorage.setItem('userId', userId);
        }
        console.log('Page rendered');

        // const tokens = parseCognitoTokens(window.location.hash);
        // const idToken = tokens['id_token'];
        // const accessToken = tokens['access_token'];
        

        // Store tokens in local storage or state management
        // localStorage.setItem('idToken', idToken);
        // localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('userId', decoded['sub']);

        // Redirect to home or another page after successful login
        window.location.href = '/';
    }, []);

  return (
    <div>Loading...</div>
  );
};

export default AuthorizeClient;