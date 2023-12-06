import React from 'react';
import Nav from '../components/Nav';
// import SFMap from '../assets/img/SFMap.jpg';

const Layout = ({ children }) => {
  return (
    <div>
      <div className="w-full h-full">
        <Nav></Nav>
        <div className="relative mx-auto w-full h-screen overflow-hidden max-w-container space-y-20">
          <div className="flex flex-col wrapper">
            <main>
              {/* <div className="h-screen w-screen">
                <img src={SFMap} alt="SF Map background" className="h-full w-full object-cover" />
              </div> */}
              {children}
            </main>
          </div>
        </div>
      </div>
      {/* <div className="h-screen w-screen">
        <img src="../assets/img/SFMap.jpg" alt="SF Map background" className="h-full w-full object-cover" />
      </div> */}
      {/* Footer can go here */}
    </div>
  );
};

export default Layout;