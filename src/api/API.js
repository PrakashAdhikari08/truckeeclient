import Axios from "axios";

Axios.defaults.baseURL = "https://truckee-dev.com";


//call client credentials api for access-token
 export function callForClientCredentials () {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    return Axios.request(
            {
                url: "/oauth/token",
                method: "post",
                auth: {
                    username: "Truckee-Service", // This is the client_id
                    password: "Truckee-Service" // This is the client_secret
                },
                params
            });

}

//verify user with token
export function verifyUserAccount (verificationOTP, username, accessToken) {
console.log(accessToken);
    return Axios.request(
            {
                url: `/user/v1/verify/${verificationOTP}?username=${username}`,
                method: "get",
                headers: {
                    'Authorization' : `Bearer ${accessToken}`
                }
            });
}

//verify user with token
export function registerUser (data, accessToken) {
    console.log(data);
    return Axios.request(
        {
            url: '/user/v1/register',
            method: "post",
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            },
            data : data
        });
}