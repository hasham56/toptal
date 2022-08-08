import React, { useEffect, useState } from 'react'
import {
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { capitalize } from '../../../../helper/helper'
import { setData } from '../../../../redux/data/Actions'
import axios from 'axios'

const UserView = () => {
  const { data } = useSelector((state) => state.data)
  const { currentUser, token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const dispatch = useDispatch()

  const handleAccordian = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  useEffect(() => {
    const email = currentUser.email
    setLoading(true)
    axios
      .get(`http://localhost:3001/foods?email=${email}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        if (res.data.result !== null) {
          const data = {
            entries: res.data?.result.entries,
          }
          dispatch(setData({ data }))
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Grid
        className="column-flex gp-60 align-center justify-center h-100"
        lg={12}
        sm={12}
      >
        {loading ? (
          <h3>Loading...</h3>
        ) : data.entries.length ? (
          data.entries.map((entry, idx) => (
            <Accordion
              key={idx}
              expanded={expanded === `panel${idx + 1}`}
              onChange={handleAccordian(`panel${idx + 1}`)}
            >
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
                        {`Name: ${capitalize(product.name)}`}
                      </p>
                      <Divider orientation="vertical" flexItem />
                      <p className="m-width-p">
                        {`Calories: ${product.calories}`}
                      </p>
                      <Divider orientation="vertical" flexItem />
                      <p className="m-width-p">{`Price: ${product.price}`}</p>
                    </Grid>
                  </AccordionDetails>
                ))}
            </Accordion>
          ))
        ) : (
          <h3>No entries found!</h3>
        )}
      </Grid>
    </>
  )
}

export default UserView
