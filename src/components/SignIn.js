import React, { useEffect } from "react";

const SignIn = () => {
    useEffect(() => {
        window.location.href = 'https://chyn.auth.us-west-2.amazoncognito.com/login?client_id=3icgql8voiksvahktfv8th4i19&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fchyn.tanya-jain.xyz%2Fsecure-page'
    }, []);
    return (
        <div>
            <h1>Redirecting to Sign In Page...</h1>
        </div>
    );
}

export default SignIn;