import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component{
    
    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
        console.log(e.target.value)
    }
    
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
        console.log(e.target.value)
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
        console.log(e.target.value)
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
        console.log(date)
    }

    onSubmit(e) {

        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => {
                console.log(res.data);
            })
            .then(res => {
                window.location = '/';
            })
    }
    
    render(){
        return (
            <div>
                <h3>Create new exercise</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group' >
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className='form-group'>
                        <label>Duration (in min)</label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className='form-group'>
                        <label>Date:</label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <input type="Submit" value="crear ejercicio" className="btn btn-primary" action="Root.js"/>
                    </div>
                </form>
            </div>
        );
    }
}