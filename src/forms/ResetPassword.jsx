import React, {useEffect} from "react";


import * as Yup from "yup";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {resetPasswordAPI} from "../api/API";

const ResetPassword = (props) => {

    const initialValues = {
        otp : "",
        password: "",
    }


    const onSubmit = async (values) => {
        const data = {
            otp : values.otp,
            password: values.password,
        };
        console.log(data)

        await resetPasswordAPI(data.otp, data.password, props.accessTokenCC)
            .then(
                res => {
                    console.log(res.data);
                    props.history.push('/login');
                }
        )
            .catch(error => {
                console.log(error.response.data.response);
            })
    }



    const validationSchema = Yup.object({

        password: Yup.string()
            .required("Password Required")
            .min(6, "Password is too short"),
        password1: Yup.string()
            .required("Re-enter Password")
            .test("Password Matched", "Passwords must match", function (value) {
                return this.parent.password === value;
            }),
        otp: Yup.string()
            .required("Reset Token Required")
            .min(5, "Reset Token is too short")
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <form className={" mt-5 text-center "} onSubmit={formik.handleSubmit} action={""}>
            <h4>Reset Password</h4>
            <input type={"number"} className={"input form-control"}
                   placeholder={"Enter Reset Token"}
                   id={"otp"} {...formik.getFieldProps("otp")} />
            {formik.touched.otp && formik.errors.otp ? (

                <small className={"text-danger"}>{formik.errors.otp}</small>
            ) : null}
            <br />

            <input type={"password"} placeholder={"password"} id={"password"} className={" input form-control"}
                   autoComplete="off" {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password ? (
                <small className={"text-danger text-sm-center"}>{formik.errors.password}</small>) : null}
            <br />
            <input type={"password"} placeholder={"re-enter password"} id={"password1"} className={" input form-control"}
                   autoComplete="off" {...formik.getFieldProps("password1")}/>
            {(formik.touched.password1 && formik.errors.password1) ||
            formik.password !== formik.password1 ? (
                <>
                    <small className={"text-danger text-sm-center"}>
                        {formik.errors.password1}
                    </small>
                    <br/>
                </>
            ) : null}

            <br />
            <button className={"btn-sm btn-success"} type={"submit"}>Reset Password</button>


        </form>

    );

};

const mapStateToProps = state => {
    return {
        accessTokenCC : state.auth.tokenClientCredentials
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ResetPassword);
