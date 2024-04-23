import React from 'react'
import { Button, Dialog, DialogTitle } from '@mui/material'
import '../../assets/styles/confirmation-dialog.scss'

function ConfirmationDialog ({ isOpen, onClose, handleYes, message }) {
  return (
    <Dialog open={isOpen}className='dialog'>
      <DialogTitle id="responsive-dialog-title" className='dialog__confirmation-title'>
        {message}
      </DialogTitle>

      <Button autoFocus onClick={handleYes} className='dialog__confirmation-btn-yes'>
        Yes
      </Button>
      <Button autoFocus onClick={onClose} className='dialog__confirmation-btn-no'>
        No
      </Button>
    </Dialog>
  )
}

export default ConfirmationDialog
