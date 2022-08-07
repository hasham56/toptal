import React, { useState } from 'react'
import {
  Grid,
  Button,
  Input,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import { capitalize } from '../../../../helper/helper'

const AdminView = ({ result }) => {
  const [expanded, setExpanded] = useState(false)

  const handleAccordian = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleEditClick = (panel) => (e) => {
    e.stopPropagation()
    setExpanded(panel)
  }
  return (
    <>
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
                    <p className="m-width-p w-100 text-center">Loading...</p>
                  </Grid>
                </AccordionDetails>
              ) : (
                entry.products.length &&
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
                ))
              )}
            </Accordion>
          ))}
      </Grid>
    </>
  )
}

export default AdminView
