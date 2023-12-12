import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://x5cbyxsmwl.execute-api.us-west-2.amazonaws.com/api',
});

const searchOSM = async (query_str) => {
    const base_url = 'https://nominatim.openstreetmap.org/search?format=json&q=';
    const url = base_url + query_str;
    try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
      }
}

export const getPlaces = async () => {
    try {
        const response = await api.get('/places');
        return response.data;
      } catch (error) {
        console.error(error);
      }
}

export const addPlace = async (place) => {
    try {
        place["city"] = "San Francisco";
        const details = await searchOSM(place.name + " " + place.city);
        if (details.length > 0) {
            place.about = ""
            place.lat = details[0].lat;
            place.lon = details[0].lon;
            place.address = details[0].display_name;
            place.category = details[0].class + ", " + details[0].type;
            place.info = ""
        }
        const response = await api.post('/places', [ place ]);
        console.log(`response`, response);
        return response.data;
      } catch (error) {
        console.error(error);
      }
}

export const updatePlace = async (place) => {
    try {
        const response = await api.put(`/places/${place.id}`, place);
        return response;
      } catch (error) {
        console.error(error);
      }
}

export const deletePlace = async (place) => {
    try {
        const response = await api.delete(`/places/${place.id}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const textToSpeech = async (text) => {
    try {
        const response = await api.post('/speak', {"text": text});
        console.log(`response`, response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

// export default { api };