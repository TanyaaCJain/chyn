import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthorizeClient = () => {
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const idToken = params.get('id_token');
        const accessToken = params.get('access_token');

        if (idToken && accessToken) {
            const decoded = jwtDecode(idToken);
            const userId = decoded['sub'];
            localStorage.setItem('userId', userId);
        }
        window.location.href = '/';
    }, []);

  return (
    <div>Loading...</div>
  );
};

export default AuthorizeClient;