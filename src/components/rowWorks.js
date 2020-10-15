import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const BASE_URL = process.env.REACT_APP_API_URL;
const COMP_URL = '/trabajos/';

export default class RowWork extends Component {

    constructor(props) {
        super(props);
        
        this.actualizazEstado = this.actualizarEstado.bind(this);

        this.state = {
            id:'',
            id_pedido:'',
            numeroTrabajo:'',
            paginasCarilla:'',
            faz:'',
            terminacion:'',
            linkDrive:'',
            id_worker:'',
            estado:'',
            tomado:'',
            terminado:'',
        };
    }

    componentDidMount() {
        this.setState({ 
            id:this.props.work._id,
            id_pedido: this.props.work.id_pedido,
            numeroTrabajo: this.props.work.numeroTrabajo,
            paginasCarilla: this.props.work.paginasCarilla,
            faz: this.props.work.faz,
            terminacion: this.props.work.terminacion,
            linkDrive:this.props.work.linkDrive,
            id_worker: this.props.work.id_worker,
            estado: this.props.work.estado,
            tomado: false,
            terminado: false,
        });
        
        if(this.props.work.estado === 'Iniciado'){
            this.setState({
                tomado: true
            });
        }else if(this.props.work.estado === 'Terminado'){
            this.setState({
                tomado: true,
                terminado: true,
            });
        }else{
            this.setState({
                terminado: true,
            });
        }
    }

    actualizarEstado(id, nuevoEstado){
        console.log(id);
        console.log(nuevoEstado);
        
        const  workUpdate = {
            estado: nuevoEstado,
        }

        axios.post( BASE_URL + COMP_URL + 'update/'+ id, workUpdate)
        .then(res => {
            console.log(res);
            this.setState({ 
                estado: nuevoEstado,
            });

            if(this.state.estado === 'Iniciado'){
                this.setState({ 
                    tomado: true,
                    terminado: false,
                });
            }else if(this.state.estado === 'Terminado') {
                this.setState({ 
                    tomado: true,
                    terminado: true,
                });
            }else{
                this.setState({ 
                    tomado: false,
                    terminado: true,
                });
            }

            console.log("trabajo actualizado");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        return (
            <tr>
                <td>{this.state.id_pedido}</td>
                <td>{this.state.numeroTrabajo}</td>
                <td>{this.state.paginasCarilla}</td>
                <td>{this.state.faz}</td>
                <td>{this.state.terminacion}</td>
                <td><a  href={"http://" + this.state.linkDrive}>ir</a> </td>
                <td>{this.state.id_worker}</td>
                <td class="bg-warning">{this.state.estado}</td>
                <td>
                    <Button variant="danger" size="sm" 
                        onClick={() => { this.actualizarEstado(this.state.id, 'Reportado')}}
                        disabled={this.state.terminado}>Reportar</Button> | <Button size="sm" 
                        onClick={() => { this.actualizarEstado(this.state.id, 'Iniciado')}} 
                        disabled={this.state.tomado} >Tomar</Button> | <Button variant="success" size="sm" 
                        onClick={() => { this.actualizarEstado(this.state.id, 'Terminado')}} 
                        disabled={this.state.terminado}>Terminar</Button>
                </td>
        </tr>
        );
    }
}