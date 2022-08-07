import React from 'react'
import { Paper } from '@material-ui/core'
import AdminView from './AdminView/AdminView'
import UserView from './UserView/UserView'

const ItemSection = ({ result }) => {
  const adminRole = true

  return adminRole ? (
    <Paper
      className="boder-rounded calories-container p-inline d-flex align-center justify-center m-inline card-height"
      elevation={3}
    >
      <AdminView result={result} />
    </Paper>
  ) : (
    <Paper
      className="boder-rounded calories-container p-inline d-flex align-center justify-center m-inline card-height"
      elevation={3}
    >
      <UserView result={result} />
    </Paper>
  )
}

export default ItemSection
