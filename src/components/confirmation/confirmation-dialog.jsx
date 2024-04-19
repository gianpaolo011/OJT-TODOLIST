import React from 'react'
import { Button, Dialog, DialogTitle } from '@mui/material'

function ConfirmationDialog ({ isOpen, onClose, handleYes, message }) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle id="responsive-dialog-title">
        {message}
      </DialogTitle>

      <Button autoFocus onClick={handleYes}>
        Yes
      </Button>
      <Button autoFocus onClick={onClose}>
        No
      </Button>
    </Dialog>
  )
}

export default ConfirmationDialog
