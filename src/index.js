const { cloneElement } = require('react')
const PropTypes = require('prop-types')

const isFunction = (target) => {
  return target && ({}).toString.call(target) === '[object Function]'
}

const isObject = (target, isArray = false) => {
  return typeof target === 'object' && target.hasOwnProperty('length') === isArray
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
  const ofProps = selectWithProps(props.with)
  const element = isFunction(props.of) ? props.of(ofProps) : props.of
  const eitherProps = props.orWith ? selectWithProps(props.orWith) : ofProps
  const either = isFunction(props.or) ? props.or(eitherProps) : props.or

  return shallRenderOf
    ? cloneElement(element, ofProps)
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
