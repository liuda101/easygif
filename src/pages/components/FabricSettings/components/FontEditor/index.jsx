import React from 'react';
import EditorForm from '../EditorForm';

export default ({
  initialValues = {},
  onChange,
}) => {
  return (
    <EditorForm
      initialValues={initialValues}
      onChange={onChange}
      items={[
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
      ]}
    />
  )
}