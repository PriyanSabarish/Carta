import React, { useState } from 'react';
import Dropdown from './dropdown.js';
import ArticleCard from './articlecard.js';
import DropdownFilter from './dropdownfilter.js';
import SearchComponent from './search_comp.js';
import './search_comp.css';
// ArticleList component with filter
const ArticleList = ({ articles, filter, search }) => {
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(filter.toLowerCase()) &&
      article.title.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      
      <div>
        {filteredArticles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            content={article.content}
            author={article.author}
          />
        ))}
      </div>
    );
  };

export const SearchPage = () => {
    const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
    const articlesData = [
      {
        title: 'Application and existing problems of computer network technology in the field of artificial intelligence',
        content: '2021 2nd International Conference on Artificial Intelligence and Computer Engineering (ICAICE)',
        author: 'Qi Yuan,Genjin Chen',
      },
      {
        title: 'A Review on Artificial Intelligence with Deep Human Reasoning',
        content: '2022 International Conference on Applied Artificial Intelligence and Computing (ICAAIC)',
        author: 'Janmanchi Harika Palavadi Baleeshwar Kummari Navya Hariharan Shanmugasundaram',
      },
      {
        title: 'A Review on Artificial Intelligence with Deep Human Reasoning',
        content: '2022 International Conference on Applied Artificial Intelligence and Computing (ICAAIC)',
        author: 'Janmanchi Harika Palavadi Baleeshwar Kummari Navya Hariharan Shanmugasundaram',
      },
      {
        title: 'A Review on Artificial Intelligence with Deep Human Reasoning',
        content: '2022 International Conference on Applied Artificial Intelligence and Computing (ICAAIC)',
        author: 'Janmanchi Harika Palavadi Baleeshwar Kummari Navya Hariharan Shanmugasundaram',
      },
      // Add more articles as needed
    ];
  
    const handleFilterChange = (selectedOption) => {
      setFilter(selectedOption);
    };
  
    const handleSearchChange = (value) => {
      setSearchTerm(value);
    };
  
    const filterOptions = ['All', 'Web Development', 'CSS', /* Add more options */];
  
    return (
  
      <div>
        <div className='main-dappa'>
        <div className='button-dappa'>
            <SearchComponent onSearch={handleSearchChange} />
            <Dropdown/>
            <DropdownFilter options={filterOptions} onSelect={handleFilterChange} />
        </div>
        <div className='article-dappa'>
          <ArticleList
           articles={articlesData}
          filter={filter}
          search={searchTerm}
          />
        </div>
        </div>
      </div>
    );
}