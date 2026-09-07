import React from 'react';
import { NavLink } from 'react-router-dom';
import { infoCategories } from '../data/infoDatabase';
import './DocsSidebar.css';

const DocsSidebar = () => {
  return (
    <aside className="docs-sidebar">
      {infoCategories.map((category) => (
        <div key={category.id} className="docs-category">
          <h4 className="docs-category-title">{category.title}</h4>
          <ul className="docs-nav-list">
            {category.items.map((item) => (
              <li key={item.id} className="docs-nav-item">
                <NavLink 
                  to={`/info/${category.id}/${item.id}`}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default DocsSidebar;
