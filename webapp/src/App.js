import logo from './poigo.png';
import './App.css';
import {Form, Button} from 'react-bootstrap'
import LoginForm from './components/loginForm'


function App() {
  return (
    // <div className="App-body">
    //   <div className="elements">
    //     <img src={logo} className="App-logo" alt="logo" />
    //           <Form>
    //     <Form.Group className="mb-3" controlId="formBasicEmail">
    //       <Form.Label>Email</Form.Label>
    //       <Form.Control type="email" placeholder="Enter email" />
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="formBasicPassword">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control type="password" placeholder="Password" />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="formBasicCheckbox">
    //       <Form.Check type="checkbox" label="Check me out" />
    //     </Form.Group>
    //     <Button variant="primary" type="submit">
    //       Submit
    //     </Button>
    //     <br/>
    //     Oppure <a href='#'>registrati</a>
    //   </Form>
    //   </div>
    // </div>
    <LoginForm></LoginForm>
  );
}

export default App;
