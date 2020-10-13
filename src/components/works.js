import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap'

const BASE_URL = process.env.REACT_APP_API_URL;
const COMP_URL = '/trabajos/';

const Work = props => (

    <tr>
        <td>N° Pedido</td>
        <td>{props.work.numeroTrabajo}</td>
        <td>{props.work.paginasCarilla}</td>
        <td>{props.work.faz}</td>
        <td>{props.work.terminacion}</td>
        <td>{props.work.linkDrive}</td>
        <td>{props.work.id_worker}</td>
        <td class="bg-warning">{props.work.estado}</td>
        <td>
            <a href="#" onClick={() => { props.reportar(props.work._id)}}>Reportar</a> | <a href="#" onClick={() => { props.tomar(props.work._id)}}>Tomar</a> | <a href="#" onClick={() => { props.terminar(props.work._id)}}>Terminar</a>
        </td>
    </tr>
)

export default class WorkList extends Component{
    constructor(props) {
        super(props);

        this.deleteWork = this.deleteWork.bind(this);
        this.tomarTrabajo = this.tomarTrabajo.bind(this);
        this.terminarTrabajo = this.terminarTrabajo.bind(this);
        this.reportarTrabajo = this.reportarTrabajo.bind(this);

        this.state = {works: []};
    }

    componentDidMount() {
        axios.get( BASE_URL + COMP_URL)
            .then(response => {
                this.setState({ works: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteWork(id) {
        axios.delete( BASE_URL + COMP_URL + id)
            .then(response => console.log(response.data));
        this.setState({
            works: this.state.works.filter(el => el._id !== id)
        });
    }


    reportarTrabajo(){

    }

    tomarTrabajo(){

    }

    terminarTrabajo(){

    }

    exerciseList(){
        return this.state.works.map(currentwork => {
            return <Work work = {currentwork} reportar = {this.reportarTrabajo} tomar = {this.tomarTrabajo} terminar = {this.terminarTrabajo} key = {currentwork._id}/>;
        })
    }

    render(){
        return (
            <div>
                <h3 className='font-weight-bold mt-3 mb-3'>Trabajos sin terminar</h3>
                <Table className="table" striped bordered hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>N° Pedido</th>
                            <th>N° Trabajo</th>
                            <th>Pags por Carilla</th>
                            <th>Faz</th>
                            <th>Terminacion</th>
                            <th>link</th>
                            <th>Responsable</th>
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>

                </Table>
            </div>
        );
    }
}