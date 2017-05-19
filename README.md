Mayre
=====

Maybe render a React component, maybe not 😮

While working with React you'll find yourself making conditionals
components quite a lot of times. And they're always the same: a component which
upon a set of conditions may render or just return null (or short-circuit it).

Here comes Mayre (May**b**e render)! A very simple and ultra light component
tackle this issue from the render function.

### Usage

There are three props you can use: `of`, `when` and `whith`.

```js
<Mayre
  of={MyComponent}
  when={props.something > 10}
  with={{ some: 'thing' }}
/>
```

### Props

| Name | Required | Default   | Comment                              |
|------|----------|-----------|--------------------------------------|
| of   | Yes      | -         | The React component to be rendered   |
| when | No       | `false`   | The render condition                 |
| with | No       | `{}`      | Props to be passed to `of` component |
