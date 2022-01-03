import React, { Component } from 'react';
import {Form} from 'react-bootstrap'
import axios from 'axios'
// import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input'

export default class CreateUser extends Component {

//all subclasses in javascript have to call super consructor
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeCreditCard = this.onChangeCreditCard(this);
    this.onChangeActivity = this.onchangeActivity(this);
    // this.onChangeCC = this.onchangeCC(this);
    // this.onChangeVATNumber = this.onChangeVATNumber.bind(this);
    // this.onChangeAddress = this.onChangeAddress.bind(this);
    // this.onChangeCap = this.onChangeCap.bind(this);
    // this.onChangeCity = this.onChangeCity.bind(this);
    // this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    // this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);


    this.onSubmit = this.onSubmit.bind(this);

    //correspond to the field of mongoDb document
    this.state = {
        email: '',
        name: '',
        surname: '',
        password: '',
        creditCard: '',
        activity: ''
    }
  }

  //method that can be used to update state properties
  //when someone enters the email in the form, this function will be called
  onChangeEmail(e) {
    this.setState({
      email: e.target.value //value of the textbox
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeSurname(e) {
    this.setState({
      surname: e.target.value
    })
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeCreditCard(e) {
    this.setState({
      creditCard : {
        number_card : 123456,
        accountholder: 'cazzo',
        ccv: 635,
        expiration: 'ciao',
        type: 'POI User'
      }
    })
  }

  onchangeActivity(e) {
    this.setState({
      activity: {
        email: 'oh',
        name: 'ciao',
        surname: 'ss',
        partita_iva: 1234,
        tel_number: 234 
      }
    })
  }

  // onChangeCC(form) {
  //   console.log("");
  // }


  //click submit button
  onSubmit(e) {
    e.preventDefault(); //to prevent default HTML submit behaviour

    const user = {
      email: this.state.email,
      password: this.state.password,
      creditCard: {
        number_card : 123456,
        accountholder: 'cazzo',
        ccv: 635,
        expiration: 'mammt',
        type: 'POI User'
      },
      activity: {
        email: this.state.email,
        name: this.state.name,
        surname: this.state.surname,
        partita_iva: 1234,
        tel_number: 234 
      },
      type : 'POI User'
    }

    console.log(user);


    axios.post('http://localhost:3000/user', user)
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
                <Form.Label>Nome: </Form.Label>
                  <Form.Control  type="name"
                      required
                      placeholder = "Mario"
                      value={this.state.name}
                      onChange={this.onChangeName}
                  />
             </Form.Group> 
             <Form.Group className="mb-3"> 
                <Form.Label>Cognome: </Form.Label>
                  <Form.Control  type="surname"
                      required
                      placeholder = "Rossi"
                      value={this.state.surname}
                      onChange={this.onChangeSurname}
                  />
             </Form.Group>
             <Form.Group className="mb-3"> 
                <Form.Label>Email: </Form.Label>
                  <Form.Control  type="email"
                      required
                      placeholder = "Enter email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                  />
            </Form.Group>
            <Form.Group className="mb-3"> 
                <Form.Label>Password: </Form.Label>
                  <Form.Control  type="password"
                      required
                      placeholder = "Enter password"
                      autoComplete='on'
                      value={this.state.password}
                      onChange={this.onChangePassword}
                  />
             </Form.Group> 
            <input type="submit" value="Create User" className="btn btn-primary" />
        </Form>
        {/* <CreditCardInput onChange={this.onChangeCC} />  */}
             
        </div>
    )
  }
}

