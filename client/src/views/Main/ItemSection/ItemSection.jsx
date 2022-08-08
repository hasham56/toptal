import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Paper } from '@material-ui/core'
import AdminView from './AdminView/AdminView'
import UserView from './UserView/UserView'

const ItemSection = () => {
  const { currentUser } = useSelector((state) => state.auth)

  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (currentUser.role === 'admin') {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [])

  return admin ? (
    <Paper
      className="boder-rounded calories-container p-inline d-flex align-center justify-center m-inline card-height"
      elevation={3}
    >
      <AdminView />
    </Paper>
  ) : (
    <Paper
      className="boder-rounded calories-container p-inline d-flex align-center justify-center m-inline card-height"
      elevation={3}
    >
      <UserView />
    </Paper>
  )
}

export default ItemSection
