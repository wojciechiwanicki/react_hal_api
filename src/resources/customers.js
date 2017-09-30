import React, {Component} from 'react';

const url = 'https://i1.test-services.nykredit.it/cem-hackathon-service/customers/';
class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: '',
            input: {
                cprCvr: '',
                firstName: '',
                lastName: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const options = {
            method: 'GET',
            headers: {
                "Accept": "application/hal+json",
                "X-Client-Version": "1.0.0",
                "Authorization": "Bearer MGI3ZTc2NDAtZTc0Yi00YzY5LTg0OGYtNmJiYjUzMTNjNTRk"
            }
        }
        fetch(url, options).then(response => response.json()).then(jsondata => this.setState({data: jsondata})).catch(function() {
            alert('There was something wrong. Data could not be fetched :(((')
        });
    }

    handleChangeFor = (propertyName) => (event) => {
        const {input} = this.state;
        const newInput = {
            ...input,
            [propertyName]: event.target.value
        };
        this.setState({input: newInput});
    }

    handleSubmit(event) {
        const options = {
            method: 'PUT',
            headers: {
                "Accept": "application/hal+json",
                "X-Client-Version": "1.0.0",
                "Authorization": "Bearer MGI3ZTc2NDAtZTc0Yi00YzY5LTg0OGYtNmJiYjUzMTNjNTRk",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.input)
        }
        fetch(url + this.state.input.cprCvr, options).then(response => response.json()).then(console.log(this.state.input))
        event.preventDefault();
    }

    createList() {
        return this.state.data._embedded.customers.map((customer) => {
            return (
                <div key={customer.cprCvr} className='col s6 m4 l2 customer_cell'>
                    <div className='name'>{customer.firstName}</div>
                    <div className='surname'>{customer.lastName}</div>
                    <div className='cprCvr'>{customer.cprCvr}</div>
                </div>
            )
        });
    }
    render() {
        if (!this.state.data) 
            return (
                <div>
                    Loading Data...
                </div>
            )
        return (
            <div>
                <h4>Customers:</h4>
                <div className='row'>
                    {this.createList()}
                </div>
                <h4>Add/edit a customer</h4>
                <form onSubmit={this.handleSubmit} className='add_new_customer'>
                    <label>
                        cprCvr:
                        <input type="number" onChange={this.handleChangeFor('cprCvr')} value={this.state.input.cprCvr} required/>
                    </label>
                    <label>
                        Name:
                        <input type="text" onChange={this.handleChangeFor('firstName')} value={this.state.input.firstName} required/>
                    </label>
                    <label>
                        Surname:
                        <input type="text" onChange={this.handleChangeFor('lastName')} value={this.state.input.lastName} required/>
                    </label>

                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default Customers;
