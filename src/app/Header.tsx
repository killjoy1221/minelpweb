// eslint-disable-next-line
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getMods } from "./mods/modsService";
import { useQuery } from "react-query";
import { InternalLink } from "./components";

const { PUBLIC_URL } = process.env;

function NavLink(props: { href: string; component: any; children: any }) {
    return (
        <props.component>
            <InternalLink href={props.href}>{props.children}</InternalLink>
        </props.component>
    );
}

function ModsDropdown() {
    const { data, isLoading, error } = useQuery("mods", getMods);

    return (
        <NavDropdown id="mods-dropdown" title="Mods">
            <NavLink href={PUBLIC_URL + "/mods"} component={NavDropdown.Item}>
                Overview
            </NavLink>
            <NavDropdown.Divider />
            <NavDropdown.ItemText hidden={!isLoading}>
                Loading...
            </NavDropdown.ItemText>
            <NavDropdown.ItemText hidden={isLoading || !error}>
                Error!
                <span style={{ fontSize: "8pt" }}>(see console)</span>
            </NavDropdown.ItemText>
            {data?.mods?.map((mod) => (
                <NavLink
                    key={mod.id}
                    href={`${PUBLIC_URL}/mods/${mod.id}`}
                    component={NavDropdown.Item}
                >
                    {mod.name}
                </NavLink>
            ))}
        </NavDropdown>
    );
}

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>MineLittlePony</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink href={PUBLIC_URL + "/"} component={Nav.Link}>
                        Home
                    </NavLink>
                    <ModsDropdown />
                    <NavLink
                        href={PUBLIC_URL + "/support"}
                        component={Nav.Link}
                    >
                        Support
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
