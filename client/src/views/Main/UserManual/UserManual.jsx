import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { Grid, Paper, Button } from '@material-ui/core'
import { capitalize } from '../../../helper/helper'
import { signOutUser } from '../../../redux/auth/Actions'

const UserManual = ({ openModal }) => {
  const { currentUser } = useSelector((state) => state.auth)

  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (currentUser.role === 'admin') {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [])

  const dispatch = useDispatch()
  const cookies = new Cookies()

  const navigate = useNavigate()

  const logoutBtn = () => {
    cookies.remove('token')
    dispatch(signOutUser())
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
        {!admin ? (
          <Button
            onClick={() => {
              openModal(true)
            }}
            variant="contained"
            color="primary"
          >
            Add Item
          </Button>
        ) : (
          <></>
        )}
        <div className="text-heading">Welcome</div>
        {capitalize(currentUser.username)}

        <Button onClick={logoutBtn} variant="contained" color="primary">
          Logout
        </Button>
      </Grid>
    </Paper>
  )
}

export default UserManual
