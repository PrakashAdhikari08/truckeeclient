import React from 'react';

import * as Yup from "yup";
import {useFormik} from "formik";
import {verifyUserAccount} from "../api/API";
import {connect} from "react-redux";

const VerifyAccount = (props) => {

    const initialValues = {
        otp : ""
    }

    const onSubmit = async (values) => {
            let isVerified = false;
        try {
            const response = await verifyUserAccount(values.otp, props.username, props.accessTokenCC);
            isVerified = true;
        }
        catch (error) {
            console.log(error.response);
        }

        if(isVerified) {
            props.history.push('/login');
        }
    }

    const validationSchema = Yup.object(
        {
            otp: Yup.string()
                .required("OTP Required")
                .min(5, "Password is too short")
        }
    );

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <form className={"mt-5 text-center"} onSubmit={formik.handleSubmit}>
            <h4>Enter Verification Code</h4>
            <input type={"number"} className={"input form-control"}
                   id={"otp"} {...formik.getFieldProps("otp")} />
                   {formik.touched.otp && formik.errors.otp ? (

                       <small className={"text-danger"}>{formik.errors.otp}</small>
                   ) : null}
            <br />
            <button className={"mt-2 form-control btn-success"} type={"submit"}>Verify Account</button>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        accessTokenCC : state.auth.tokenClientCredentials,
        username : state.registerUser.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (VerifyAccount);