import React, { useRef, useEffect } from 'react';

export default () => {
  const container = useRef(null);
  useEffect(
    () => {
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';

      script.setAttribute('repo', 'liuda101/easygif');
      script.setAttribute('issue-term', 'title');
      script.setAttribute('theme', 'github-dark');
      script.setAttribute('crossorigin', 'anonymous');
      script.setAttribute('label', 'discuss');

      script.async = true;
      container.current.appendChild(script);
    },
    [],
  );

  return (
    <div ref={container} />
  )
}
