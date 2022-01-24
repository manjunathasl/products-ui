import LoginContainer from "../containers/loginContainer";
import Home from "../pages/home";
import SignUp from "../pages/signup";
import NotFound from "../pages/notFound";
import AccessDenied from "../pages/accessDenied";
import { Routes, Route, Navigate } from "react-router-dom";

function Router(props) {
  return (
    <Routes>
      <Route path="/login" element={!props.isLoggedIn ? <LoginContainer /> : <Navigate replace to="/" />}></Route>
      <Route path="/signup" element={!props.isLoggedIn ? <SignUp /> : <Navigate replace to="/" />}></Route>
      <Route
        path="/"
        exact
        element={props.isLoggedIn ? <Home /> : <Navigate replace to="/login" />}
      ></Route>
      <Route path="/404" element={<NotFound />}></Route>
      <Route path="/access-denied" element={<AccessDenied />}></Route>
    </Routes>
  );
}

export default Router;
