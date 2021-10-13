import React, {useState} from 'react';

import {Link} from "react-router-dom";

import * as Yup from "yup";
import {useFormik} from "formik";
import { fetchFailure, fetchPasswordLoginToken} from "../redux/actions/AuthAction";
import {connect} from "react-redux";
import {fetchUserProfile, loginUser} from "../api/API";
import {fetchUserProfileData} from "../redux/actions/ProfileAction";

import { BeatLoader} from "react-spinners";

import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Header from "../navbar/Header";

toast.configure();
const Login = (props) => {



    const initialValues = {
        username: "",
        password: ""
    }

    const [loading, setLoading] = useState(false);


    const onSubmit = async (values) => {
        const loginData = {
            username: values.username,
            password: values.password
        }
        setLoading(true);
        //make api call to login and get token
        //user details

        await onCall(loginData);
    }

    async function onCall(loginData) {
        let loginSuccessful = false;
        let accessToken = "";
        await loginUser(loginData).then(

            res => {
                const response1 = {
                    accessToken: res.data.access_token,
                    refreshToken: res.data.refresh_token
                };
                props.getPassword(response1);
                loginSuccessful = true;
                accessToken = response1.accessToken;
                //profile api call
            }
        )
            .catch(error => {
                setLoading(false);
                if(error.response.status === 400) {
                    console.log(error.response.data.error_description)
                    toast.warning(
                        <>
                            <div>
                                <h5>BAD CREDENTIAL</h5>
                                <p>Please check your username and password</p>
                            </div>
                    </>,
                        {position : "top-center", type : "warning"});
                }
                if(error.response.status > 400){
                    console.log("SOMETHING WENT WRONG ");
                    toast.error('SOMETHING WENT WRONG \n Please contact the support team.', {position : "top-center", type : "error"});
                }
            });
        if(loginSuccessful){

            await fetchUserProfileApiCall(accessToken);
            toast.success(`Welcome ${props.fullName}`, {position : "top-right", autoClose : 2000})
            props.history.push('/profile');
        }
    }

    async function fetchUserProfileApiCall(accessToken) {
       await fetchUserProfile(accessToken)
            .then(res => {
                    props.fetchProfile(res.data.response);
                    setLoading(false);
                }
            ).catch(
                function (error) {
                    console.log(error.response.data);
                }
            )

    }


    const validationSchema = Yup.object(
        {
            username: Yup.string()
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
            {loading ? (
                    <div className={"mt-5 text-center"}>
                        <BeatLoader loading={true} size={150} color={"orange"}/>
                    </div>) :

                (<form className={"mt-5 text-center"} onSubmit={formik.handleSubmit} action={""}>
                    <h5 className={"form-label text-center"}>login Details</h5>
                    <input className={"form-input mt-2 input form-control"} placeholder="enter username/email"
                           type={"email"}
                           id={"username"} {...formik.getFieldProps("username")} />
                    {formik.touched.username && formik.errors.username ? (

                        <small className={"text-danger"}>{formik.errors.username}</small>
                    ) : null}
                    <br/>
                    <br/>
                    <input className={"form-input input form-control"} placeholder="password"
                           type={show !== true ? "password" : "text"}
                           id={"password"} {...formik.getFieldProps("password")} />
                    {formik.touched.password && formik.errors.password ? (
                        <small className={"text-danger text-sm-center"}>{formik.errors.password}</small>) : null}
                    <br/>
                    {/*<p onClick={() => setShow(!show)}*/}
                    {/*   className={"text-primary text-decoration-underline"}>{!show ? "show password" : "hide password"}</p>*/}
                    <Link to={"/forget-password"}>
                        <small className={"align-content-end text-decoration-underline"}>forgot password?</small>
                    </Link>
                    <br />
                    <button className={"btn btn-success m-1"} type={"submit"}>login</button>
                    <Link to={"/"}>
                        <button className={"btn btn-danger m-1"}>Cancel</button>
                    </Link>
                    <br/>
                    <small><Link to={"/register"}>Click here</Link> to create new account</small>
                </form>)}
        </>
    );

}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.userLoggedIn,
        fullName: state.profile.fullName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPassword: (response) => dispatch(fetchPasswordLoginToken(response)),
        fetchError: (error) => dispatch(fetchFailure(error)),
        fetchProfile: (data) => dispatch(fetchUserProfileData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
