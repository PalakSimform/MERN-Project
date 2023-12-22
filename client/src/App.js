import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Signup from "./components/SignUp/Signup";

const App = () => {
    return (
        <Router>
            <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
