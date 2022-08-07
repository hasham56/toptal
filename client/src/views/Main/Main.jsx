import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import ItemModal from '../../modals/ItemModal'
import UserManual from './UserManual/UserManual'
import ItemSection from './ItemSection/ItemSection'
import axios from 'axios'
import './Main.scss'

function Main() {
  const { currentUser, token } = useSelector((state) => state.auth)

  const [result, setResult] = useState([])
  const [modal, openModal] = useState(false)

  useEffect(() => {
    const email = currentUser.email

    axios
      .get(`http://localhost:3001/foods?email=${email}`, {
        headers: {
          Authorization: 'Bearer ' + token,
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

  useEffect(() => {
    console.log(result)
  }, [result])

  return (
    <>
      <Grid
        className="d-flex align-center justify-center login-container"
        container
        lg={12}
        sm={12}
      >
        <Grid lg={3} md={4} xs={10}>
          <UserManual openModal={openModal} />
        </Grid>
        <Grid lg={7} md={4} xs={10}>
          <ItemSection result={result} />
        </Grid>
      </Grid>
      <ItemModal modal={modal} openModal={openModal} setResult={setResult} />
    </>
  )
}

export default Main
