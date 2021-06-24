import React from 'react';

export const Content = () => {
  return (
    <div data-testid="home-content" className="container">
      <main className="max-w-mobile pt-4 pb-2">
        <p className="m-0">Every account comes with:</p>
        <ul className="m-0">
          <li>0-second execution</li>
          <li>Portfolio insurance</li>
          <li>1 popsicle</li>
        </ul>
        <p className="mt-2">We love to trade, and we hope you do too!</p>
        <p>
          Now you can express that love with the latest trading platform from
          Bullsfirst. We guarantee a 0-second trade execution, and will give you
          a free popsicle if your trade doesn’t go through in this time period.
        </p>
        <p>
          <i>
            On a side-note, we just bought a big freezer and 10,000 popsicles.
            Thankfully, we’ve hedged all popsicle expenses for the next two
            years! (Commodity experts say popsicles are on the rise).
          </i>
        </p>
      </main>
    </div>
  );
};
