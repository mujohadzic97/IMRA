import React, { Component, useImperativeHandle } from "react";
import axios from 'axios';
import './instrukcijaKlijent.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import ListGroup from"react-bootstrap/ListGroup";
// import ListGroupItem from "react-bootstrap/ListGroupItem";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownMenu from "react-bootstrap/DropdownMenu";
// import DropdownItem from "react-bootstrap/DropdownItem";
import Rating from '@material-ui/lab/Rating';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class InstrukcijaKlijent extends Component {
    constructor(props) {
        super();
        this.state = {
            token : localStorage.getItem('token'),
            id : '',
            subjectId : '',
            scheduledDate : '',
            numberOfClasses : '',
            instructorId : '',
            clientId : '',
            active : false,
            firstNameInstruktora:'',
            lastNameInstruktora:'',
            firstNameKlijenta:'',
            lastNameKlijenta:'',
            subjectName:'',
            subjectDescription:'',
            comment:'',
            grade:'3'
        };
        this.handleChangeGrade = this.handleChangeGrade.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.errorToasterShow = this.errorToasterShow.bind(this);
        this.sucessToasterShow = this.sucessToasterShow.bind(this);
      }

    
    onClick = event => {
       
          
    }

    errorToasterShow(){
        toast.error('Doslo je do greške. Instruktor nije ocijenjen!', {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    sucessToasterShow(){
        toast.success('Uspješno ste ocijenili instruktora', {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    handleChangeGrade(event) {
        this.setState({grade: event.target.value});
        var grade ={
            "comment": this.state.comment,
            "grade": event.target.value
        };
        axios.post('http://localhost:8111/api/rating/grade-instructor/'+this.props.instructorId+'/'+this.props.clientId+'/'+this.props.subjectId, grade,{
            headers: {
                Authorization: this.state.token 
              }
          })
          .then(function (response) {
            if(response.status == 200){
                toast.success('Uspješno ste ocijenili instruktora', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
          })
          .catch(function (error) {
            toast.error('Doslo je do greške. Instruktor nije ocijenjen!', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });          
          });
    }

  

    handleChangeComment(event){
        this.setState({comment: event.target.value});
    }

    componentDidMount(){
        this.setState({id:this.props.id});
        this.setState({subjectId:this.props.subjectId});
        this.setState({scheduledDate:this.props.scheduledDate});
        this.setState({numberOfClasses:this.props.numberOfClasses});
        this.setState({instructorId:this.props.instructorId});
        this.setState({clientId:this.props.clientId});
        this.setState({active:this.props.active});
        
        axios.get('http://localhost:8111/api/management/instructor/'+this.props.instructorId,{
            headers: {
              Authorization: this.state.token 
            }}).then(res => {
            this.setState({
                firstNameInstruktora : res.data.firstName,
                lastNameInstruktora : res.data.lastName
            })

          }).catch( error =>{
              
          }
        );

        axios.get('http://localhost:8111/api/management/client/'+this.props.clientId,{
            headers: {
              Authorization: this.state.token 
            }}).then(res => {
            this.setState({
                firstNameKlijenta : res.data.firstName,
                lastNameKlijenta : res.data.lastName
            })

          }).catch( error =>{
              
          }
        );

        axios.get('http://localhost:8111/api/management/subject/'+this.props.subjectId,{
            headers: {
              Authorization: this.state.token 
            }}).then(res => {
            this.setState({
                subjectName : res.data.name,
                subjectDescription : res.data.description
            })

          }).catch( error =>{
              
          }
        );
    }
    
    
    
    render() {
        
        const onClick = () => {
            
        }

        


        return (
            <div>
                <Card id="instruktorKartica" style={{ width: '80%' }}>
                    <table class="datumOcjena">
                        <tr>
                            <td><Card.Img class="profilnaSlika" variant="top" src="profile.jpg" /></td>
                            <td><Card.Body id="instruktorInfo">
                                <Card.Title id="naslov">{this.state.firstNameInstruktora} {this.state.lastNameInstruktora}</Card.Title>
                                <Card.Text id="asda">{this.state.subjectName}: {this.state.subjectDescription}</Card.Text>
                                <Card.Text>Datum: {this.state.scheduledDate}</Card.Text>

                                <Rating
                                    value={3}
                                    max={5}
                                    onChange= {this.handleChangeGrade}
                                    />
                                <input id = "comment" onChange={this.handleChangeComment} type="username" className="form-control" placeholder="Dodajte komentar" />
                                </Card.Body>
                            </td>
                            
                            <td><Card.Body id="instruktorInfo">
                                <Card.Title id="naslov">{this.state.firstNameKlijenta} {this.state.lastNameKlijenta}</Card.Title>
                                <Card.Text id="asda">Broj časova: {this.state.numberOfClasses}</Card.Text>
                                { this.state.active ? <Card.Text style={{color:'green'}} id="aktivnaInstrukcija">Aktivna</Card.Text> : <Card.Text style={{color:'red'}} id="aktivnaInstrukcija">Nije aktivna</Card.Text>}
                                </Card.Body>
                            </td>
                            <td><Card.Img id="profilnaSlikaKlijent" variant="top" src="client.png" /></td>
                        </tr>
                    </table>                 
                </Card>
                <ToastContainer />
            </div>
            
        );
    }
}