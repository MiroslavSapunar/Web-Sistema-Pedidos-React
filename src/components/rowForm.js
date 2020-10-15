import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

export default class RowWork extends Component {

    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    
    }

    delete(e){
        e.preventDefault();
        //console.log(this.props.workList._id);
        this.props.deleteWork(this.props.workList.numeroTrabajo);
    }

    render(){
        return (
            <tr>
                <td>{this.props.index + 1 }</td>
                <td><a  href={"http://" + this.props.workList.linkDrive}>ir</a> </td>
                <td>{this.props.workList.paginasPDF}</td>
                <td>{this.props.workList.paginasCarilla}</td>
                <td>{this.props.workList.faz}</td>
                <td>{this.props.workList.margen}</td>
                <td>{this.props.workList.hojasImpresas}</td>
                <td>{"$ " + this.props.workList.costoImpresion}</td>
                <td>{this.props.workList.terminacion}</td>
                <td>{"$ " + this.props.workList.costoTerminacion}</td>
                <td>{"$ " + this.props.workList.costoTotal}</td>
                <td>
                    <Button size="sm" variant="danger" onClick ={ this.delete}>Borrar</Button>
                </td>
            </tr>
        );
    }
}