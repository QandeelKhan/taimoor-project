import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Registration from "./pages/auth/Registration";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/registration" element={<Registration />} />
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
