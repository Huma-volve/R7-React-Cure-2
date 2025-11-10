import { googleLogin } from "@/services/auth/Auth";
import type { AppDispatch } from "@/store/Store";
import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate } from "react-router";

const Google: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const onSuccess = (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            const idToken = credentialResponse.credential;
            dispatch(googleLogin({ idToken }));
            navigate("/");
        }
        console.log("11111111", credentialResponse);
    };

    const onError = () => {
        console.log('Login Failed');
    };

    return (
        <div className="flex justify-center w-full">
            <GoogleLogin
                width={1000}
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    );
};

export default Google;
