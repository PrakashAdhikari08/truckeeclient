import React, { useState} from 'react';

import {Link} from "react-router-dom";

import * as Yup from "yup";
import {useFormik} from "formik";
import Axios from "axios";
import {fetchClientCredentialsToken, fetchFailure, fetchPasswordLoginToken} from "../redux/actions/AuthAction";
import {connect} from "react-redux";
import {fetchUserProfile, loginUser} from "../api/API";
import {fetchUserProfileData} from "../redux/actions/ProfileAction";

import {BounceLoader, BeatLoader} from "react-spinners";

const Login = (props) => {

    const initialValues = {
        username : "",
        password : ""
    }


    const onSubmit = async (values) => {
        const loginData = {
            username : values.username,
            password : values.password
        }
        //make api call to login and get token
        //user details

        await onCall(loginData);
    }

    async function onCall (loginData) {

        try {
            const response =await  loginUser(loginData);
            const  response1 = {
                accessToken : response.data.access_token,
                refreshToken: response.data.refresh_token
            };
            props.getPassword(response1);
            try {
                const response = await fetchUserProfile(response1.accessToken);
                props.fetchProfile(response.data.response);
            }
            catch (error) {

            }
            props.history.push('/profile');
        }catch (error) {
            props.fetchError(error.response.data.error)
        }



    }

    const validationSchema = Yup.object(
        {
            username : Yup.string()
                .email("Invalid Email Address")
                .required("Username is required"),
            password: Yup.string()
                .required("Password Required")
                .min(6, "Password is too short"),
        }
    );

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    const [show, setShow] = useState(false);


    return (
        < >

            <form className={"mt-5 text-center"} onSubmit={formik.handleSubmit} action={""}>
                {/*<BeatLoader loading={true} size={100} color={"orange"}/>*/}
                <h5 className={"form-label text-center"}>login Details</h5>
                <input className={"form-input mt-2 input form-control"} placeholder="enter username/email" type={"email"}
                       id={"username"} {...formik.getFieldProps("username")} />
                <br/>
                {formik.touched.username && formik.errors.username ? (

                    <small className={"text-danger"}>{formik.errors.username}</small>
                ) : null}
                <br/>
                <input className={"form-input input form-control"} placeholder="password" type={show !== true ?"password": "text"}
                       id={"password"} {...formik.getFieldProps("password")} />
                {formik.touched.password && formik.errors.password ? (
                    <small className={"text-danger text-sm-center"}>{formik.errors.password}</small>) : null}
                <br/>
                <p onClick={() => setShow(!show)} className={"text-primary text-decoration-underline"} >{!show ? "show password" : "hide password"}</p>
                <button className={"btn btn-sm btn-success m-1"} type={"submit"} >login</button>
                <Link to={"/"} ><button className={"btn btn-sm btn-danger m-1"}>Cancel</button> </Link>
                <br />
                <small><Link to={"/register"}>Click here</Link> to create new account</small>
            </form>
        </>
    );

};

const mapStateToProps = state => {
    return {
        isLogin : state.auth.userLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPassword : (response) => dispatch(fetchPasswordLoginToken(response)),
        fetchError : (error) => dispatch(fetchFailure(error)),
        fetchProfile : (data) => dispatch(fetchUserProfileData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);
