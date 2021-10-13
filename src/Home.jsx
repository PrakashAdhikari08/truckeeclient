import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {callForClientCredentials} from "./api/API";
import {fetchClientCredentialsToken, fetchFailure, fetchPasswordLoginToken} from "./redux/actions/AuthAction";

const Home = (props) => {


    useEffect(
        async () => {
            await callForClientCredentials()
                .then(
                    res => {
                        props.getClientCredentials(res.data.access_token);
                    }
                )
                .catch(error => {
                    if(error.response.status === 401) {
                        console.log(error.response.data.error)
                    }
                    if(error.response.status > 401){
                        console.log("SOMETHING WENT WRONG");
                    }
                })
        }, []
    );
    return (
        <>
            <p>Home Page</p>
        </>
    );
};

const mapStateToProps = state => {
    return {
        accessTokenCC: state.auth.tokenClientCredentials,
        username: state.registerUser.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getClientCredentials: (response) => dispatch(fetchClientCredentialsToken(response)),
        fetchError: (error) => dispatch(fetchFailure(error)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

