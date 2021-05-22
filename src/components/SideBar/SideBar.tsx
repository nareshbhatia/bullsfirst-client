import React from 'react';
import { ScrollingContainer } from '../Containers';
import './SideBar.css';

export interface NavItem {
  id: string;
  name: string;
}

export interface SideBarProps {
  title?: string;
  items?: Array<NavItem>;
  selectedNavItemId: string;
  onNavItemSelected: (navItemId: string) => void;
}

export const SideBar = ({
  title,
  items,
  selectedNavItemId,
  onNavItemSelected,
}: SideBarProps) => {
  return (
    <div data-testid="sidebar" className="sidebar">
      <ScrollingContainer className="flex-1 p-2">
        {title !== undefined ? (
          <h1 className="sidebar__title">{title}</h1>
        ) : null}
        {items !== undefined ? (
          <ul className="sidebar__items">
            {items.map((item) => (
              <li
                key={item.id}
                className={`sidebar__item
                ${item.id === selectedNavItemId ? 'sidebar__item--active' : ''}
              `}
                onClick={() => onNavItemSelected(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        ) : null}
      </ScrollingContainer>
    </div>
  );
};
