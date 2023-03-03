import React, { useState } from "react";
import apiURL from "../api";

export const AddPageForm = ({ onAddPage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = {
      title,
      content,
      author,
      tags: tags.split(" "),
    };

    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });
      const pageData = await response.json();
      onAddPage(pageData);
      setTitle("soliana");
      setContent("hjdfkbghkd");
      setAuthor("tesema");
      setTags("ghfhd");
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <br />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <label htmlFor="tags">Tags:</label>
      <input
        type="text"
        id="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <br />
      <button type="submit">Add Page</button>
    </form>
  );
};