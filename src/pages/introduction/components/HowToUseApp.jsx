import React from 'react';
import ReactMarkdown from 'react-markdown';

const markdown = `# How to use

## 1. Select a gif to edit

## 2. Transform a mp4 to gif

## 3. Make a gif with pictures

`;

export default () => {
  return (
    <ReactMarkdown children={markdown} />
  )
}