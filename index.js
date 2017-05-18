import React from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash.isfunction'

const Mayre = (props) => {
  const canRender = isFunction(props.when) ? props.when() : props.when

  return canRender ? <props.of {...props.with} /> : null
}

Mayre.defaultProps = {
  when: true,
  with: {},
}

Mayre.propTypes = {
  of: PropTypes.func,
  when: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  with: PropTypes.object,
}

export default Mayre
