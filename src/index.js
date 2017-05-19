const { cloneElement } = require('react')
const PropTypes = require('prop-types')

const isFunction = (target) => {
  return target && ({}).toString.call(target) === '[object Function]'
}

const Mayre = module.exports = (props) => {
  const canRender = isFunction(props.when) ? props.when() : props.when
  const element = isFunction(props.of) ? props.of(props.with) : props.of

  return canRender ? cloneElement(element, props.with) : null
}

Mayre.defaultProps = {
  with: {}
}

Mayre.propTypes = {
  of: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired,
  when: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  with: PropTypes.object
}
