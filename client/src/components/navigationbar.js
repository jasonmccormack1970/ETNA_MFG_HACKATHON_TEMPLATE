import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Styled from 'styled-components';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
        }}
    />
);

const Styles = Styled.div`
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Hackathone Environment</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/test1">Test Page</Nav.Link>
                    <NavDropdown title="Servers" id="basic-nav-dropdown">
                        <NavDropdown.Item href="http://localhost:3600/graphql">
                            GraphQL Server
                        </NavDropdown.Item>
                        <NavDropdown.Item href="http://localhost:3700">
                            JSON Server
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Spare
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <ColoredLine color="red" />
    </Styles>
);
