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
import LogOut from './logOut';
import { userAuth } from "../pages/libs/context/userAuthContext"
import { useRouter } from "next/router"


function Navigationbar() {


    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const { authUser } = userAuth()
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
                        {!authUser ? <> <NavItem className="m-2 ">
                            <Link href="/login"><a className={styles.navLink}>Log In</a></Link>
                        </NavItem>
                            <NavItem className="m-2 ">
                                <Link href="/signup"><a className={styles.navLink}>Sign Up</a></Link>
                            </NavItem> </> : null}

                        {authUser ? <NavItem className="m-2 ">
                            <Link href="/profile"><a className={styles.navLink}>Profile</a></Link>
                        </NavItem> : null}

                        {authUser ? <NavItem className="m-2 ">
                            <LogOut />
                        </NavItem> : null}


                        {/* <UncontrolledDropdown nav inNavbar>
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
                        </UncontrolledDropdown> */}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Navigationbar
