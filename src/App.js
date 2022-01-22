import Login from "./pages/login";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import NotFound from "./pages/notFound";
import AccessDenied from "./pages/accessDenied";
import { Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "./services/auth";
import "./App.css";

function App() {
  const loggedIn = isLoggedIn();

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/"
          exact
          element={loggedIn ? <Home /> : <Navigate replace to="/login" />}
        ></Route>
        <Route path="/404" element={<NotFound />}></Route>
        <Route path="/access-denied" element={<AccessDenied />}></Route>
      </Routes>
    </div>
  );
}

export default App;
