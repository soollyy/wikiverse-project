import React from 'react';
import { Page } from './Page';

export const PageDetails = ({ page, onBackToList }) => {
  return (
    <>
      <button onClick={onBackToList}>Back to Wiki List</button>
      <h3>{page.title}</h3>
      <p>Author: {page.author}</p>
      <p>Content: {page.content}</p>
      <p>Tags: {page.tags.join(', ')}</p>
      <p>Created At: {page.createdAt}</p>
    </>
  );
}
