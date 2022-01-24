import { connect } from "react-redux";
import { loggedIn } from "../actions";

import Login from "../pages/login";

export default connect(null, { loggedIn })(Login);
