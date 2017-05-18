import React from 'react'
import { shallow } from 'enzyme'

// import Mayre from '../build/bundle.min'
const Mayre = (props) => {
  return props.when ? <props.of {...props.with} /> : null
}

const Tryout = (props) => <p id='tryout'>{props.name}</p>

describe('Mayre suite', () => {
  fit('should render any component through `of`', () => {
    const wrapper = shallow(<Mayre of={Tryout} />)
    expect(wrapper.find(Tryout)).toBe(true)
  })

  it('should render any component with props through `with`', () => {
    expect(<Mayre of={Tryout} with={{ name: 'Gamora' }}/>).toMatchSnapshot()
  })

  it('should render any component with a positive condition through `when`', () => {
    expect(<Mayre of={Tryout} when={5 > 10} />).toMatchSnapshot()
  })

  it('should not render any component with a negative condition through `when`', () => {
    expect(<Mayre of={Tryout} when={5 < 10} />).toMatchSnapshot()
  })

  it('should choose if render any component with a function condition through `when`', () => {
    expect(<Mayre of={Tryout} when={() => true} />).toMatchSnapshot()
  })
})
