import React from 'react';
import '../../assets/styles/PlaceCard.css';

const PlaceCard = ({ place }) => {
  return (
    <div className="items-center p-2">
      <div className="flex items-center my-auto">
        {/* Replace with <img src="/img/avatar-1.jpg" alt="" className="h-10 w-10 flex-none rounded-full"> if needed */}
        <div className={`flex-auto ${place.image && "ml-4"}`}>
          <h3 className="text-md font-medium lg:text-lg">
            <a href="/" className="hover:underline">{place.name}</a>
          </h3>
          <div className="sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              {/* icon size 24 */}
              <p className="text-xs font-medium">{place.price}</p>
              <span className="hidden sm:block" aria-hidden="true">&middot;</span>
              <strong className="rounded border border-light-gray-500 bg-gray-0 px-2 py-0.25 text-[10px] font-medium hover:bg-gray-100">
                {place.category}
              </strong>
            </div>
            {/* Other content */}
          </div>
          <p className="mt-1 text-xs text-gray-700">
            {place.note}
          </p>
        </div>
        <div className="pointer-events-auto ml-4 sm:ml-0 flex-none rounded-md px-2 py-[0.3125rem] font-medium text-slate-700">
          {/* Voice Grid */}
          <div className="grid h-[4em] w-[4em] sm:h-20 sm:w-20 shrink-0 place-content-center rounded-full border-2 border-indigo-500 hover:bg-violet-100" aria-hidden="true">
            <div className="flex items-center gap-1">
              <span className="h-3 sm:h-4 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-5 sm:h-6 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-3 sm:h-4 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-4 sm:h-5 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-6 sm:h-8 w-0.5 rounded-full bg-indigo-500"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
