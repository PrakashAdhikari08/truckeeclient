import React from 'react';
import {connect} from "react-redux";

const Profile = (props) => {
    return (
        <div className={"text-center align-items-center"}>
            <form className={"d-inline"}>
            <h1>My Profile</h1>
            <p>Name is {props.fullName}</p>
            <p>{props.phoneNumber}</p>

            <p>{props.username}</p>
                <img src={props.profileImageUrl} />
                <br />
                <br />

            <button disabled className={"btn btn-success ml-2"}>Update</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isLogin : state.auth.userLoggedIn,
        id : state.profile.id,
        username : state.profile.username,
        fullName: state.profile.fullName,
        role : state.profile.role,
        phoneNumber : state.profile.phoneNumber,
        profileImageUrl : state.profile.profileImageUrl,
        active : state.profile.active,
        dotNumber : state.profile.dotNumber,
        isProfileCompleted : state.profile.isProfileCompleted
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);