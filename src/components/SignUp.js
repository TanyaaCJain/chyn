import React, { useEffect } from "react";

const SignUp = () => {
    useEffect(() => {
        window.location.href = 'https://chyn.auth.us-west-2.amazoncognito.com/signup?client_id=3icgql8voiksvahktfv8th4i19&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fchyn.tanya-jain.xyz%2Fauthorize-client'
    }, []);
    return (
        <div>
            <h1>Redirecting to Sign Up Page...</h1>
        </div>
    );
}

export default SignUp;