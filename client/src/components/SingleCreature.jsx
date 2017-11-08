import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SingleCreature extends Component {
    state = {
        creature: {
            name: '',
            description: ''
        },
        toggleEditForm: false,
        redirect: false
    }
    componentWillMount() {
        this.getCreature()
    }
    getCreature = async () => {
        const creatureId = this.props.match.params.id
        const res = await axios(`/api/creatures/${creatureId}`)
        this.setState({creature: res.data})
    }
    handleChange = (event) => {
        const attribute = event.target.name
        const creature = {...this.state.creature}
        creature[attribute] = event.target.value
        this.setState({creature})
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const creatureId = this.props.match.params.id
        const payload = {
            name: this.state.creature.name,
            description: this.state.creature.description
        }
        await axios.put(`/api/creatures/${creatureId}`, payload)
        await this.setState({toggleEditForm: !this.state.toggleEditForm})
    }

    deleteCreature = async () => {
        const creatureId = this.props.match.params.id
        await axios.delete(`/api/creatures/${creatureId}`)
        await this.setState({redirect: true})

    }
    handleToggle = () => {
        this.setState({toggleEditForm: !this.state.toggleEditForm})
    }


    render() {
        if (this.state.redirect){
            return <Redirect to='/' />
        }
        const edit = <div>
                <form onSubmit={this.handleSubmit}>
                <div>
                <label htmlFor="name">Name: </label>
                <input onChange={this.handleChange} type="text" name="name" value={this.state.creature.name}/>
                </div>
                <div>
                <label htmlFor="description">Description: </label>
                <input onChange={this.handleChange} type="text" name="description" value={this.state.creature.description} />
                </div>
                <div>
                <button>Submit</button>
                </div>
                </form>

        </div>
        const noEdit = <div>
            <h1>{this.state.creature.name}</h1>
            <h3>{this.state.creature.description}</h3>
            <div>
            <button onClick={this.handleToggle}>Edit this guy</button>
            </div>
            <button onClick={this.deleteCreature}>Delete this guy</button>
        </div>
        return (
            <div>
                {this.state.toggleEditForm ? edit : noEdit}
            </div>
        );
    }
}

export default SingleCreature;