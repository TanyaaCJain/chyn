import React, { useState } from 'react';
import Layout from '../layout/Layout';
import Places from '../components/place/Places';
import SliderCard from '../components/SliderCard';
import ArrowRight from '../components/icons/IconArrowRight';

const Home = () => {
    const [visibility, setVisibility] = useState({
        mapsListURLInput: false,
        paragraphInput: false
    });

    const toggleVisibility = (key) => {
        setVisibility({ ...visibility, [key]: !visibility[key] });
    };

    const submitMapsListURL = () => {
        toggleVisibility('mapsListURLInput');
    };

    return (
        <Layout>
            <SliderCard className="place-items-center px-4 pt-20 sm:px-6 lg:px-8 pb-20"
                alwaysVisibleContent={
                    <Places
                        addListUrl={() => toggleVisibility('mapsListURLInput')}
                        addText={() => toggleVisibility('paragraphInput')}
                    />
                }
                expandedContent={visibility.mapsListURLInput && (
                    <div className="flex">
                        <label htmlFor="mapsURL" className="w-full ml-1 mr-2 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                            <input
                                type="text"
                                id="mapsURL"
                                placeholder="Enter Google Maps Curated List URL"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 active:border-transparent sm:text-sm"
                            />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Google Maps List URL
                            </span>
                        </label>
                        <button
                            className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                            onClick={submitMapsListURL}
                        >
                            <span className="sr-only">Submit</span>
                            <ArrowRight /> {/* Assuming ArrowRight is a React component */}
                            {/* Loader if needed */}
                        </button>
                    </div>
                )}
            >
            </SliderCard >
        </Layout >
    );
};

export default Home;