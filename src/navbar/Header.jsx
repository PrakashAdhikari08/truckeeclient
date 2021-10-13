import {Link} from "react-router-dom";
import {logoutUser} from "../redux/actions/AuthAction";
import {connect} from "react-redux";



const Header = (props) => {

    // useEffect(
    //     async () => {
    //         try {
    //             const response = await callForClientCredentials();
    //             props.getClientCredentials(response.data.access_token);
    //         }catch (error) {
    //             props.fetchError(error.response.data.error)
    //         }
    //
    //     },[]
    // );

    return (
        // <!-- Grey with black text -->
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <Link to="/" className="navbar-brand"  >Logo</Link>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/" className="nav-link" >Active</Link>
                </li>
            </ul>
            {
                props.isLogin ?
                    (<Link className="float-right ml-auto" to={"/login"}>
                        <button className="btn btn-warning" type="submit" onClick={props.userLogout}>logout</button>
                    </Link>)
                    :(
                        <Link className="float-right ml-auto" to={"/login"}>
                            <button className="btn btn-success" type="submit" >login</button>
                        </Link>
                    )

            }

        </nav>
    );
}
const mapStateToProps = state => {
    return {
        isLogin : state.auth.userLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout : ()=> dispatch(logoutUser())
    }
}



export default connect(mapStateToProps, mapDispatchToProps) (Header);