import React from 'react'
import PropTypes from 'prop-types'

const Header = () => {
  return (
    <div>Header</div>
  )
}

Header.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    userRegistered: PropTypes.bool
}

export default Header