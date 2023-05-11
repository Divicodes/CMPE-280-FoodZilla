import React, { Component } from "react";
// import ImageGallery from "react-image-gallery";
import NavComponent from "../SharedComponents/NavComponent";
import { useState } from "react";
import axios from "axios";
import "./Home.css";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const images = [
    {
      original:
        "https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1573133725500-Y5PCN0V04I86HDAT8AT0/WBC_7095.jpg?format=2500w",
    },
    {
      original:
        "https://www.gfs.com/sites/default/files/styles/hero_image_modern_/public/hero-modern/foodscape-issue1-hero.jpg?itok=r_mKc_-X",
    },
  ];
  const search = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt:
            "Answer only food related queries. If other queries are asked, tell the user Welcome to Foodzilla. Please ask food related question. You are a nutrional specialist and masterchef on all kinds of cuisine,answer the following queries descripteively without further questions \n " +
            query,
          // "give the calories, fat, protein etc. values per portion of " +
          // query +
          // "." +
          // "What is the benefit of eating " +
          // query +
          // "?",
          model: "text-davinci-002",
          max_tokens: 1000,
          temperature: 0.4,
          top_p: 1,
          n: 1,
          //   stop: "\n",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`, // Replace with your GPT-3 API key
          },
        }
      );

      const completion = response.data.choices[0].text.trim();
      setResults(completion);
      setIsLoading(false);
      console.log(completion);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <NavComponent view="unknown"></NavComponent>
      <h1>Watch What You EAT</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter your search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>
      <div className="loading">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="results">
            {results.length > 0 ? (
              <ul>
                {results.split(/\r?\n/).map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
