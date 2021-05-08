import axios from 'axios';

export default axios.create({
    baseURL:"https://localhost:44348/api/HansEndPoints"
})

//https://localhost:44348/api/HansEndPoints/Sign-In