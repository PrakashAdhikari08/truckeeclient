import {Link} from "react-router-dom";
import {fetchClientCredentialsToken, fetchFailure} from "../redux/actions/AuthAction";

import {connect} from "react-redux";
import Axios from "axios";

// Axios.defaults.baseURL = "https://truckee-dev.com";


const Home = (props) => {

    // const [token, setToken] = useState();

    async function onCall () {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        try {
            const response =await  Axios.request(
                {
                    url: "/oauth/token",
                    method: "post",
                    baseURL: "https://truckee-dev.com",
                    auth: {
                        username: "Truckee-Service", // This is the client_id
                        password: "Truckee-Service" // This is the client_secret
                    },
                    params
                });
            props.getClientCredentials(response.data.access_token);
        }catch (error) {
            props.fetchError(error.response.data.error)
        }



    }
    return (
        // <!-- Grey with black text -->
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <Link to="/" className="navbar-brand" >Logo</Link>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/" className="nav-link" >Active</Link>
                </li>
                {/*<li className="nav-item">*/}
                {/*    <Link className="nav-link" >Link</Link>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                {/*    <Link className="nav-link" >Link</Link>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                {/*    <Link className="nav-link" >Link</Link>*/}

                {/*</li>*/}
            </ul>
            <Link className="float-right ml-auto" to={"/login"}>
                <button className="btn btn-success" type="submit" >Login</button>
            </Link>
        </nav>
    );
}


const mapStateToProps = state => {
    return {
       isLogin : state.userLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getClientCredentials : (token) => dispatch(fetchClientCredentialsToken(token)),
        fetchError : (error) => dispatch(fetchFailure(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);