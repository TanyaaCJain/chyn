import React, { useState, useContext, useRef } from 'react';
import PlacesContext from '../../contexts/PlacesContext';
import IconEdit from '../icons/IconEdit';
import IconDelete from '../icons/IconDelete';
import IconArrowRight from '../icons/IconArrowRight';
import IconMapPin from '../icons/IconMapPin';
import '../../assets/styles/PlaceCard.css';
import { updatePlace, deletePlace } from '../../api';
import { Polly } from 'aws-sdk';
import { MapCenterContext } from '../../contexts/MapCenterContext';

const PlaceCard = ({ place }) => {
  const audioRef = useRef(null);

  const { places, setPlaces } = useContext(PlacesContext);
  const [ edittedNotes, setEdittedNotes ] = useState(place.notes);
  const [visibility, setVisibility] = useState({
    editField: false
  });
  const { setMapCenter } = useContext(MapCenterContext);

  const toggleVisibility = (key) => {
    setVisibility({ ...visibility, [key]: !visibility[key] });
  };

  const makePollySay = () => {
    let textToRead = `<speak> ${place.name} <break time="0.6s"/> Saved for <break time="0.3s"/> ${place.notes} </speak>`;
    if (place.dis) {
      textToRead = `<speak> ${place.name} is ${place.dis.toFixed(2)} miles away.
    <break time="0.6s"/> Saved for <break time="0.3s"/> ${place.notes} </speak>`;
    }
    const polly = new Polly();
    const params = {
      OutputFormat: 'mp3',
      Text: textToRead,
      VoiceId: textToRead ? 'Raveena' : 'Matthew',
      TextType: 'ssml'
    };

    polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.error('Error synthesizing speech:', err);
      } else {
        const audioData = new Uint8Array(data.AudioStream);
        const base64Audio = btoa(
          String.fromCharCode.apply(null, audioData)
        );
        const audioUrl = `data:audio/mp3;base64,${base64Audio}`;
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    });
  };

  const editPlace = async () => {
    const updatedPlace = {
      ...place,
      notes: edittedNotes
    };
    const response = await updatePlace(updatedPlace);
    if (response && response.status === 200) {
      setPlaces(places.map((p) => (p.id === place.id ? updatedPlace : p)));
    }
    toggleVisibility('editField');
  };

  const removePlace = async () => {
    console.log(place);
    const response = await deletePlace(place);
    console.log(response);
    if (response.status === 200) {
      setPlaces(places.filter((p) => p.id !== place.id));
    }
  };

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
              {/* check iff place has key 'dis' then display with round off to two decimal places */}
              {place.dis && <>
                <p className="text-xs font-medium">{place.dis.toFixed(2)} mi</p>
                <span className="hidden sm:block" aria-hidden="true">&middot;</span>
              </>}
              <strong className="rounded border border-light-gray-500 bg-gray-0 px-2 py-0.25 text-[10px] font-medium hover:bg-gray-100">
                {place.category}
              </strong>
            </div>
            {/* Other content */}
          </div>
          {!visibility.editField && <p className="mt-1 text-xs text-gray-700">
            {place.notes}
          </p>}
          {visibility.editField && <div className="flex mt-2">
            <label htmlFor="placeNotes" className="w-full ml-1 mr-2 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <input
                type="text"
                id="placeNotes"
                placeholder="Enter Notes"
                value={edittedNotes}
                onChange={(e) => setEdittedNotes(e.target.value)}
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 active:border-transparent sm:text-sm"
              />
              <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Place Notes
              </span>
            </label>
            <button
              className="inline-block mr-4 rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
              onClick={editPlace}
            >
              <span className="sr-only">Submit</span>
              <IconArrowRight /> {/* Assuming ArrowRight is a React component */}
            </button>
          </div>}
        </div>
        <div>
          <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
            <button
              onClick={() => setMapCenter(place)}
              className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              title="Show on Map"
              aria-label="Show on Map"
            >
              <IconMapPin />
            </button>
            <button
              onClick={() => toggleVisibility('editField')}
              className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              title="Edit Product"
            >
              <IconEdit />
            </button>
            <button
              onClick={removePlace}
              className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              title="Delete Product"
            >
              <IconDelete />
            </button>
          </span>
        </div>
        <button
          onClick={makePollySay}
          // add audioref
          className="btn pointer-events-auto ml-4 sm:ml-0 flex-none rounded-md px-2 py-[0.3125rem] font-medium text-slate-700"
        >
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
        </button>
        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default PlaceCard;
