import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ItemForm from '../components/shared/ItemForm'
import Layout from '../components/shared/Layout'
import { createItem } from '../services/items'


class ItemCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {
                name: '',
                description: '',
                link: '',
            },
            createdItem: null
        }
    }
    handleChange = event => {
        const updatedField = { [event.target.name]: event.target.value }
        const editedItem = Object.assign(this.state.item, updatedField)
        this.setState({ item: editedItem })
    }

    handleSubmit = async event => {
      event.preventDefault()
      
      const res = await createItem({...this.state.item, user_id:this.props.user.id && this.props.user.id})
      if (res.status === 201) {
          this.props.addItem(res.data)
          this.setState({ 
              createdItem: res.data
          })
          this.props.history.push('/items')
      }
  }
    
    render() {
        const { handleChange, handleSubmit } = this
        const { createdItem, item } = this.state
        const { history } = this.props
        if (createdItem) {
            return <Redirect to={`/items`} />
        }
      
    console.log(this.props.user)
        return (
            <Layout>
                <ItemForm
                    item={item}
                    history={history}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancelPath="/"
                />
            </Layout>
        )
    }
}
export default ItemCreate
