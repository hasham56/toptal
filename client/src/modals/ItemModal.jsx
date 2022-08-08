import React, { useState } from 'react'
import { Button, Box, Input, Modal } from '@material-ui/core'
import { useSelector } from 'react-redux'
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
}

const ItemModal = ({ modal, openModal }) => {
  const { currentUser, token } = useSelector((state) => state.auth)
  const { data } = useSelector((state) => state.data)

  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState(null)
  const [price, setPrice] = useState(null)
  const [itemErrorLabel, setItemErrorLabel] = useState('')

  const addNewItem = (data) => {
    setDate('')
    setName('')
    setCalories(null)
    setPrice(null)
    openModal(false)
    setItemErrorLabel('')
    axios
      .post(`http://localhost:3001/foods`, data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleAddItem = () => {
    if (date === '' || name === '' || calories === null || price === null) {
      setItemErrorLabel('All values required!')
      return
    }

    const newDate = date.split('-').reverse().join('-')

    let found = false
    let index = null
    const updatedEntries = {
      email: currentUser.email,
      entries: data.entries.map((entry, idx) => {
        if (entry.date === newDate) {
          entry.products.push({
            name,
            calories: Number(calories),
            price: Number(price),
          })
          found = true
          index = idx
        }
        return entry
      }),
    }
    if (found) {
      let totalCalories = 0
      let totalPrice = 0
      updatedEntries.entries.map((entry, idx) => {
        if (
          Number(String(entry.date).split('-')[1]) ===
          Number(new Date().getMonth()) + 1
        ) {
          entry.products.map((product) => {
            totalPrice += product.price
            return product
          })
        }
        if (idx === index) {
          entry.products.map((product) => {
            totalCalories += product.calories
            return product
          })
        }
        return entry
      })
      if (totalCalories > 2100) {
        setItemErrorLabel(
          'You are not allowed more than 2100 calories per day!',
        )
        return
      }
      if (totalPrice > 1000) {
        setItemErrorLabel(
          'You are not allowed more than 1000 dollars per month!',
        )
        return
      }
      addNewItem(updatedEntries)
    } else {
      let updatedEntries = data.entries
      updatedEntries.push({
        date: newDate,
        products: [
          {
            name,
            calories: Number(calories),
            price: Number(price),
          },
        ],
      })
      let newEntry = {
        email: currentUser.email,
        entries: updatedEntries,
      }
      addNewItem(newEntry)
    }
  }

  return (
    <Modal
      open={modal}
      onClose={() => {
        openModal(false)
      }}
    >
      <Box sx={style} className="column-flex gp-20">
        <h2>Add Item</h2>
        <div className="column-flex">
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            type="date"
          ></Input>
        </div>
        <div className="column-flex">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          ></Input>
        </div>
        <div className="column-flex">
          <Input
            value={calories}
            type={'number'}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Calories"
          ></Input>
        </div>
        <div className="column-flex">
          <Input
            value={price}
            type={'number'}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          ></Input>
        </div>
        <div className="column-flex">
          <Button onClick={handleAddItem} variant="contained" color="primary">
            Add
          </Button>
          <span className="validation-text">{itemErrorLabel}</span>
        </div>
      </Box>
    </Modal>
  )
}

export default ItemModal
