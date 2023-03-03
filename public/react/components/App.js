import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { AddPageForm } from './AddPageForm';
import { PageDetails } from './PageDetails';
import apiURL from '../api';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false); // New state variable

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
  function handleAddArticleClick() {
    setIsAddingArticle(true);
  }

  function handleCancelAddArticle() {
    setIsAddingArticle(false);
  }

  async function handleAddArticleSubmit(formData) {
    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({formData})
      });
      const newPage = await response.json();
      setPages([...pages, newPage]);
      setIsAddingArticle(false);
    } catch (err) {
      console.log("Oh no an error! ", err)
    }
  }

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <main>
      <h1>WikiVerse</h1>
      {isAddingArticle ? (
        <AddPageForm
          onCancel={handleCancelAddArticle}
          onSubmit={handleAddArticleSubmit}
        />
      ) : (
        <>
          {selectedPage ? (
            <PageDetails
              page={selectedPage}
              onBackToList={handleBackToList}
            />
          ) : (
            <>
              <button onClick={handleAddArticleClick}>Add Article</button>
              <h2>An interesting 📚</h2>
              <PagesList
                pages={pages}
                onPageSelect={handlePageSelect}
              />
            </>
          )}
        </>
      )}
    </main>
  )
}
