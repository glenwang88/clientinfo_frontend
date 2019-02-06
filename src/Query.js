import React from 'react';
import { Link } from 'react-router-dom';
import './resource/bootstrap-3.3.4-dist/css/bootstrap.css';

const queryURL = "http://localhost/clients/index.php/service/search_clients_info/?";

class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {websites: [], clients: [], first_name: '', last_name: '', 
                  phone_number: '', expire_check: '', user_searching: ''};

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleExpireCheckChange = this.handleExpireCheckChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
    
    }

    handleFirstNameChange(e) {
        this.setState({first_name: e.target.value});
        //console.log('=====this.state.first_name=', this.state.first_name);
    }
    handleLastNameChange(e) {
        this.setState({last_name: e.target.value});
        //console.log('=====this.state.last_name=', this.state.last_name);
    }
    handlePhoneNumberChange(e) {
        this.setState({phone_number: e.target.value});
        //console.log('=====this.state.phone_number=', this.state.phone_number);
    }
    handleExpireCheckChange(e) {
        this.setState({expire_check: e.target.checked});
        //console.log('=====this.state.expire_check=', this.state.expire_check);
    }

    handleSubmit(event) {

        event.preventDefault();
        //console.log('=====this.state.first_name=', this.state.first_name);
        
        var queryString = queryURL + "first_name=" + this.state.first_name + '&' +
                                     "last_name=" + this.state.last_name + '&' +
                                     "phone_number=" + this.state.phone_number + '&' +
                                     "expire_check=" + this.state.expire_check;
                              
        fetch(queryString, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then( (response) => {
                    return response.json()    
                })
        .then( (json) => {
                   this.setState({
                      clients: json
                   });
                   this.setState({user_searching: 'Yes'});
                   //console.log('parsed json', json);
         })
         .catch( (ex) => {
                   console.log('parsing failed', ex);
         });
         //console.log(this.state.clients);
    }
    
    render() {
        let tableHeader;
        if (this.state.user_searching) {
            tableHeader = 
                <tr>                  
                  <th>
                      ID
                  </th>
                  <th>
                      First Name
                  </th>
                  <th>
                      Last Name
                  </th>
                  <th>
                      Phone Number
                  </th>
                  <th>
                      Address
                  </th>
                  <th>
                      Mailing Address
                  </th>
                  <th>
                      Membership Type
                  </th>
                  <th>
                      Membership Expiry Date
                  </th>
                  <th>
                      Member Expire in 30 Days
                  </th> 
                </tr>;
         } 
        else {
            tableHeader = <tr></tr>;
        }

        return (
            <div id="container" className="container">
                
                <br/>
                <h2> Query client information </h2>
                <br/>

                <form onSubmit={this.handleSubmit}>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                           <label>First Name</label>
                           <input type="text" name="first_name" id="first_name"  placeholder="First Name" className="form-control" value={this.state.first_name} onChange={this.handleFirstNameChange.bind(this)} />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                           <label >Last Name</label>
                           <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.handleLastNameChange.bind(this)}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label >Phone Number</label>
                          <input type="text" className="form-control" id="phone_number" name="phone_number" placeholder="Phone Number" value={this.state.phone_number} onChange={this.handlePhoneNumberChange.bind(this)}/>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <br/>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="expire_check"  name="expire_check" value={this.state.expire_check} onChange={this.handleExpireCheckChange.bind(this)}/>
                          <label className="form-check-label">&nbsp;Membership Expires in 30 days</label>
                        </div>
                      </div>
                    </div>
                    <br/>

                    <div className="row">
                      <div className="col-md-2">
                        <input type="submit" value="Search Clients" className="btn btn-primary"/>

                      </div>
                      <div className="col-md-2">
                        <Link to="/create" className="btn btn-primary">Add client</Link>

                      </div>
                    </div>
                </form>


                <br/>
                <table className = "table table-striped table-hover table-bordered">
                    <thead>
                            {tableHeader}
                    </thead>
                    <tbody>
                        {
                            this.state.clients.map(function(item, key) {
                            return (
                                <tr key={key}>
                                  <td>{item.id}</td>
                                  <td>{item.first_name}</td>
                                  <td>{item.last_name}</td>
                                  <td>{item.phone_number}</td>
                                  <td>{item.address}</td>
                                  <td>{item.mailing_address}</td>
                                  <td>{item.membership_type}</td>
                                  <td>{item.membership_expiry_date}</td>
                                  <td>{item.expire30days}</td>
                                </tr>
                              )
                            }.bind(this))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Query;
