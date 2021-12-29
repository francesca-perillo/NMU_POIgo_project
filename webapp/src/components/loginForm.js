import React, { Component } from 'react';
import {Form} from 'react-bootstrap'
import axios from 'axios';

export default class CreateUser extends Component {
//all subclasses in javascript have to call super consructor
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //correspond to the field of mongoDb document
    this.state = {
        email: '',
        name: '',
        surname: '',
        password: '',
        VATNumber: '',
        Address: '',
        Cap: '',
        City: '',
        PhoneNumber: '',
        PaymentMethod: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <Form onSubmit={this.onSubmit}>
            <Form.Group className="mb-3"> 
                <Form.Label>Name: </Form.Label>
                    <Form.Control  type="email"
                        required
                        placeholder = "Enter name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />
             </Form.Group>
            <Form.Group className="mb-3"> 
                <Form.Label>Cognome: </Form.Label>
                    <Form.Control  type="Cognome"
                        required
                        placeholder = "Enter surname"
                        value={this.state.surname}
                        onChange={this.onChangeSurname}
                    />
             </Form.Group>              
            <input type="submit" value="Create User" className="btn btn-primary" />
        </Form>
      </div>
    )
  }
}