import React from 'react';
import { Link } from 'react-router-dom';

import './resource/bootstrap-3.3.4-dist/css/bootstrap.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const createURL = 'http://localhost/clients/index.php/service/create_new_client/';

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = { membershipDate: new Date()};

        this.handleSubmit = this.handleSubmit.bind(this);
                this.handleMemberDateChange = this.handleMemberDateChange.bind(this);
    }
    
    componentDidMount() {

    }
    
    handleMemberDateChange(date) {
        this.setState({
            membershipDate: date
        });
    }

    handleSubmit(event) {

        event.preventDefault();

        console.log('=====this.refs.first_name=', this.refs.first_name.value);
        if (this.refs.first_name.value.trim() == '' || this.refs.last_name.value.trim() == '' || this.refs.address.value.trim() == '' )
        {
            alert("First name, last name and address are mandatory fields!");
            return;
        }
        
        fetch(createURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "first_name": this.refs.first_name.value,
                                   "last_name": this.refs.last_name.value,
                                   "phone_number": this.refs.phone_number.value,
                                   "address": this.refs.address.value,
                                   "mailing_address": this.refs.mailing_address.value,
                                   "member_type": this.refs.member_type.value,
                                   "expiry_date": this.state.membershipDate
                                 })
        })
        .then( (response) => {
            if(response.status != 201) {
                alert("Failed to add client information, please retry later.");
                return;
            }
            return response.json();    
        })
        .then( (json) => {
               this.setState({
                   clients: json
               });
               //console.log('parsed json', json);
               if (json.status == "Success")
               {
                   alert("Client information added!");
                   this.props.history.push('/query');
               }
               else
               {
                   alert("Failed to add client information, please provide detailed information and retry!");
               }
         })
         .catch( (ex) => {
             console.log('parsing failed', ex);
         });
    }
    
    render() {
        return (
            <div id="container" className="container">
                
                <br/>
                <h2> Add new client information </h2>
                <br/>

                <form onSubmit={this.handleSubmit}>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                           <label>First Name</label>
                           <input type="text" name="first_name" id="first_name"  placeholder="First Name" className="form-control" ref="first_name" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                           <label >Last Name</label>
                           <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" ref="last_name"/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                           <label >Phone Number</label>
                           <input type="text" className="form-control" id="phone_number" name="phone_number" placeholder="Phone Number" ref="phone_number"/>
                        </div>
                      </div>

                     <div className="col-md-6">
                        <div className="form-group">
                           <label >Address</label>
                           <input type="text" className="form-control" id="address" name="address" placeholder="Address" ref="address"/>
                        </div>
                     </div>
                   </div>

                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Mailing Address</label>
                          <input type="text" name="mailing_address" id="mailing_address"  placeholder="Mailing Address" className="form-control" ref="mailing_address" />
                       </div>
                      </div>

                      <div className="col-md-6">
                        <br/>
                        <div className="form-group">
                           <label >Membership Type&nbsp;</label>
                           <select className="browser-default custom-select" name="member_type" id="member_type" ref="member_type">
                              <option value="">--Non-Member-- </option>
                              <option value="Silver" >Silver</option>
                              <option value="Gold">Gold</option>
                              <option value="Platinum">Platinum</option>
                           </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                           <label>Membership expiry date &nbsp;</label>
                           <DatePicker name="expiry_date" id="expiry_date" 
                                       selected={this.state.membershipDate}
                                       onChange={this.handleMemberDateChange}
                                       dateFormat="yyyy-MM-dd" />
                        </div>
                      </div>

                      <div className="col-md-6">
                       
                      </div>
                    </div>

                     <br/>
                     <div className="row">
                       <div className="col-md-3">
                         <input type="submit" value="Submit" className="btn btn-primary"/>

                       </div>
                       <div className="col-md-3">
                         <Link to="/query"><b>Query client information</b></Link>

                       </div>
                     </div>
                </form>
            </div>
        )
    }
}

export default Create;
