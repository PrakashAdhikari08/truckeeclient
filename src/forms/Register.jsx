import React, {useEffect} from "react";

import {Link} from "react-router-dom";

import * as Yup from "yup";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {registeredUsernameAction} from "../redux/actions/RegisterUserAction";
import {registerUser} from "../api/API";

import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {errorNotification, successNotification} from "../NotificationToast";

const Register = (props) => {

    const initialValues = {
        phoneNumber: "",
        emailAddress: "",
        password: "",
        userType: ""
    }


    const onSubmit = async (values) => {
        const data = {
            phoneNumber: values.phoneNumber,
            username: values.emailAddress,
            password: values.password,
            role: values.userType

        };
        await callRegisterApi(data);
    }

    async function callRegisterApi(data) {
        let registerSuccess = false;
        try {
            await registerUser(data, props.accessTokenCC)
            props.registerUsername(data.username);
            registerSuccess = true;
        } catch (error) {
            console.log(error.response.data.response);
            errorNotification(error.response.data.response);

        }
        if (registerSuccess) {
            successNotification();
            props.history.push('/verify-account');
        }

    }

    const validationSchema = Yup.object({
        phoneNumber: Yup.string().required("Please Enter your phone"),

        emailAddress: Yup.string()
            .email("Invalid Email Address")
            .required("Username is required"),
        password: Yup.string()
            .required("Password Required")
            .min(6, "Password is too short"),
        password1: Yup.string()
            .required("Re-enter Password")
            .test("Password Matched", "Passwords must match", function (value) {
                return this.parent.password === value;
            }),
        userType: Yup.string()
            .required("Please select a user type")
            .min(6, "Select a Type")
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <div className={"col-12"}>
            <form className={"container-sm mt-5 text-center "} onSubmit={formik.handleSubmit} action={""}>
                <h4>Register User</h4>

                <input type={"email "} placeholder={"enter a valid email address"} className={"m-1 input form-control"}
                       id={"emailAddress"} {...formik.getFieldProps("emailAddress")}/>
                <br/>
                {formik.touched.emailAddress && formik.errors.emailAddress ? (
                    <small className={"text-danger text-sm-center"}>{formik.errors.emailAddress}</small>
                ) : null}
                <input
                    type="text"
                    placeholder={"Phone"}
                    className={"m-1 input form-control"}
                    id="phoneNumber"
                    {...formik.getFieldProps('phoneNumber')}
                />

                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <small className={"text-danger text-sm-center"}>{formik.errors.phoneNumber}</small>
                ) : null}
                <br/>
                <input type={"password"} placeholder={"password"} id={"password"} className={"m-1 input form-control"}
                       autoComplete="off" {...formik.getFieldProps("password")} />
                <br/>
                {formik.touched.password && formik.errors.password ? (
                    <small className={"text-danger text-sm-center"}>{formik.errors.password}</small>) : null}
                <input type={"password"} placeholder={"re-enter password"} id={"password1"}
                       className={"m-1 input form-control"}
                       autoComplete="off" {...formik.getFieldProps("password1")}/>
                <br/>
                {(formik.touched.password1 && formik.errors.password1) ||
                formik.password !== formik.password1 ? (
                    <>
                        <small className={"text-danger text-sm-center"}>
                            {formik.errors.password1}
                        </small>
                        <br/>
                    </>
                ) : null}

                <select placeholder={"Chose the User type"} className={"m-1 border-2 input form-control"}
                        id={"userType"} {...formik.getFieldProps("userType")}
                    // onChange={event => setUserType(event.target.value)}
                >
                    <option value={""}>Select User Type</option>
                    <option value={"DRIVER"}>Driver</option>
                    <option value={"CARRIER"}>Carrier</option>
                </select>
                {formik.touched.userType && formik.errors.userType ? (
                    <p className={"text-danger text-sm-center"}>{formik.errors.userType}</p>) : null}
                <br/>

                <button className={"btn-sm btn-primary m-1"} type={"submit"}>Sign Up</button>

                <Link to={"/"}>
                    <button className={"btn-sm btn-danger m-1"}>Cancel</button>
                </Link>
                <br />
                <br />
                <small >Already registered. <Link to={'/login'}>Click to Login</Link></small>

            </form>
        </div>

            );

            }

            const mapStateToProps = state => {
            return {
            accessTokenCC : state.auth.tokenClientCredentials
        }
        }

            const mapDispatchToProps = (dispatch) => {
            return {
            registerUsername : (username) => dispatch(registeredUsernameAction(username))
        }
        }

            export default connect(mapStateToProps, mapDispatchToProps) (Register);
