import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Places from '../components/place/Places';
import SliderCard from '../components/SliderCard';
import ArrowRight from '../components/icons/IconArrowRight';
import { getPlaces, addPlace } from '../api';
import PlacesContext from '../contexts/PlacesContext';

const Home = () => {
    const [visibility, setVisibility] = useState({
        mapsListURLInput: false,
        paragraphInput: false
    });

    const toggleVisibility = (key) => {
        setVisibility({ ...visibility, [key]: !visibility[key] });
    };

    // const [places] = useState([
    //   {
    //     name: 'Pizzeria Picco',
    //     rating: 4.6,
    //     price: '$$',
    //     category: 'Pizza',
    //     area: 'Larkspur',
    //     note: 'California-influenced Neapolitan pies',
    //     try_out: ['Dine-in', 'Take Out', 'No Contact Delivery'],
    //   },
    //   {
    //     name: 'Square Pie Guys',
    //     rating: 4.4,
    //     price: '$',
    //     category: 'Pizza',
    //     area: 'San Francisco',
    //     note: 'Brooklyn / deloitte deep style pizza',
    //     try_out: [ 'Dine-in', 'Take Out', 'Delivery' ]
    //   },
    //   {
    //     name: 'Nourish Cafe',
    //     rating: 4.5,
    //     price: '$$',
    //     category: 'Vegan',
    //     area: 'San Francisco',
    //     note: 'Health-focused cafe for salads & more',
    //     try_out: [ 'Dine-in', 'Take Out', 'Delivery' ]
    //   },
    // ]);
    const [places, setPlaces] = useState([]);
    const fetchPlaces = async () => {
        const data = await getPlaces();
        console.log(`data`, data);
        setPlaces(data);
    };

    const submitMapsListURL = () => {
        toggleVisibility('mapsListURLInput');
    };

    const submitPlaceDetails = async () => {
        toggleVisibility('placeText');
        const request_data = {
            "name": document.getElementById("placeName").value,
            "notes": document.getElementById("placeNotes").value
        }
        try {
            const response = await addPlace(request_data);
            if (response.status === 200) {
                fetchPlaces();
            }
            // setPlaces(prevPlaces => [...prevPlaces, response.data]);
        } catch (error) {
            console.error(error);
        }
    }

    // Functions run on page load
    useEffect(() => {
        fetchPlaces();
    }, []);

    return (
        <PlacesContext.Provider value={{ places, setPlaces }}>
            <Layout>
                <SliderCard className="place-items-center px-4 pt-20 sm:px-6 lg:px-8 pb-20"
                    alwaysVisibleContent={
                        <Places
                            places={places}
                            addListUrl={() => toggleVisibility('mapsListURLInput')}
                            addText={() => toggleVisibility('paragraphInput')}
                            addPlace={() => toggleVisibility('placeText')}
                        />
                    }
                    expandedContent={
                        <>
                        {visibility.mapsListURLInput && (
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
                        {visibility.placeText && (
                            <div className="flex">
                                <div className="mr-2 w-full">
                                    <label htmlFor="placeName" className="w-full ml-1 mr-2 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                                        <input
                                            type="text"
                                            id="placeName"
                                            placeholder="Enter Place Name"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 active:border-transparent sm:text-sm"
                                        />
                                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                            Place Name
                                        </span>
                                    </label>
                                    <label htmlFor="placeNotes" className="w-full ml-1 mr-2 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                                        <input
                                            type="text"
                                            id="placeNotes"
                                            placeholder="Enter Notes"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 active:border-transparent sm:text-sm"
                                        />
                                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                            Place Notes
                                        </span>
                                    </label>
                                </div>
                                <button
                                    className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                                    onClick={submitPlaceDetails}
                                >
                                    <span className="sr-only">Submit</span>
                                    <ArrowRight /> {/* Assuming ArrowRight is a React component */}
                                    {/* Loader if needed */}
                                </button>
                            </div>
                        )}
                        </>
                    }
                >
                </SliderCard >
            </Layout >
        </PlacesContext.Provider>
    );
};

export default Home;