import React, { Component, useImperativeHandle } from "react";
import axios from 'axios';
import './instruktor.css'
import './profilInstruktor.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Instrukcije from './instrukcije.js';

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from"react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

export default class ProfilInstruktor extends Component {
    constructor(props) {
        super();
        this.state = {
            token : localStorage.getItem('token'),
            id : '',
            firstName:'',
            lastName:'',
            avgGrade:1,
            description:'',
            registrationDate:'',
            numberOfScheduledInstructions:0,
            subjects : null,
            grades : null,
            userName:''
        };
        this.createGradeList = this.createGradeList.bind(this);
      }

    
    onClick = event => {
       
          
    }
    componentDidMount(){
        this.setState({id:this.props.id});

        
        axios.get('http://localhost:8111/api/management/instructor/'+this.props.id,{
            headers: {
              Authorization: this.state.token 
            }}).then(res => {
            this.setState({
                firstName : res.data.firstName,
                lastName:res.data.lastName,
                avgGrade:res.data.avgGrade,
                description:res.data.description,
                registrationDate:res.data.registrationDate,
                numberOfScheduledInstructions:res.data.numberOfScheduledInstructions,
                subjects : res.data.subjects,
                userName : res.data.userName,
                maxNumberOfInstructions : res.data.maxNumberOfInstructions,
                numberOfScheduledInstructions : res.data.numberOfScheduledInstructions
            })

          }).catch( error =>{
              
          }
        );

        axios.get('http://localhost:8111/api/rating/grades-instructor-all/'+this.props.id,{
            headers: {
              Authorization: this.state.token 
            }}).then(res => {
            this.setState({grades : res.data})

          }).catch( error =>{
              
          }
        );
    }
    createSubjectList(item){
        return <ListGroupItem key={item.id}>{item.name}: {item.description}
            </ListGroupItem>
    }
    createGradeList(item){
        return <ListGroupItem key={item.id}>
            Ocjena: {item.grade},    Komentar: {item.comment}
            </ListGroupItem>
    }
    
    render() {
        if(this.state.subjects != null)
            var SL = this.state.subjects.map(this.createSubjectList);
        if(this.state.grades != null)
            var GL = this.state.grades.map(this.createGradeList);

        const onClick = () => {
            
        }

        return (
<div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container">
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/home"}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/pocetna"}>Instruktori</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/profil"}>Profil</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/chat"}>Chat</Link>
                  </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}>Log Out</Link>
                        </li>
                </ul>
              </div>
            </div>
          </nav>
          <ul class="listaKartica"><li>
            <Card id="instruktorKartica" style={{ width: '80%' }}>
                <table class="datumOcjena">
                    <tr>
                        <td><Card.Img class="profilnaSlika" variant="top" src="profile.jpg" /></td>
                        <td><Card.Body id="instruktorInfo">
                            <Card.Title>Korisničko ime: {this.state.userName}</Card.Title>
                            <Card.Text id="naslov">Ime: {this.state.firstName}</Card.Text>
                            <Card.Text id="naslov">Prezime: {this.state.lastName}</Card.Text>
                            <Card.Text id="asda">Opis: {this.state.description}</Card.Text>
                            <Card.Text>Datum prijave: {this.state.registrationDate}</Card.Text>
                            <Card.Text>Maksimalan broj instrukcija: {this.state.maxNumberOfInstructions}</Card.Text>
                            <Card.Text>Broj zakazanih instrukcija: {this.state.numberOfScheduledInstructions}</Card.Text>
                            </Card.Body>
                        </td>
                        <td>
                            <table>
                                <tr id="ocjena">{this.state.avgGrade.toFixed(2)}</tr>
                                <tr><Card.Text>Prosječna ocjena</Card.Text></tr>
                            </table>
                        </td>
                    </tr>
                </table>

                
                <Card.Text class="lijevo">Predmeti</Card.Text>
                    <ListGroup className="list-group-flush">
                        {SL}
                    </ListGroup>

                <Card.Text class="lijevo">Ocjene</Card.Text>
                    <ListGroup className="list-group-flush">
                        {GL}
                    </ListGroup>
                           
                
            </Card>
            </li>
            <li>
            <Card id="opisKartica" style={{ margin:'auto',width:"80%",height:"110%",marginTop:'30px',background:'#1C8EF9' }}>
              <table style={{ width:"100%", borderWidth:'50px', textAlign:'center'}}>
                <tr>
                  <td style={{ background:'#3C3A35',width:"50%",color:'white'}}><Card.Title style={{margin:'5%'}}>Instruktor</Card.Title></td>
                  <td style={{ background:'#FFC246',width:"50%"}}><Card.Title style={{margin:'5%'}}>Klijent</Card.Title></td>
                </tr>
              </table>
            </Card>
              </li></ul>
            <Instrukcije 
            idInstruktora = {this.props.id} 
            idKlijenta = {null}
            ></Instrukcije>
            </div>
        );
    }
}