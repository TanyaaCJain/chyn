// YourMainComponent.js
import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import PlaceCard from './PlaceCard';
// Import your icons here
// import { Bars3Icon, BellIcon, XMarkIcon } from 'Your icon library';

const Places = ({addListUrl, addText}) => {
  const [places] = useState([
    {
      name: 'Pizzeria Picco',
      rating: 4.6,
      price: '$$',
      category: 'Pizza',
      area: 'Larkspur',
      note: 'California-influenced Neapolitan pies',
      try_out: ['Dine-in', 'Take Out', 'No Contact Delivery'],
    },
    {
      name: 'Square Pie Guys',
      rating: 4.4,
      price: '$',
      category: 'Pizza',
      area: 'San Francisco',
      note: 'Brooklyn / deloitte deep style pizza',
      try_out: [ 'Dine-in', 'Take Out', 'Delivery' ]
    },
    {
      name: 'Nourish Cafe',
      rating: 4.5,
      price: '$$',
      category: 'Vegan',
      area: 'San Francisco',
      note: 'Health-focused cafe for salads & more',
      try_out: [ 'Dine-in', 'Take Out', 'Delivery' ]
    },
  ]);
  const [visibility, setVisibility] = useState({
    addMenu: false,
    mapsListInput: false,
  });

  // const toggleAddMenu = (event) => {
  //   event.preventDefault();
  //   setVisibility({ ...visibility, addMenu: !visibility.addMenu });
  // };

  const addViaMapsList = () => {
    console.log('add via maps list');
    // Handle the action here
    addListUrl();
    setVisibility({ ...visibility, addMenu: false });
  };

  const addViaText = () => {
    console.log('add via text');
    // Handle the action here
    addText();
    setVisibility({ ...visibility, addMenu: false });
  };

  return (
    <div className="place-card w-full divide-y divide-slate-400/20 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
      <div className="p-2 flex justify-between">
        <div>
          <h2 className="mt-1 text-xl font-bold sm:text-xl">
            Places
          </h2>
          <div className="sm:flex sm:items-center sm:gap-2">
            San Francisco
          </div>
        </div>
        <Menu as="div" className="relative ml-3 focus:outline-none">
          <Menu.Button className="btn relative flex px-2 rounded-full font-large text-5xl inline-block align-middle text-center text-indigo-600 hover:text-indigo-400 focus:outline-none">
            +
          </Menu.Button>
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <button className="block px-4 py-2 text-sm text-gray-700" onClick={addViaMapsList}>
                Google Maps List URL
              </button>
            </Menu.Item>
            <Menu.Item>
              <button className="block px-4 py-2 text-sm text-gray-700" onClick={addViaText}>
                Paragraph Text
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      {places.map((place, index) => (
        <PlaceCard key={index} place={place} />
      ))}
      <div className="p-4">
        <div className="pointer-events-auto rounded-md px-4 py-2 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
          View all
        </div>
      </div>
    </div>
  );
};

export default Places;
