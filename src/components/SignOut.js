import React, { useEffect } from "react";

const SignOut = () => {
    useEffect(() => {
        localStorage.removeItem('userId');
        window.location.href = '/';
    }, []);
    return (
        <div>
            <h1>Redirecting to Sign In Page...</h1>
        </div>
    );
}

export default SignOut;