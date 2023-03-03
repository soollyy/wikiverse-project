import React from 'react';
import { Page } from './Page';

export const PagesList = ({ pages, onPageSelect }) => {
  return (
    <>
      {
        pages.map((page, idx) => {
          return (
            <div key={idx} onClick={() => onPageSelect(page.slug)}>
              <Page page={page} />
            </div>
          )
        })
      }
    </>
  );
}
