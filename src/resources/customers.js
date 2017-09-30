import React, {Component} from 'react';

//const authUrl = 'https://i1.test-services.nykredit.it/security/oauth2/token?grant_type=client_credentials';
const url = 'https://i1.test-services.nykredit.it/cem-hackathon-service/customers/';

class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*componentWillMount() {
        fetch(authUrl, {
            method: "POST",
            headers: {
                "Authorization": "Basic dGVzdC1jbGllbnRpZDpwYXNzd29yZA=="
            }
        }).then(response => response.json())
        .then(jsondata => this.setState({auth_data: jsondata}))

    }*/
    componentDidMount() {
        setTimeout(() => {
            fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/hal+json",
                    "X-Client-Version": "1.0.0",
                    "Authorization": "Bearer YjQ5YjU1ZjMtOTA3ZC00ZDdiLWEwNGEtNGRjOWVmMGI1YmQ1"
                }
            }).then(response => response.json()).then(jsondata => this.setState({data: jsondata}))
        }, 500)
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
        alert('NAME: ' + this.state.input.firstName);
        console.log('INPUT WORKS!');
        event.preventDefault();
    }
    createList() {
        return this.state.data._embedded.customers.map((customer) => {
            return (
                <div key={customer.cprCvr}>
                    <div>{customer.firstName}</div>
                    <div>{customer.lastName}</div>
                    <div>{customer.cprCvr}</div>
                    <hr/>
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
                {this.createList()}

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" onChange={this.handleChangeFor('firstName')} value={this.state.input.firstName}/>
                    </label>
                    <label>
                        Surname:
                        <input type="text" onChange={this.handleChangeFor('lastName')} value={this.state.input.lastName}/>
                    </label>
                    <label>
                        cprCvr:
                        <input type="number" onChange={this.handleChangeFor('cprCvr')} value={this.state.input.cprCvr}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );

    }
}

export default Customers;
