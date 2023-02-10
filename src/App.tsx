import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route
                        path="/registration"
                        element={<GoogleRegistration />}
                    /> */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
