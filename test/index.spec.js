import React from 'react'
import { render } from 'enzyme'

import Mayre from '../build/mayre.min'

const Tryout = (props) => <p id='tryout'>{props.name}</p>

describe('Mayre suite', () => {
  it('should render any component through `of` and `when`', () => {
    const wrapper = render(<Mayre of={Tryout} when />)
    expect(wrapper.find('#tryout').length).toBe(1)
  })

  it('should not render any component through only `of`', () => {
    const wrapper = render(<Mayre of={Tryout} />)
    expect(wrapper.find('#tryout').length).toBe(0)
  })

  it('should not render any component with a negative condition through `when`', () => {
    const wrapper = render(<Mayre of={Tryout} when={5 > 10} />)
    expect(wrapper.find('#tryout').length).toBe(0)
  })

  it('should render any component with props through `with`', () => {
    const name = 'Gamora'
    const wrapper = render(<Mayre of={Tryout} when with={{ name }}/>)

    expect(wrapper.find('#tryout').length).toBe(1)
    expect(wrapper.find('#tryout').text()).toBe(name)
  })

  it('should choose if render any component with a function condition through `when`', () => {
    const wrapper = render(<Mayre of={Tryout} when={() => true} />)
    expect(wrapper.find('#tryout').length).toBe(1)
  })
})
