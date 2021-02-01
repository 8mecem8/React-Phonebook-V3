import axios from 'axios'
const baseUrl = '/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const pDelete = newObject => {
    return axios.delete(baseUrl, newObject)
}

export default { getAll, create, update, pDelete }