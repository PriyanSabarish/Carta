// ArticleCard.js
import React from 'react';

const ArticleCard = ({ title, content, author }) => (
  <div className="article-card">
    <div className="article-title">{title}</div>
    <div className="article-content">
      <p>{content}</p>
    </div>
    <div className="article-author">Author: {author}</div>
  </div>
);

export default ArticleCard;
