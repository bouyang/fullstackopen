import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const addInfo = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const deleteInfo = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  addInfo,
  deleteInfo,
}