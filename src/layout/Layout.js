import React from 'react';
import Nav from '../components/Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <div className="w-full h-full">
        <Nav></Nav>
        <div className="relative mx-auto w-full h-screen overflow-hidden max-w-container space-y-20">
          <div className="flex flex-col wrapper">
            <main>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;