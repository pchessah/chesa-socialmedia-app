import React, { useState } from 'react';
import Link from "next/link"
import styles from "../styles/navbar.module.css"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';


function Navigationbar() {


    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Chesa Social Media</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto p-2" navbar>
                        <NavItem className="m-2">
                            <Link href="/"><a className={styles.navLink}>Home</a></Link>
                        </NavItem>
                        <NavItem className="m-2 ">
                            <Link href="/profile"><a className={styles.navLink}>Profile</a></Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Settings
                                </DropdownItem>
                                <DropdownItem>
                                    <Link href="/login">Log In</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Navigationbar
