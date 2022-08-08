import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import ItemModal from '../../modals/ItemModal'
import UserManual from './UserManual/UserManual'
import ItemSection from './ItemSection/ItemSection'
import './Main.scss'

const Main = () => {
  const [modal, openModal] = useState(false)

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
          <ItemSection />
        </Grid>
      </Grid>
      <ItemModal modal={modal} openModal={openModal} />
    </>
  )
}

export default Main
