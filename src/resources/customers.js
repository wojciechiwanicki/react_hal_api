import React, {Component} from 'react';

const url = 'https://i1.test-services.nykredit.it/cem-hackathon-service/customers/';
class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSubmitted: false,
            auth_token: '/*here goes token*/',
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
                "Authorization": "Bearer " + this.state.auth_token
            }
        }
        fetch(url, options)
        .then(response => response.json())
        .then(jsondata => this.setState({data: jsondata}))
        .catch(function() {
            alert(
                'There was something wrong. Data could not be fetched :(((')
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
                "Authorization": "Bearer " + this.state.auth_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.input)
        }
        fetch(url + this.state.input.cprCvr, options)
        .then(response => response.json())
        .then(jsondata => {
            this.setState({isSubmitted: true})
        })
        event.preventDefault();
    }

    createList() {
        return this.state.data._embedded.customers.map((customer) => {
            return (
                <div key={customer.cprCvr} className='row customer_row'>
                    <div className='col s4 m4 l4 customer_cell'>{customer.firstName}</div>
                    <div className='col s4 m4 l4 customer_cell'>{customer.lastName}</div>
                    <div className='col s4 m4 l4 customer_cell'>{customer.cprCvr}</div>
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
            <div className='app_container container'>
                <h4>Customers:</h4>
                <div className='row'>
                    <div className='row customers_legend'>
                        <div className='col s4 m4 l4'>First Name</div>
                        <div className='col s4 m4 l4'>Last Name</div>
                        <div className='col s4 m4 l4'>CPR CVR</div>
                    </div>
                    {this.createList()}
                </div>
                <h4>Add/edit a customer</h4>
                <p>To edit customer, type his/hers CPR CVR and new name and surname.</p>
                <form onSubmit={this.handleSubmit} className='input_fields_container'>
                    <label>
                        cprCvr:
                        <input type='number' onChange={this.handleChangeFor('cprCvr')} value={this.state.input.cprCvr} required/>
                    </label>
                    <label>
                        Name:
                        <input type='text' onChange={this.handleChangeFor('firstName')} value={this.state.input.firstName} required/>
                    </label>
                    <label>
                        Surname:
                        <input type='text' onChange={this.handleChangeFor('lastName')} value={this.state.input.lastName}/>
                    </label>

                    <input type='submit' value='Submit' className='submit_button_centered'/>
                </form>
            </div>
        );
    }
}

export default Customers;
