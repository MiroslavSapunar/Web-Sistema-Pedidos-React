import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const COMP_URL = '/exercises/';

const Exercise = props => (

    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,24)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Terminar</Link> |  <a href="#" onClick={() => { props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component{
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get( BASE_URL + COMP_URL)
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete( BASE_URL + COMP_URL + id)
            .then(response => console.log(response.data));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    exerciseList(){
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise = {currentexercise} deleteExercise = {this.deleteExercise} key = {currentexercise._id}/>;
        })
    }

    render(){
        return (
            <div>
                <h3>Registro Ejercicios</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>

                </table>
            </div>
        );
    }
}