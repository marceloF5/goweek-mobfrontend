import axios from 'axios'

const api = axios.create({
    baseURL: 'https://goweekbackend.herokuapp.com/'
})

export default api