import React, { useState } from 'react'
import { Button, Box, Input, Modal } from '@material-ui/core'

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

const ItemModal = ({ modal, openModal, setResult }) => {
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [price, setPrice] = useState('')
  const [itemErrorLabel, setItemErrorLabel] = useState('')

  const handleAddItem = () => {}

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
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Calories"
          ></Input>
        </div>
        <div className="column-flex">
          <Input
            value={price}
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
