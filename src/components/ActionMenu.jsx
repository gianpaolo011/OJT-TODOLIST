import { MoreVert } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const ActionMenu = (props) => {
  const { id, item, opens, handleClick } = props
  return (
    <Button
      sx={{ backgroundColor: 'transparent' }}
      id="basic-button"
      aria-controls={opens ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={opens ? 'true' : undefined}
      onClick={(e) => handleClick(e, id, item)}
    >
      {' '}
      {<MoreVert className="editable"></MoreVert>}
    </Button>
  )
}

export default ActionMenu
