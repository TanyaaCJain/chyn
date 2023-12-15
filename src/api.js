import axios from 'axios';

require('dotenv').config();

const openAIKey = process.env.OPEN_API_KEY;
const api = axios.create({
    baseURL: 'https://x5cbyxsmwl.execute-api.us-west-2.amazonaws.com/api',
});
const userId = localStorage.getItem('userId');

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

export const getAWSCredentials = async () => {
    try {
        const response = await api.get('/credentials');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getPlaces = async (lat = null, lon = null) => {
    try {
        let url = '/places?userId=' + userId;
        if (lat && lon) {
            url += '&lat=' + lat + '&lon=' + lon;
        }
        console.log(`url`, url);
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const addPlace = async (place) => {
    try {
        place["city"] = "San Francisco";
        const details = await searchOSM(place.name + " " + place.city);
        if (details.length > 0) {
            place.userId = userId;
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

export const fetchOpenAIResponse = async (promptText) => {
    const headers = {
      'Authorization': `Bearer ${openAIKey}`,
      'Content-Type': 'application/json',
    };

    const OPENAI_API_URL = 'https://api.openai.com/v1/completions';
  
    const data = {
      model: "gpt-3.5-turbo-instruct",
      prompt: promptText,
      max_tokens: 250, // Adjust as needed
      temperature: 0
    };
  
    try {
      const response = await axios.post(OPENAI_API_URL, data, { headers });
      console.log(`open ai response`, response);
      return response.data.choices[0].text;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
};

export const generatePlaces = async (text) => {
    try {
      const prompt = `Extract from the given text and write in a JSON list containing keys as "name" and "notes" about the place if you find any. Don't hallucinate. : ${text.paragraph}` 
      const response = await fetchOpenAIResponse(prompt);
      console.log(`response`, response);
      return response;
    } catch (error) {
      console.error('Error:', error);
    }
}