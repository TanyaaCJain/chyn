import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Places from '../components/place/Places';
import SliderCard from '../components/SliderCard';
import ArrowRight from '../components/icons/IconArrowRight';
import { getPlaces, addPlace } from '../api';
import PlacesContext from '../contexts/PlacesContext';
import { MapCenterProvider } from '../contexts/MapCenterContext';
import { getAWSCredentials, generatePlaces } from '../api';
import { config } from 'aws-sdk';

const Home = () => {
    // const AnthropicBedrock = require('@anthropic-ai/bedrock-sdk');
    const [isLoading, setIsLoading] = useState(true);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [visibility, setVisibility] = useState({
        mapsListURLInput: false,
        paragraphInput: false,
        placeText: false,
    });

    const toggleVisibility = (key) => {
        setVisibility({ ...visibility, [key]: !visibility[key] });
    };

    const [places, setPlaces] = useState([]);
    const fetchPlaces = async () => {
        let data = {}
        if (lat && lng) {
            data = await getPlaces(lat, lng);
        } else {
            data = await getPlaces();
        }
        console.log(`data`, data);
        setPlaces(data);
        setIsLoading(false);
    };

    const submitMapsListURL = () => {
        toggleVisibility('mapsListURLInput');
    };

    const submitParagraph = async () => {
        toggleVisibility('paragraphInput');
        const request_data = {
            "paragraph": document.getElementById("paragraph").value
        }
        try {
            const response = await generatePlaces(request_data);
            const parsed_json = JSON.parse(response);
            console.log(`parsed_json`, parsed_json);
            for (let place of parsed_json) {
                const response = await addPlace(place);
                console.log(`add Place response`, response);
            }
            fetchPlaces();
        } catch (error) {
            console.error(error);
        }
    }

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
        } catch (error) {
            console.error(error);
        }
    }

    

    // Functions run on page load
    useEffect(() => {
        async function getCurrentLocation() {
            if (!navigator.geolocation) {
                console.log('Geolocation is not supported by your browser');
                return;
            }
            await navigator.geolocation.getCurrentPosition(
                (position) => {
    
                    console.log(`position`, position.coords.latitude, position.coords.longitude);
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                    console.log(`location`, lat, lng);
                    setIsLoading(false);
                },
                () => {
                    console.log('Unable to retrieve your location');
                    setIsLoading(false);
                    return;
                }
            );
        };

        getCurrentLocation();
    }, [lat, lng]);

    useEffect(() => {
        if (lat !== null && lng !== null) {
            setIsLoading(true);
            fetchPlaces();
        }
    }, [lat, lng]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        async function fetchData() {
            const response = await getAWSCredentials();
            if (response) {
                const credentials = response;
                config.update({
                    accessKeyId: credentials.AccessKeyId,
                    secretAccessKey: credentials.SecretAccessKey,
                    region: credentials.Region
                });
                // const client = new AnthropicBedrock({
                //     awsAccessKey: credentials.AccessKeyId,
                //     awsSecretKey: credentials.SecretAccessKey,
                //     awsRegion: credentials.Region,
                // });
            }
        }
        fetchData();
    }, []);

    return (
        <PlacesContext.Provider value={{ places, setPlaces }}>
            <MapCenterProvider>
                <Layout>
                    <SliderCard
                        places={places}
                        className="place-items-center px-4 pt-20 sm:px-6 lg:px-8 pb-20"
                        alwaysVisibleContent={
                            <>
                                {isLoading && (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-4 
                                border-gray-200"></div>
                                    </div>
                                )}
                                {!isLoading && (
                                    <Places
                                        places={places}
                                        addListUrl={() => toggleVisibility('mapsListURLInput')}
                                        addText={() => toggleVisibility('paragraphInput')}
                                        addPlace={() => toggleVisibility('placeText')}
                                    />
                                )}
                            </>
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
                                {visibility.paragraphInput && (
                                    <div className="flex">
                                        <label htmlFor="paragraph" className="w-full ml-1 mr-2 relative block overflow-hidden rounded-md 
                                        border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1
                                        focus-within:ring-blue-600">
                                            <input 
                                                id="paragraph" rows="5" cols="50" placeholder="Enter Paragraph" 
                                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent 
                                                focus:border-transparent focus:outline-none focus:ring-0 active:border-transparent 
                                                sm:text-sm" 
                                            />
                                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                                Paragraph
                                            </span>
                                        </label>
                                        <button
                                            className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 
                                            hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                                            onClick={submitParagraph}
                                        >
                                            <span className="sr-only">Submit</span>
                                            <ArrowRight /> 
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
            </MapCenterProvider>
        </PlacesContext.Provider>
    );
};

export default Home;