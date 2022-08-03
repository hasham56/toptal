import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import axios from 'axios'

function Main() {

  useEffect(() => {
    const email = localStorage.getItem('email')
    axios.post('http://localhost:3001/foods', {
      data: {
        email
      },
      headers: { 
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
    .then(res => {
      // const { data } = res
      // const { accessToken, username } = data
      // localStorage.setItem('access_token', accessToken)
      // localStorage.setItem('email', String(email))
      // localStorage.setItem('username', String(username))
      // navigate('/dashboard')
      console.log(res)
    })
    .catch(err => console.log(err))
  }, [])
  
  return (
    <Grid className="d-flex align-center justify-center login-container" container lg={12} sm={12}>
    <Grid lg={3} md={4} xs={10}>
      <Paper className="boder-rounded p-inline d-flex align-center justify-center m-inline card-height" elevation={3}>
          <Grid className="column-flex gp-60 align-center justify-center h-100" lg={12} sm={12}>
          <div className="text-heading">
              Welcome
          </div>
          {String(localStorage.getItem('username')).toUpperCase()}
          </Grid>
      </Paper>
    </Grid>
    <Grid lg={7} md={4} xs={10}>
      <Paper className="boder-rounded p-inline d-flex align-center justify-center m-inline card-height" elevation={3}>
          <Grid className="column-flex gp-60 align-center justify-center h-100" lg={12} sm={12}>
          <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Aug 9th, 2022</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
          </Grid>
      </Paper>
    </Grid>
  </Grid>
  )
}

export default Main