import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid, Paper, Input, Button } from '@material-ui/core'
import { signInUser } from '../../redux/auth/Actions'
import Cookies from 'universal-cookie'
import axios from 'axios'
import './Login.scss'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cookies = new Cookies()

  const [email, setEmail] = useState('')
  const [validationEmail, setValidationEmail] = useState(false)
  const [validationPassword, setValidationPassword] = useState(false)
  const [password, setPassword] = useState('')

  const submitLogin = () => {
    if (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ) &&
      String(password).length > 3
    ) {
      setValidationEmail(false)
      setValidationPassword(false)
    }
    if (password.length <= 3) {
      setValidationPassword(true)
    } else {
      setValidationPassword(false)
    }
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setValidationEmail(true)
    } else {
      setValidationEmail(false)
    }

    axios
      .post('http://localhost:3001/login', {
        email: String(email),
        password: String(password),
      })
      .then((res) => {
        const { data } = res
        const { access_token, user } = data

        cookies.set('token', access_token, { path: '/' })

        dispatch(
          signInUser({
            authenticated: true,
            currentUser: user,
            token: access_token,
          }),
        )
        navigate('/Dashboard')
      })
      .catch((err) => console.log(err))
  }

  return (
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
            <div className="text-heading">TOPTAL</div>
            <div className="column-flex">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              ></Input>
              {validationEmail && (
                <span className="validation-text">Enter correct email!</span>
              )}
            </div>
            <div className="column-flex">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              ></Input>
              {validationPassword && (
                <span className="validation-text">
                  Password length must be greater than 4!
                </span>
              )}
            </div>
            <Button onClick={submitLogin} variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
