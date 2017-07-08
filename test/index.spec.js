/* global describe, expect, it */
import React from 'react'
import { render } from 'enzyme'

import Mayre from '../dist/mayre.min'

const Tryout = (props) => <p id='tryout'>{props.name}</p>
const Either = (props) => <p id='either'>{props.name}</p>

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
    const wrapper = render(<Mayre of={Tryout} when with={{ name }} />)

    expect(wrapper.find('#tryout').length).toBe(1)
    expect(wrapper.find('#tryout').text()).toBe(name)
  })

  it('should choose if render any component with a function condition through `when`', () => {
    const wrapper = render(<Mayre of={Tryout} when={() => true} />)
    expect(wrapper.find('#tryout').length).toBe(1)
  })

  it('should render either `of` or if provided `or`', () => {
    const wrapper = render(<Mayre of={Tryout} or={Either} when={false} />)
    expect(wrapper.find('#tryout').length).toBe(0)
    expect(wrapper.find('#either').length).toBe(1)
  })

  it('should render either `or` using `with` props if provided', () => {
    const name = 'Starlord'
    const wrapper = render(<Mayre
      of={Tryout}
      or={Either}
      when={false}
      with={{ name }}
    />)

    expect(wrapper.find('#tryout').length).toBe(0)
    expect(wrapper.find('#either').length).toBe(1)
    expect(wrapper.find('#either').text()).toBe(name)
  })

  it('should render either `or` using `orWith` over `with` props if provided', () => {
    const name = 'Rocket'
    const wrapper = render(<Mayre
      of={Tryout}
      or={Either}
      when={false}
      with={{ name: 'Drax' }}
      orWith={{ name }}
    />)

    expect(wrapper.find('#tryout').length).toBe(0)
    expect(wrapper.find('#either').length).toBe(1)
    expect(wrapper.find('#either').text()).toBe(name)
  })

  it('should pick the given keys for a provided object', () => {
    const parentProps = { name: 'Groot', height: 'Variable' }
    const wrapper = render(<Mayre
      of={Tryout}
      when
      with={[parentProps, 'name']}
    />)

    expect(wrapper.find('#tryout').length).toBe(1)
    expect(wrapper.find('#tryout').text()).toBe(parentProps.name)
  })
})
