import React, { useState } from 'react'
import {
  Grid,
  Paper,
  Button,
  Modal,
  Box,
  Input,
  Divider,
} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Main.scss'

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
  const [expanded, setExpanded] = useState(false)

  const [result, setResult] = useState([])
  const [modal, openModal] = useState(false)
  const [adminRole, setAdminRole] = useState(false)

  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [price, setPrice] = useState('')
  const [itemErrorLabel, setItemErrorLabel] = useState('')

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
        const data = {
          ...res.data.result,
          entires: res.data.result.entries.map((result) => {
            result.loading = false
            return result
          }),
        }
        setResult(data)
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

  const handleAccordian = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleEditClick = (panel) => (e) => {
    e.stopPropagation()
    setExpanded(panel)
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
              lgkui={12}
              sm={12}
            >
              <Button
                onClick={() => {
                  openModal(true)
                }}
                variant="contained"
                color="primary"
              >
                Add Item
              </Button>
              <div className="text-heading">Welcome</div>
              {String(user.username).toUpperCase()}

              <Button onClick={logoutBtn} variant="contained" color="primary">
                Logout
              </Button>
            </Grid>
          </Paper>
        </Grid>
        {adminRole ? (
          <Grid lg={7} md={4} xs={10}>
            <Paper
              className="boder-rounded calories-container p-inline d-flex align-center justify-center m-inline card-height"
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
                            <Grid container className="gp-20">
                              <p className="m-width-p">
                                {`Name: ${product.name.toUpperCase()}`}
                              </p>
                              <Divider orientation="vertical" flexItem />
                              <p className="m-width-p">
                                {`Calories: ${product.calories}`}
                              </p>
                              <Divider orientation="vertical" flexItem />
                              <p className="m-width-p">
                                {`Price: ${product.price}`}
                              </p>
                            </Grid>
                          </AccordionDetails>
                        ))}
                    </Accordion>
                  ))}
              </Grid>
            </Paper>
          </Grid>
        ) : (
          <Grid lg={7} md={4} xs={10}>
            <Paper
              className="boder-rounded calories-container p-inline d-flex align-center justify-center m-inline card-height"
              elevation={3}
            >
              <Grid
                className="column-flex calories-container gp-10 justify-center h-100"
                lg={3}
                sm={3}
              >
                <div className="user-container">Hasham</div>
                <div className="user-container">Hasham</div>
                <div className="user-container">Hasham</div>
                <div className="user-container">Hasham</div>
                <div className="user-container">Hasham</div>
              </Grid>
              <Grid
                className="column-flex calories-container gp-60 align-center justify-center h-100"
                lg={9}
                sm={9}
              >
                {result.entries.length &&
                  result.entries.map((entry, idx) => (
                    <Accordion
                      key={idx}
                      expanded={expanded === `panel${idx + 1}`}
                      onChange={handleAccordian(`panel${idx + 1}`)}
                      className={'w-100'}
                    >
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Grid className="d-flex flex-direction w-100">
                          <p>{entry.date}</p>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEditClick(`panel${idx + 1}`)}
                          >
                            Edit
                          </Button>
                        </Grid>
                      </AccordionSummary>

                      {entry.loading ? (
                        <AccordionDetails>
                          <Grid container className="gp-20">
                            <p className="m-width-p w-100 text-center">
                              Loading...
                            </p>
                          </Grid>
                        </AccordionDetails>
                      ) : (
                        entry.products.length &&
                        entry.products.map((product, idy) => (
                          <AccordionDetails key={idy}>
                            <Grid container className="gp-20">
                              <p className="m-width-p">
                                {`Name: ${product.name.toUpperCase()}`}
                              </p>
                              <Divider orientation="vertical" flexItem />
                              <p className="m-width-p">
                                {`Calories: ${product.calories}`}
                              </p>
                              <Divider orientation="vertical" flexItem />
                              <p className="m-width-p">
                                {`Price: ${product.price}`}
                              </p>
                            </Grid>
                          </AccordionDetails>
                        ))
                      )}
                    </Accordion>
                  ))}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
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
    </>
  )
}

export default Main
