import React, { useState } from 'react'
import { Grid, Paper, Button, Modal, Box, Input } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function Main({ user, setUser }) {
  const [result, setResult] = useState([])
  const [modal, openModal] = useState(false)

  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [price, setPrice] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const email = user.email
    axios
      .get(`http://localhost:3001/foods?email=${email}`, {
        headers: {
          Authorization: 'Bearer ' + user.access_token,
        },
      })
      .then((res) => {
        setResult(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])

  const logoutBtn = () => {
    localStorage.setItem('access_token', '')
    localStorage.setItem('email', '')
    localStorage.setItem('username', '')
    setUser({ username: '', access_token: '', email: '' })
    navigate('/Login')
  }

  const handleAddItem = () => {}

  return (
    <>
      <Grid
        className="d-flex align-center justify-center login-container"
        container
        lg={12}
        sm={12}
      >
        <Grid lg={3} md={4} xs={10}>
          <Paper
            className="boder-rounded p-inline d-flex align-center justify-center m-inline card-height"
            elevation={3}
          >
            <Grid
              className="column-flex gp-60 align-center justify-center h-100"
              lg={12}
              sm={12}
            >
              <Button onClick={logoutBtn} variant="contained" color="primary">
                Logout
              </Button>
              <div className="text-heading">Welcome</div>
              {String(user.username).toUpperCase()}
              <Button
                onClick={() => {
                  openModal(true)
                }}
                variant="contained"
                color="primary"
              >
                Add Item
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid lg={7} md={4} xs={10}>
          <Paper
            className="boder-rounded p-inline d-flex align-center justify-center m-inline card-height"
            elevation={3}
          >
            <Grid
              className="column-flex gp-60 align-center justify-center h-100"
              lg={12}
              sm={12}
            >
              {result.entries.length &&
                result.entries.map((entry, idx) => (
                  <Accordion key={idx}>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h5" component="h2">
                        {entry.date}
                      </Typography>
                    </AccordionSummary>

                    {entry.products.length &&
                      entry.products.map((product, idy) => (
                        <AccordionDetails key={idy}>
                          <Typography>
                            <pre>{`Name: ${product.name.toUpperCase()}     |     Calories: ${
                              product.calories
                            }     |     Price: ${product.price}`}</pre>
                          </Typography>
                        </AccordionDetails>
                      ))}
                  </Accordion>
                ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={modal}
        onClose={() => {
          openModal(false)
        }}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add Item
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <div className="column-flex">
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
                type="date"
              ></Input>
            </div>
          </Typography>
          <Typography>
            <div className="column-flex">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              ></Input>
            </div>
          </Typography>
          <Typography>
            <div className="column-flex">
              <Input
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Calories"
              ></Input>
            </div>
          </Typography>
          <Typography>
            <div className="column-flex">
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              ></Input>
            </div>
          </Typography>
          <Typography>
            <Button onClick={handleAddItem} variant="contained" color="primary">
              Add
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default Main
