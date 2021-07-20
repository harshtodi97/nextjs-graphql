import React from 'react'
import { TextField, Button } from '@material-ui/core'

const SubmitBlogPostForm = ({onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField fullWidth variant="filled" color="primary" multiline rows={3} margin="normal" name="text" />
      <Button variant="contained" color="primary" type="submit">Submit</Button>
    </form>
  )
}

export default SubmitBlogPostForm
