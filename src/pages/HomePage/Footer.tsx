import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <div data-testid="home-footer" className="container footer">
      <div className="max-w-mobile">
        <i>
          <small>
            This is a demo application. All data displayed is fictitious.
          </small>
        </i>
      </div>
    </div>
  );
};
