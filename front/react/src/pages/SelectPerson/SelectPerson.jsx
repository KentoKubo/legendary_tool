import React from 'react'

const SelectPerson = () => {
  const getTargetPictures = () => ['pic1', 'pic2', 'pic3']

  const pictures = getTargetPictures()

  return (
    <div>
      <h1>SelectPerson</h1>
      <ul>
        {pictures.map((picture) => (
          <li key={picture}>{picture}</li>
        ))}
      </ul>
    </div>
  )
}

export default SelectPerson
