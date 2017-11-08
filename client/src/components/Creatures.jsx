import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import NewForm from './NewForm.jsx'

class Creatures extends Component {
    state = {
        creatures: [],
        newFormToggle: false
    }

    componentWillMount() {
        this.getCreatures()
    }
    getCreatures = async () => {
        const res = await axios.get(`/api/creatures`)
        this.setState({creatures: res.data})
    }
    handleToggle = () => {
        this.setState({newFormToggle: !this.state.newFormToggle})
    }
    render() {
        return (
            <div>
                <h1>Creatures: </h1>
                {this.state.creatures.map((creature) => {
                    return(
                        <div>
                        <Link to={`/${creature._id}`}>{creature.name}</Link>
                        </div>
                    )
                })}
                {this.state.newFormToggle ? <NewForm getCreatures={this.getCreatures} handleToggle={this.handleToggle}/> : <button onClick={this.handleToggle}>Add a Creature</button>}
            </div>
        );
    }
}

export default Creatures;