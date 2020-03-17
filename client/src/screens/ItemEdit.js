import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ItemForm from '../components/shared/ItemForm'
import { getItemById, updateItem } from '../services/items'
import axios from 'axios'

class ItemEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: {
                title: '',
                link: ''
            },
            updated: false
        }
    }

    async componentDidMount() {
        try {
            const item = await getItemById(this.props.match.params.id)
            this.setState({ item })
        } catch (err) {
            console.error(err)
        }
    }

    handleChange = event => {
        const updatedField = { [event.target.name]: event.target.value }

        const editedItem = Object.assign(this.state.item, updatedField)

        this.setState({ item: editedItem })
    }

    handleSubmit = event => {
        event.preventDefault()

        axios({
            url: `http://localhost:3000/api/items/${this.props.match.params.id}`,
            method: 'PUT',
            data: this.state.item
        })
            .then(() => this.setState({ updated: true }))
            .catch(console.error)
        }

        updateItem(this.props.match.params.id, { ...this.state.item })
            .then(() => this.setState({ updated: true }))
            .catch(console.error)
    }

    render() {
        const { item, updated } = this.state
        const { handleChange, handleSubmit } = this

        if (updated) {
            return <Redirect to={`/items/${this.props.match.params.id}`} />
        }

        return (
            <>
                <ItemForm
                    item={item}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancelPath={`/items/${this.props.match.params.id}`}
                />
            </>
        )
    }
}
export default ItemEdit
