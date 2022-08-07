import React, { useState } from 'react'
import {
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'
import { capitalize } from '../../../../helper/helper'

const UserView = ({ result }) => {
  return (
    <>
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
          ))}
      </Grid>
    </>
  )
}

export default UserView
