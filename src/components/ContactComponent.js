import React from 'react';
import {Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, Col, Button, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';

class Contact extends React.Component {

    constructor(props){
        super(props);
        this.state={
            firstname:'',
            lastname:'',
            email:'',
            phone:'',
            agree:false,
            message:'',
            contactType: 'Phone',
            touched: {
                firstname: false,
                lastname: false,
                pgone: false,
                email: false
            }
        }
        this.HandleInputChange=this.HandleInputChange.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
    }

    HandleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }    

    /*HandleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked: target.value;
        const name = target.name;

        this.setState=({
            [name]: value
        });
    }*/

    HandleSubmit=function(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    /*HandleSubmit(event){
        alert("Current state is: "+ JSON.stringify(this.state));
        event.preventDefault();
    }*/

    validate(firstname, lastname, phone, email) {

        const errors = {
            firstname: '',
            lastname: '',
            phone: '',
            email: ''
        };

        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';

        const reg = /^\d+$/;
        if (this.state.touched.phone && !reg.test(phone))
            errors.phone = 'Phone Number should contain only numbers';
            
        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1) 
            errors.email = 'Email should contain a @';

        return errors;
    }
    
    
    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }

    render(){
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.phone, this.state.email);

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send Feedback</h3>
                    </div>

                    <div className="col-12 col-md-9">
                        <Form onSubmit={(event)=>{
                            alert("Current State: "+JSON.stringify(this.state));
                            event.preventDefault();
                        }
                        }>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" 
                                        placeholder="First Name" 
                                        value={this.state.firstname} 
                                        id="firstname" name="firstname"
                                        valid={errors.firstname === ''}
                                        invalid={errors.firstname !== ''}
                                        onBlur={this.handleBlur('firstname')}
                                        onChange={this.HandleInputChange} />
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" 
                                        placeholder="Last Name" 
                                        value={this.state.lastname} 
                                        id="lastname" name="lastname"
                                        valid={errors.lastname === ''}
                                        invalid={errors.lastname !== ''}
                                        onBlur={this.handleBlur('lastname')}
                                        onChange={this.HandleInputChange} />
                                        <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="text" 
                                        placeholder="Email" 
                                        value={this.state.email} 
                                        id="email" name="email"
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                        onChange={this.HandleInputChange} />
                                        <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phone" md={2}>Phone No.</Label>
                                <Col md={10}>
                                    <Input type="tel" 
                                        placeholder="Phone Number" 
                                        value={this.state.phone} 
                                        id="phone" name="phone"
                                        valid={errors.phone === ''}
                                        invalid={errors.phone !== ''}
                                        onBlur={this.handleBlur('phone')}
                                        onChange={this.HandleInputChange} />
                                        <FormFeedback>{errors.phone}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset:2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                value={this.state.agree}
                                                name="agree"
                                                onChange={this.HandleInputChange} />&nbsp;
                                                May we contact you?
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size:3,offset:1}}>
                                    <Input type="select"
                                        name="contactType"
                                        value={this.state.contactType}
                                        onChange={this.HandleInputChange}>
                                            <option checked>Phone</option>
                                            <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea"
                                        name="message" id="message"
                                        rows="12"
                                        value={this.state.message}
                                        onChange={this.HandleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10,offset:2}}>
                                <Button type="submit"
                                    color="primary">Send Feedback</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;