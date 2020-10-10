// eslint-disable-next-line
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getMods } from "./mods/modsService";
import { useQuery } from "react-query";

const { PUBLIC_URL } = process.env;

function Header() {
    const { data, isLoading, error } = useQuery("mods", getMods);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href={PUBLIC_URL + "/"}>MineLittlePony</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href={PUBLIC_URL + "/"}>Home</Nav.Link>
                    <NavDropdown id="mods-dropdown" title="Mods">
                        <NavDropdown.Item href={PUBLIC_URL + "/mods"}>
                            Overview
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.ItemText hidden={!isLoading}>
                            Loading...
                        </NavDropdown.ItemText>
                        <NavDropdown.ItemText hidden={isLoading || !error}>
                            Error!
                            <span style={{ fontSize: "8pt" }}>
                                (see console)
                            </span>
                        </NavDropdown.ItemText>
                        {data?.mods?.map((mod) => (
                            <NavDropdown.Item
                                key={mod.id}
                                href={`${PUBLIC_URL}/mods/${mod.id}`}
                            >
                                {mod.name}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                    <Nav.Link href={PUBLIC_URL + "/support"}>Support</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
