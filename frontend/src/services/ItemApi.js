import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_BACKEND}/items`;

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(error => {
      throw new Error('An error occurred while fetching items.');
    });
};

const create = newItem => {
  return axios
    .post(baseUrl, newItem)
    .then(response => response.data)
    .catch(error => {
      throw new Error('An error occurred while adding a new item.');
    });
};

const update = (id, updatedItem) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedItem)
    .then(response => response.data)
    .catch(error => {
      throw new Error('An error occurred while updating the item.');
    });
};

const remove = id => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error('An error occurred while deleting the item.');
    });
};

export default { getAll, create, update, remove };