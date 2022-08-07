import React from 'react'
import { Grid, Paper, Button } from '@material-ui/core'
import { capitalize } from '../../../helper/helper'
import { useNavigate } from 'react-router-dom'

const UserManual = ({ openModal, username, setUser }) => {
  const navigate = useNavigate()

  const logoutBtn = () => {
    localStorage.setItem('access_token', '')
    localStorage.setItem('email', '')
    localStorage.setItem('username', '')
    setUser({ username: '', access_token: '', email: '' })
    navigate('/Login')
  }

  return (
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
        {capitalize(username)}

        <Button onClick={logoutBtn} variant="contained" color="primary">
          Logout
        </Button>
      </Grid>
    </Paper>
  )
}

export default UserManual
