# <a href='https://github.com/sospedra/mayre'><img src='https://cloud.githubusercontent.com/assets/3116899/26548775/19e2557e-4476-11e7-86fa-831315d58cb0.png' height='60'></a>

Maybe render a React component, maybe not 😮

[![Build Status](https://travis-ci.org/sospedra/mayre.svg?branch=master)](https://travis-ci.org/sospedra/mayre)
[![dependencies Status](https://david-dm.org/sospedra/mayre/status.svg)](https://david-dm.org/sospedra/mayre)
[![Code Climate](https://codeclimate.com/github/sospedra/mayre/badges/gpa.svg)](https://codeclimate.com/github/sospedra/mayre)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

```
// Get it!
yarn add mayre
npm install --save mayre
```

While working with React you'll find yourself making conditionals
components quite a lot of times. And they're always the same: a component which
upon a set of conditions may render or just return null (or short-circuit it).

Here comes Mayre (May**b**e render)! A very simple and ultra light (633 bytes)
component to tackle this issue from the `jsx` side.

Compatible with *React*, *React-Native* and *ReactVR*.

### Usage

#### Maybe

There are three props you can use: `of`, `when` and `with`.

```js
<Mayre
  of={MyComponent}
  when={props.something > 10}
  with={{ some: 'thing' }}
/>
```

Note that `of` can be a component instance or declaration. And when can be boolean
or a function.

```js
<Mayre
  of={<p>Something</p>}
  when={() => checkWhatever()}
/>
```

#### Either

But not only this! Conditional rendering isn't only about mount this component
or not. We can also use Mayre to render either this element or the other.

```js
<Mayre
  of={<p>Either this</p>}
  or={<p>Or this one</p>}
  when={whateverCondition}
/>
```

If a `with` prop is provided it'll be applied to both of them. If you want to specify special props for each of them use `orWith`.

```js
<Mayre
  of={<p>Either this</p>}
  or={<p>Or this one</p>}
  when={whateverCondition}
  with={{ appliedTo: 'of' }}
  orWith={{ appliedTo: 'this will used by or element' }}
/>
```

#### Auto props picking

Most of the times the component rendered by Mayre is a subset of a bigger one.
Hence, it's using a selection of the parent props. That's why Mayre has a special
syntax to pick the props you need to while passing them down.

```js
<Mayre
  of={MyComponent}
  when={props.something > 10}
  with={[props, 'thisProps', 'andThisOther']}
/>
```

Same can be applied for `orWith` attribute.

### Props

| Name   | Required | Default | Type              |Comment                                 |
|--------|----------|---------|-------------------|----------------------------------------|
| of     | Yes      | -       | `func`, `element` | The React component to be rendered     |
| or     | No       | `null`  | `func`, `element` | The React component rendered instead of `of`  |
| when   | No       | `false` | `bool`, `func`    | The render condition                    |
| with   | No       | `{}`    | `object`, `array` | Props to be passed to `of/or` component |
| orWith | No       | `{}`    | `object`, `array` | Props to be passed to `or` component    |

### Benefit

Stop doing this:

```js
// no more dumb render methods pollution
const renderSomething = (canRender, propsFromParent) => {
  if (!canRender) return null

  return <Something {...propsFromParent} />
}

const Parent = (props) => (
  <div>
    {renderSomething(props.a === props.b, props)}
  </div>
)
```
