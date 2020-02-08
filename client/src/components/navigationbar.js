import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Styled from 'styled-components';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3,
        }}
    />
);

const Styles = Styled.div`
`;

export const NavigationBar = () => (
    <Styles>
        <ColoredLine color="red" />
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <h5>Hackathon Environment</h5>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>

                    <NavDropdown title="Demo Pages" id="basic-nav-dropdown">
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/example">Example Page 1</NavDropdown.Item>
                        <NavDropdown.Item href="/example2">Example Page 2</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>
                    <NavDropdown title="Servers" id="basic-nav-dropdown">
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="http://localhost:3600/graphql">
                            GraphQL Server
                        </NavDropdown.Item>
                        <NavDropdown.Item href="http://localhost:3700">
                            Mock API Server
                        </NavDropdown.Item>
                        <NavDropdown.Item href="https://api.spacexdata.com/v3/launches">
                            SpaceX Public API
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>

                    <Nav.Link href="/empty">Empty Page</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <ColoredLine color="red" />
    </Styles>
);
