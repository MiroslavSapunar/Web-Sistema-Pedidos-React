import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId = process.env.REACT_APP_GOOGLE_ID;

function GButtonLogin() {
    
    const onSuccess = (res) => {
        console.log('current User:', res.profileObj);
        console.log('current Token:', res.tokenObj);
        
        //alert(
        //    `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        //);
        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
        );
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Iniciar session con Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

export default GButtonLogin;