import axios from 'axios';

const expectedAPI = 'http://localhost:3001/api/expected';
const masteryAPI = 'http://localhost:3001/api/mastery';
const moeAPI = 'http://localhost:3001/api/moe';
const playerAPI = `http://localhost:3001/api/player/`;

export default class DataService {
  getExpectedValues() {
    return axios.get(expectedAPI).then((response) => response.data);
  }
  getMasteryValues() {
    return axios.get(masteryAPI).then((response) => response.data);
  }
  getMoeValues() {
    return axios.get(moeAPI).then((response) => response.data);
  }
  getPlayerValues(id) {
    const userId = id;
    return axios.get(playerAPI + userId).then((response) => response.data);
  }
}
