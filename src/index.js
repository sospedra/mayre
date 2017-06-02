const { cloneElement } = require('react')
const PropTypes = require('prop-types')

const isFunction = (target) => {
  return target && ({}).toString.call(target) === '[object Function]'
}

const Mayre = module.exports = (props) => {
  const shallRenderOf = isFunction(props.when) ? props.when() : props.when
  const element = isFunction(props.of) ? props.of(props.with) : props.of
  const eitherProps = props.orWith || props.with
  const either = isFunction(props.or) ? props.or(eitherProps) : props.or

  return shallRenderOf
    ? cloneElement(element, props.with)
    : either && cloneElement(either, eitherProps)
}

Mayre.defaultProps = {
  or: null,
  with: {}
}

Mayre.propTypes = {
  of: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired,
  or: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  orWith: PropTypes.object,
  when: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  with: PropTypes.object
}
