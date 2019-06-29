import React from 'react';
import {Navbar, Nav, NavbarBrand, NavItem, NavbarToggler, Button,Collapse, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';


class Header extends React.Component{
    constructor(){
        super();
        this.state={
            isNavOpen:false,
            isModalOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    render(){
        return(
            <React.Fragment>
                <div className="container">
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button color="primary" onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                </div>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <Form onSubmit={(event)=>{
                        this.toggleModal();
                        alert("Email: "+this.email.value+"\nPassword: "+this.password.value+"\nRemember: "+this.remember.value);
                        event.preventDefault();
                    }}>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input type="text" name="email" id="email"
                                innerRef={(input)=>this.email=input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">
                                Password
                            </Label>
                            <Input type="password" name="password" id="password"
                                innerRef={(input)=>this.password=input} />
                        </FormGroup>
                        <FormGroup check>
                            <Input type="checkbox" name="remember"
                                innerRef={(input)=>this.remember=input} /> 
                                Remember me
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <FormGroup>
                            <Button type="submit" color="primary">Login</Button>
                        </FormGroup>
                    </ModalFooter>
                    </Form>
                </Modal>
            </React.Fragment>
        );
    }
}
export default Header;