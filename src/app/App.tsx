// eslint-disable-next-line
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";

import "./App.css";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Mods from "./mods/Mods";

const { PUBLIC_URL } = process.env;

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Container id="content">
                    <Switch>
                        <Route path={PUBLIC_URL + "/"} exact component={Home} />
                        <Route path={PUBLIC_URL + "/mods"} component={Mods} />
                    </Switch>
                </Container>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
