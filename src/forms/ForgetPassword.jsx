import React, {useEffect} from 'react';

import * as Yup from "yup";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {callForClientCredentials, forgetPasswordAPI} from "../api/API";
import {fetchClientCredentialsToken, fetchFailure} from "../redux/actions/AuthAction";
import {registeredUsernameAction} from "../redux/actions/RegisterUserAction";

const ForgetPassword = (props) => {

    const initialValues = {
        emailAddress : ""
    }

    const onSubmit = async (values) => {

        let isVerified = false;
        console.log(values.emailAddress)
        await forgetPasswordAPI(values.emailAddress, props.accessTokenCC)
            .then(
                res => {
                    console.log(res);
                    props.history.push('/reset-password');
                }
            )
            .catch(
                error => console.log(error.response)
            )

        if(isVerified) {
        }
    }



    const validationSchema = Yup.object(
        {
            emailAddress: Yup.string()
                .required("Enter your username")
                .email("Invalid Email Address")
        }
    );

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <div className={"col-12"}>
                <form className={" container mt-5 text-center"} onSubmit={formik.handleSubmit}>
                    <h4>FORGET PASSWORD</h4>
                    <input type={"email"} className={"input form-control"}
                           placeholder={"Enter your username/email"}
                           id={"emailAddress"} {...formik.getFieldProps("emailAddress")} />
                    {formik.touched.emailAddress && formik.errors.emailAddress ? (

                        <small className={"text-danger"}>{formik.errors.emailAddress}</small>
                    ) : null}
                    <br />
                    <button className={"mt-2 form-control btn-success"} type={"submit"}>Generate Reset Token</button>
                </form>


        </div>

    );
};

const mapStateToProps = state => {
    return {
        accessTokenCC : state.auth.tokenClientCredentials
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getClientCredentials : (token) => dispatch(fetchClientCredentialsToken(token)),
        fetchError : (error) => dispatch(fetchFailure(error)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps) (ForgetPassword);