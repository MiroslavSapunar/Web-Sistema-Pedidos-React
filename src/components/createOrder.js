import React, { Component } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import ContactForm from './contactForm';
import WorkForm from './workForm';

export default class CreateOrder extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users:[]
        }
    }
 
    componentDidMount() {
        axios.get('http://localhost:5000/usuarios')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            }
        )
    }
    
    render(){
        return (
            <Container>
                <Col>
                    <h1 className='font-weight-bold text-center mt-4 mb-4'>Registar pedido</h1>
                    <Row className="justify-content-md-center">
                        <ContactForm/>
                    </Row>
                    <Row className="justify-content-md-center mb-5">
                        <WorkForm/>
                    </Row>         
                </Col>
            </Container>
        );
    }
}