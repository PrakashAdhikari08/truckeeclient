import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import React from "react";

export function successNotification() {
   return  toast.success(
        <>
            <div>
                <h5>Registration Successful</h5>
                <p>Please verify your account using the OTP provided on your email</p>
            </div>
        </>,
        {position : "top-center", type : "success", autoClose : 2000});
}

export function errorNotification(error) {
    return  toast.error(
        <>
            <div>
                <h5>Registration Error</h5>
                <p>{error}</p>
            </div>
        </>,
        {position : "top-center", type : "error", autoClose : 4000});
}