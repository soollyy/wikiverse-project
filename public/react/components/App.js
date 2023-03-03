import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
// import { PageDetails } from './PageDetails';
import apiURL from '../api';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err)
    }
  }

  async function fetchPage(slug) {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`);
      const pageData = await response.json();
      setSelectedPage(pageData);
    } catch (err) {
      console.log("Oh no an error! ", err)
    }
  }

  function handlePageSelect(slug) {
    fetchPage(slug);
  }

  function handleBackToList() {
    setSelectedPage(null);
  }

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <main>
      <h1>WikiVerse</h1>
      {
        selectedPage ? (
          <PageDetails
            page={selectedPage}
            onBackToList={handleBackToList}
          />
        ) : (
          <>
            <h2>An interesting 📚</h2>
            <PagesList
              pages={pages}
              onPageSelect={handlePageSelect}
            />
          </>
        )
      }
    </main>
  )
}
