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
  },
  {
    key: 'fontWeight',
    type: 'select',
    label: 'Weight',
    props: {
      options: [
        { label: 'Normal', value: 'normal', },
        { label: 'Bold', value: 'bold', }
      ]
    }
  },
  {
    key: 'shadow',
    type: 'shadow',
    label: 'Shadow',
    props: {}
  },
  {
    key: 'fontStyle',
    type: 'radioGroup',
    label: 'Style',
    props: {
      options: [
        { label: 'Normal', value: 'normal', },
        { label: 'Italic', value: 'italic', }
      ],
      optionType: 'button',
      buttonStyle: 'solid',
    }
  },
  {
    key: 'stroke',
    type: 'input',
    label: 'Stroke',
    props: {
      type: 'color',
    }
  },
  {
    key: 'strokeWidth',
    type: 'inputNumber',
    label: 'SWidth',
    props: {
    }
  }
]