import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import axios from 'axios';
import CategoryQuery from './../../../Backend/routes/category';

export default class InsertPOI extends Component {
//all subclasses in javascript have to call super consructor
  constructor(props) {
    super(props);

    this.onChangePoiName = this.onChangePoiName.bind(this);
    this.onChangePoiPhoto = this.onChangePoiPhoto.bind(this);
    this.onChangePoiDescription = this.onChangePoiDescription.bind(this);
    this.onChangePoiOpeningHours = this.onChangePoiOpeningHours.bind(this);
    this.onChangePoiLatitude = this.onChangePoiLatitude.bind(this);
    this.onChangePoiLongitude = this.onChangePoiLongitude.bind(this);
    this.onChangeActivityEmail = this.onChangeActivityEmail.bind(this);
    this.onChangeActivityName = this.onChangeActivityName.bind(this);
    this.onChangeActivitySurname = this.onChangeActivitySurname.bind(this);
    this.onChangeActivityPartitaIva = this.onChangeActivityPartitaIva.bind(this);
    this.onChangeActivityTelNumber = this.onChangeActivityTelNumber.bind(this);

    // this.onChangeCategory = this.onChangeCategory.bind(this);
    // this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    // this.onChangeSection = this.onChangeSection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //correspond to the field of mongoDb document
    this.state = {
        poiName: '',
        poiPhoto: '',
        poiDescription: '',
        poiOpeningHours: '',
        poiLatitude: '',       //location poi
        poiLongitude: '',
        activityEmail: '',     //activity data (if exist)
        activityName: '',
        activitySurname: '',
        activityPartita_iva: '',
        activityTelNumber: '',
        //isValidate: '',
        //createdBy (-> identificativo dell'utente che ha inserito il POI)
        category: '',
        subCategory: CategoryQuery,
        section:'',
    }
  }

  onChangePoiName(e) {
    this.setState({
      poiName: e.target.value
    })
  }
  
  onChangePoiPhoto(e) {
    this.setState({
      poiPhoto: e.target.value
    })
  }

  onChangePoiDescription(e) {
    this.setState({
      poiDescription: e.target.value
    })
  }

  onChangePoiOpeningHours(e) {
    this.setState({
      poiOpeningHours: e.target.value
    })
  }

  onChangePoiLatitude(e) {
    this.setState({
      poiLatitude: e.target.value
    })
  }

  onChangePoiLongitude(e) {
    this.setState({
      poiLongitude: e.target.value
    })
  }

  onChangeActivityEmail(e) {
    this.setState({
      activityEmail: e.target.value
    })
  }

  onChangeActivityName(e) {
    this.setState({
      activityName: e.target.value
    })
  }

  onChangeActivitySurname(e) {
    this.setState({
      activitySurname: e.target.value
    })
  }

  onChangeActivityPartitaIva(e) {
    this.setState({
      activityPartita_iva: e.target.value
    })
  }

  onChangeActivityTelNumber(e) {
    this.setState({
      activityTelNumber: e.target.value
    })
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    })
  }

  onChangeSubCategory(e) {
    this.setState({
      subCategory: e.target.value
    })
  }

  onChangeSection(e) {
    this.setState({
      section: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const newPoiForm = {
        name: this.state.poiName,
        photo: this.state.poiPhoto,
        description: this.state.poiDescription,
        openingHours: this.state.poiOpeningHours,
        location : {
            type : 'Point',
            coordinate : [453453, 5345356]
        },
        activity : {
            email: this.state.activityEmail,     //activity data (if exist)
            name: this.state.activityName,
            surname: this.state.activitySurname,
            partita_iva: this.state.activityPartita_iva,
            telNumber: this.state.activityTelNumber,
        },
        isValidate: true, //il poi in questa fase sarà sicuramente validato!
        createdBy: this.state.activityEmail,
    }

    console.log(newPoiForm);


    axios.post('http://localhost:3000/poi', newPoiForm)
      .then(res => console.log(res.data));

    // this.setState({
    //     poiName: '',
    //     poiPhoto: '',
    //     poiDescription: '',
    //     poiOpeningHours: '',
    //     poiLatitude: '',       //location poi
    //     poiLongitude: '',
    //     activityEmail: '',     //activity data (if exist)
    //     activityName: '',
    //     activitySurname: '',
    //     activityPartita_iva: '',
    //     activityTelNumber: '',
    // })
  }

  render() {
    return (
      <div>
        <h3>Inserisci un nuovo punto di interesse!</h3>
        <h4>Per inserire un nuovo punto di interesse, devi completare i seguenti campi con le informazioni utili.</h4>
        <Form onSubmit={this.onSubmit}>
            <Form.Group className="mb-3"> 
                <Form.Label>Nome del punto di interesse: </Form.Label><br></br>
                    <Form.Control  type="poi"
                        required
                        placeholder = "Chiesa Matrice della Madonna dell'Assunta "
                        value={this.state.poiName}
                        onChange={this.onChangePoiName}
                    />
            </Form.Group>

            <Form.Group className="form-group"> 
                <Form.Label>Foto del punto di interesse: </Form.Label><br></br>
                    <Form.Control
                        required
                        placeholder = "dobbiamo vedere come far inserire una foto ai tizietti"
                        value={this.state.poiPhoto}
                        onChange={this.onChangePoiPhoto}
                    />
            </Form.Group>

            <Form.Group className="form-group"> 
                <Form.Label>Descrivi brevemente il punto di interesse:</Form.Label><br></br>
                    <Form.Control
                        required
                        placeholder = "La chiesa della Madonna dell’Assunta si trova in una area più elevata rispetto alla totalità..."
                        value={this.state.poiDescription}
                        onChange={this.onChangePoiDescription}
                    />
            </Form.Group>

            <Form.Group className="form-group"> 
                <Form.Label>Orari di apertura del punto di interesse:</Form.Label><br></br>
                    <Form.Control
                        required
                        placeholder = "Lun 08:00 - 15:00, Mar 08:00 - 15:00, ..."
                        value={this.state.poiOpeningHours}
                        onChange={this.onChangePoiOpeningHours}
                    />
            </Form.Group>

            <h4>Per la buona riuscita dell'interimento del punto di interesse, fornisci le informazioni necessarie alla ricerca del punto di interesse</h4>

            <p>A quale categoria appartiene il punto di interesse inserito?</p>
            <Form.Select aria-label="Default select example">
                <option>Seleziona una categoria</option>
                <option value={this.state.category}>Arte</option>
                <option value={this.state.category}>Cultura</option>
                <option value={this.state.category}>Turismo</option>
                <option value={this.state.category}>Gastonomia</option>
                <option value={this.state.category}>Shopping</option>
            </Form.Select>

            <p>A quale sotto categoria appartiene il punto di interesse inserito?</p>
            <Form.Select aria-label="Default select example">
                <option>Seleziona una sotto categoria</option>
                <option value={this.state.subCategory}>Ville e castelli</option>
                <option value={this.state.subCategory}>Chiese antiche</option>
                <option value={this.state.subCategory}>Monasteri e conventi</option>
                <option value={this.state.subCategory}>Chiese rurali</option>
            </Form.Select>

            <p>A quale sezione appartiene il punto di interesse inserito?</p>
            <Form.Select aria-label="Default select example">
                <option>Seleziona una sezione</option>
                <option value={this.state.section}>...</option>
                <option value={this.state.section}>...</option>
                <option value={this.state.section}>...</option>
                <option value={this.state.section}>...</option>
            </Form.Select>

            <br></br><input type="submit" value="Inserisci il punto di interesse" className="btn btn-primary" />
        </Form>
        
      </div>
    )
  }
}