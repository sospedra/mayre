const { cloneElement, createElement, isValidElement } = require('react')
const PropTypes = require('prop-types')

const isFunction = (target) => {
  return target && ({}).toString.call(target) === '[object Function]'
}

const isObject = (target, isArray = false) => {
  return typeof target === 'object' && target.hasOwnProperty('length') === isArray
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

  const ofProps = selectWithProps(props.with)
  const element = composeElement(props.of, ofProps)

  // If of element is gonna be render don't evaluate either
  if (shallRenderOf) return element

  const eitherProps = props.orWith ? selectWithProps(props.orWith) : ofProps
  const either = composeElement(props.or, eitherProps)

  // Else return the Either element
  return either
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
