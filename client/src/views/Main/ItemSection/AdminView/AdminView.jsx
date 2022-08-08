import React, { useEffect, useState } from 'react'
import {
  Grid,
  Button,
  Input,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { capitalize } from '../../../../helper/helper'
import { setData } from '../../../../redux/data/Actions'
import axios from 'axios'

const Entries = ({ dataError, email }) => {
  const { token } = useSelector((state) => state.auth)
  const { data } = useSelector((state) => state.data)

  const [expanded, setExpanded] = useState(false)
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [price, setPrice] = useState('')

  const dispatch = useDispatch()

  const handleAccordian = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const editRequest = ( entries ) => {
    axios
      .put(
        `http://localhost:3001/foods`,
        {
          email,
          entries,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleEditClick = (product, productId, entryId) => {
    if (product.edit) {
      let updatedData0 = data.entries
      let products0 = updatedData0[entryId].products
      products0[productId].name = name
      products0[productId].calories = calories
      products0[productId].price = price
      
      editRequest(updatedData0)

      let entries = data.entries
      let products = entries[entryId].products
      products[productId].edit = false
      const updatedData = { data: { entries } }
      dispatch(setData(updatedData))
    } else {
      setName(capitalize(product.name))
      setCalories(product.calories)
      setPrice(product.price)

      let entries = data.entries
      let products = entries[entryId].products
      products[productId].edit = true
      const updatedData = { data: { entries } }
      dispatch(setData(updatedData))
    }
  }

  return data.entries.length ? (
    data.entries.map((entry, idx) => (
      <Accordion
        key={idx}
        expanded={expanded === `panel${idx + 1}`}
        onChange={handleAccordian(`panel${idx + 1}`)}
        className={'w-100'}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Grid className="d-flex flex-direction w-100">
            <p>{entry.date}</p>
          </Grid>
        </AccordionSummary>

        {entry.loading ? (
          <AccordionDetails>
            <Grid container className="gp-20">
              <p className="m-width-p w-100 text-center">Loading...</p>
            </Grid>
          </AccordionDetails>
        ) : (
          entry.products.length &&
          entry.products.map((product, idy) => (
            <AccordionDetails key={idy}>
              {product.edit ? (
                <Grid container className="gp-20">
                  <Input
                    className="w-20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  ></Input>
                  <Input
                    className="w-20"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="Calories"
                  ></Input>
                  <Input
                    className="w-20"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  ></Input>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(product, idy, idx)}
                  >
                    Save
                  </Button>
                </Grid>
              ) : (
                <Grid container className="gp-20">
                  <p className="m-width-p">
                    {`Name: ${capitalize(product.name)}`}
                  </p>
                  <Divider orientation="vertical" flexItem />
                  <p className="m-width-p">{`Calories: ${product.calories}`}</p>
                  <Divider orientation="vertical" flexItem />
                  <p className="m-width-p">{`Price: ${product.price}`}</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(product, idy, idx)}
                  >
                    Edit
                  </Button>
                </Grid>
              )}
            </AccordionDetails>
          ))
        )}
      </Accordion>
    ))
  ) : (
    <h3>{dataError}</h3>
  )
}

const AdminView = () => {
  const { token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [dataError, setDataError] = useState('Select user to fetch entries!')
  const [userEmail, setUserEmail] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:3001/users`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        const users = res.data.users
        setUsers(users)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const fetchUser = (idx) => {
    const email = users[idx].email
    setUserEmail(email)
    axios
      .get(`http://localhost:3001/foods?email=${email}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        if (res.data.result !== null) {
          const data = {
            entries: res.data?.result.entries.map((entry) => {
              entry.products.map((product) => {
                product.edit = false
                return product
              })
              return entry
            }),
          }
          dispatch(setData({ data }))
          setLoading(false)
        } else {
          setDataError('No entries on this user!')
          dispatch(setData({ data: [] }))
        }
      })
      .catch((err) => console.error(err))
  }

  return loading ? (
    <h3>Loading Users...</h3>
  ) : users.length ? (
    <>
      <Grid
        className="column-flex calories-container gp-10 justify-center h-100"
        lg={3}
        sm={3}
      >
        {users.map((user, idx) => (
          <div
            key={idx}
            className="user-container"
            onClick={() => fetchUser(idx)}
          >
            {capitalize(user.username)}
          </div>
        ))}
      </Grid>
      <Grid
        className="column-flex calories-container gp-60 align-center justify-center h-100"
        lg={9}
        sm={9}
      >
        <Entries dataError={dataError} email={userEmail} />
      </Grid>
    </>
  ) : (
    <h3>No users found!</h3>
  )
}

export default AdminView
