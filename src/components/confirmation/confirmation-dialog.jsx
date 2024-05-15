import React from 'react'
import { Button, Dialog, DialogTitle, Divider } from '@mui/material'
import '../../assets/styles/confirmation-dialog.scss'

function ConfirmationDialog({
  isOpen,
  onClose,
  handleYes,
  message,
  backgroundColor,
  textColor,
}) {
  return (
    <Dialog
      open={isOpen}
      className="dialog"
      PaperProps={{
        style: {
          borderRadius: '10px',
          backgroundColor: backgroundColor,
          color: textColor,
        },
      }}
    >
      <DialogTitle
        id="responsive-dialog-title"
        className="dialog__confirmation-title"
      >
        {message}
      </DialogTitle>
      <Divider />
      <Button
        autoFocus
        onClick={handleYes}
        className="dialog__confirmation-btn-yes"
      >
        Yes
      </Button>
      <Button
        autoFocus
        onClick={onClose}
        className="dialog__confirmation-btn-no"
      >
        No
      </Button>
    </Dialog>
  )
}

export default ConfirmationDialog
