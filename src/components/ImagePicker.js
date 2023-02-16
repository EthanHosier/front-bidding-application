import React from 'react'

const ImagePicker = ({className, text, onChange}) => {
  return (
    <input type="file" name="file" onChange={(e) => onChange(e.target.files[0])} />
    
  )
}

export default ImagePicker