import axios from 'axios';

const url = 'http://api.openweathermap.org/data/2.5/weather?';
const key = '29f7270d92cb2cb265878d8d8c2397ae';

export const getData = async (city) => {
    try{
        const {data} = await axios.get(url + `q=${city}&appid=${key}`);
        return data;
    }catch(error) {
        throw error;
    }
}