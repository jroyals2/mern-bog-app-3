import React, { Component } from 'react';
import axios from 'axios'

class NewForm extends Component {
    state = {
        newCreature: {
            name: '',
            description: ''
        }
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const newCreature = {...this.state.newCreature}
        newCreature[attribute] = event.target.value
        this.setState({newCreature})
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            name: this.state.newCreature.name,
            description: this.state.newCreature.description
        }
       const emptyForm = {
            name: '',
            description: ''
        }
        await axios.post(`/api/creatures`, payload)
        await this.props.getCreatures()
        this.setState({newCreature: emptyForm})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div>
                <label htmlFor="name">Name: </label>
                <input onChange={this.handleChange} type="text" name="name" value={this.state.newCreature.name}/>
                </div>
                <div>
                <label htmlFor="description">Description: </label>
                <input onChange={this.handleChange} type="text" name="description" value={this.state.newCreature.description} />
                </div>
                <div>
                <button>Submit</button>
                </div>
                </form>
                <button onClick={this.props.handleToggle}>Form off</button>
            </div>
        );
    }
}

export default NewForm;