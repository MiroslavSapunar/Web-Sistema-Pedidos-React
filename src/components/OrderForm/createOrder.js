import React, { Component } from 'react';
import axios from 'axios';
import { Col, Container, Row, Button} from 'react-bootstrap';

import ContactForm from './contactForm';
import WorkForm from './workForm';
import TableForm from './tableForm';
import DetailForm from'./detailForm';

//const baseURL = process.env.REACT_APP_API;
const orderCountURL = process.env.REACT_APP_API_ORDER_COUNT;
const orderCountUpdateURL = process.env.REACT_APP_API_ORDER_COUNTUP;

const BASE_URL_API = process.env.REACT_APP_API_URL;
const ROUTE_ORDERS_URL = '/pedidos/';
const ROUTE_WORKS_URL = '/trabajos/';

export default class CreateOrder extends Component {

    constructor(props) {
        super(props);

        this.recordContact = this.recordContact.bind(this);
        this.recordWork = this.recordWork.bind(this);
        this.recordData = this.recordData.bind(this);
        this.deleteWork = this.deleteWork.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
        this.requestOrderNumber = this.requestOrderNumber.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.saveWorks = this.saveWorks.bind(this);
        this.saveWork = this.saveWork.bind(this);
        this.calculateWorkCost = this.calculateWorkCost.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.updateWorks = this.updateWorks.bind(this);

        this.state = {
            
            id_reception: '',
            estado: '',
            observacion:'',
            costoEnvio:'',

            contact:[],
            works:[],
            contactReg:'',
            workReg:'',
            dataReg:'',
        }
    }

    componentDidMount() {
        this.setState({
            
            id_reception: "Sin Recepcion",
            estado: "No Pagado",
            observacion:'',
            costoEnvio:0,

            contact:[],
            works: [],
            contactReg: false,
            workReg: false,
            dataReg: false,
        })
    }

    componentDidUpdate(){
        console.log("se actualizo componente");
        console.log(this.state);
    }

    recordContact(contactRecived){
        var newArray = [ contactRecived];
        this.setState({
            contactReg: true,
            contact: newArray,
        });
    }

    recordWork(workRecived){
        this.setState({
            workReg: true,
            works: this.state.works.concat(workRecived),
        })
    }

    recordData(dataRecived){
        this.setState({
            dataReg: true,
            costoEnvio: Number(dataRecived.costoEnvio),
            observacion: dataRecived.observaciones,
        });
    }


    deleteWork(numeroTrabajo){
        this.setState((state) => ({
            works: state.works.filter(el => el.numeroTrabajo !== numeroTrabajo)
        }));
    }

    async requestOrderNumber(){
        //console.log(orderCountURL)
        try {
            const res = await axios.get(orderCountURL);
            
            var numeroPedido = res.data.cuenta;            

            const count = {
                cuenta: (Number(numeroPedido) + 1)
            }

            axios.post( BASE_URL_API + '/contadores/update/5f89136a760dae56b44f1075', count)
            .then(res => {
                //console.log(res);
            })
            .catch(err => {
                //console.log(res);
                console.log(err);
            })
            return numeroPedido;

        }catch (error) {
            console.log(error)
            return 'ERROR NUMERO PEDIDO';
        }
    }

    async saveContact(){
        try{
            const res = await axios.post( BASE_URL_API + '/contactos/add', this.state.contact[0])
            return res.data;
        
        } catch (error){
            console.log(error);
            return 'ERROR ID CONTACT';
        }
    }

    async saveWork(workOb){
        
        try{
            const res = await axios.post( BASE_URL_API + '/trabajos/add', workOb)
            return res.data;
    
        } catch (error){
            console.log(error);
            return 'ERROR ID WORKS'
        }
    }

    async saveWorks(){
        var id_works = [];
        
        for (const work of this.state.works) {
            const id_work = await this.saveWork(work);
            //console.log(id_work)
            id_works = id_works.concat(id_work);
        }
        
        //console.log(id_works);
        return id_works;
    }

    updateContact(contact, id_pedido_){
        const update = {
            id_pedido: id_pedido_
        }
        axios.post( BASE_URL_API + '/contactos/update/' + contact, update)
        .then(res => {
            console.log.apply(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    updateWorks(works, numeroPedido_, id_pedido_){
        var i = 1;

        const updateNumberOrder = {
            numeroPedido: numeroPedido_
        }

        const updateIdOrder = {
            id_pedido: id_pedido_
        }
        
        for (const work of works){
            var updateNumberWork = {
                numeroTrabajo: i
            }

            axios.post( BASE_URL_API + '/trabajos/update/' + work, updateNumberWork)
            .then(res => {
                console.log.apply(res);
            })
            .catch(err => {
                console.log(err);
            });

            axios.post( BASE_URL_API +'/trabajos/update/' + work, updateNumberOrder)
            .then(res => {
                console.log.apply(res);
            })
            .catch(err => {
                console.log(err);
            });

            axios.post( BASE_URL_API + '/trabajos/update/' + work, updateIdOrder)
            .then(res => {
                console.log.apply(res);
            })
            .catch(err => {
                console.log(err);
            });

            i++;
        }
    }

    calculateWorkCost(){
        var totalWork = 0;
        
        for (const work of this.state.works){
            totalWork += work.costoTotal;
        } 
        
        return totalWork;
    }

    async submitOrder(e) {
        e.preventDefault();
        
        const numberOrder = await this.requestOrderNumber();
        const contact = await this.saveContact();
        const works = await this.saveWorks();
        const total = await this.calculateWorkCost();
        var id_pedido = 'SIN ID PEDIDO';

        const order = {

            id_reception: this.state.id_reception,
            estado: this.state.estado,
            observacion:this.state.observacion,
            costoEnvio: this.state.costoEnvio,
            totalPedido: total,

            numeroPedido: numberOrder,
            id_contact: contact,
            id_works: works,


        }

        console.log(order)

        await axios.post( BASE_URL_API + '/pedidos/add', order)
            .then(res => {
                console.log(res.data)
                id_pedido = res.data;                
            })
            .catch(err => {
                console.log(err);
            })

        this.updateContact(contact, id_pedido);
        this.updateWorks(works, numberOrder, id_pedido);

    }

    render() {
        return (
            <Container className="mb-5">
                <h1 className='font-weight-bold text-left mt-4 mb-2'>Registar pedido</h1>
                <Col className="mb-5">
                    <Row className="justify-content-center">
                        <ContactForm return={this.recordContact}/>
                    </Row>
                    <Row className="justify-content-center">
                        <WorkForm return={this.recordWork}/>        
                    </Row>
                    <Row className="justify-content-center">
                        <TableForm works = {this.state.works} deleteWork = {this.deleteWork}/>
                    </Row>
                    <Row className="justify-content-center">
                        <DetailForm return={this.recordData}/>
                    </Row>
                    <Button className="mb-5" block variant="dark" size="lg" type="submit" onClick={this.submitOrder} disabled={!(this.state.contactReg && this.state.workReg)}>Registrar Pedido</Button>
                </Col>
            </Container>
        );
    }
}