import React from 'react';

import "./DocsTitle.css"

export default function DocsTitle({children}) {
  return (
    <h2 className='docs-title'>{children}</h2>
  );
}
