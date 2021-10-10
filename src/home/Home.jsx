import {Link} from "react-router-dom";
import {fetchClientCredentialsToken, fetchFailure} from "../redux/actions/AuthAction";

import {connect} from "react-redux";
import {callForClientCredentials, verifyUserAccount} from "../api/API";

// Axios.defaults.baseURL = "https://truckee-dev.com";


const Home = (props) => {


    // async function getClientCredentialsAccessToken () {
    //     try {
    //         const response = await callForClientCredentials();
    //         props.getClientCredentials(response.data.access_token);
    //     }catch (error) {
    //         props.fetchError(error.response.data.error)
    //     }
    //
    // }

    return (
        // <!-- Grey with black text -->
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <Link to="/" className="navbar-brand"  >Logo</Link>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/" className="nav-link" >Active</Link>
                </li>
            </ul>
            <Link className="float-right ml-auto" to={"/login"}>
                <button className="btn btn-success" type="submit" >Login</button>
            </Link>
        </nav>
    );
}




export default (Home);