const { cloneElement, createElement, isValidElement } = require('react')
const PropTypes = require('prop-types')

const isFunction = (target) => {
  return target && ({}).toString.call(target) === '[object Function]'
}

const isObject = (target, isArray = false) => {
  return typeof target === 'object' && Object.prototype.hasOwnProperty.call(target, 'length') === isArray
}

const composeElement = (candidate, props) => {
  return isValidElement(candidate)
    ? cloneElement(candidate, props)
    : createElement(candidate, props)
}

const selectWithProps = (withProps) => {
  if (isObject(withProps)) return withProps
  if (isObject(withProps, true) && isObject(withProps[0])) {
    return Object.entries(withProps[0]).reduce((memo, [key, value]) => {
      const property = withProps.includes(key) ? { [key]: value } : {}
      return Object.assign({}, memo, property)
    }, {})
  }

  return {}
}

const Mayre = module.exports = (props) => {
  const shallRenderOf = isFunction(props.when) ? props.when() : props.when

  // Avoid unnecessary evaluation
  if (!shallRenderOf && !props.or) return null

  // Vars that can be used both by of and or
  const ofProps = selectWithProps(props.with)

  // Don not evaluate or/of components if not required
  if (shallRenderOf) {
    return composeElement(props.of, ofProps)
  } else {
    const eitherProps = props.orWith ? selectWithProps(props.orWith) : ofProps
    return composeElement(props.or, eitherProps)
  }
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
  orWith: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  when: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  with: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}
