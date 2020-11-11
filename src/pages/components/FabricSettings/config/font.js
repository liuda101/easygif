export default [
  {
    key: 'text',
    type: 'input',
    label: 'Content',
    props: {
      placeholder: 'Please input some text',
    }
  },
  {
    key: 'fontSize',
    type: 'slider',
    label: 'Size',
    props: {
      min: 12,
      max: 100,
      step: 1,
    }
  },
  {
    key: 'fill',
    type: 'input',
    label: 'Color',
    props: {
      type: 'color',
    }
  }
]