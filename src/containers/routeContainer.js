import { connect } from "react-redux";

import Router from "../router";

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.common.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(Router);
