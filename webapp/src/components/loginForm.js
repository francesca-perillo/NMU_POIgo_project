import React, { Component } from 'react';
import {Form} from 'react-bootstrap'
import axios from 'axios';

export default class CreateUser extends Component {
//all subclasses in javascript have to call super consructor
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //correspond to the field of mongoDb document
    this.state = {
        password: '',
        username: '',
            }
  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const loginForm = {
      username: this.state.username,
      password: this.state.password
    }

      console.log(loginForm);

    window.location = '/';


    axios.post('http://localhost:5000/users/add', loginForm)
      .then(res => console.log(res.data));

    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>

        <Form onSubmit={this.onSubmit}>
            <Form.Group className="mb-3"> 
            <Form.Label>Username: </Form.Label>
                    <Form.Control  type="user"
                        required
                        placeholder = "Enter user"
                        value={this.state.username}
                      onChange={this.onChangeUsername}
                    />
             

            

             </Form.Group>
            <Form.Group className="form-group"> 
                <Form.Label>Password: </Form.Label>
                    <Form.Control  type="password"
                        required
                        placeholder = "Enter Password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
             </Form.Group>              
            <input type="submit" value="Create User" className="btn btn-primary" />
        </Form>
        
      </div>
    )
  }
}