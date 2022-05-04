import axios from 'axios';

const APIurl = import.meta.env.VITE_APP_BACKEND_URL;
const applicationId = import.meta.env.VITE_APP_API_ID;

const expectedAPI = `${APIurl}/api/expected/`;
const masteryAPI = `${APIurl}/api/mastery/`;
const moeAPI = `${APIurl}/api/moe/`;
const playerAPI = `${APIurl}/api/player/`;
const graphAPI = `${APIurl}/api/graph/`;

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
    return axios.get(`${playerAPI}${id}`).then((response) => response.data);
  }
  getPlayerClan(id) {
    const clanAPI = `https://api.worldoftanks.eu/wot/clans/accountinfo/?application_id=${applicationId}&account_id=${id}`;
    return axios.get(clanAPI).then((response) => response.data);
  }
  getPlayerId(id) {
    const userIdAPI = `https://api.worldoftanks.eu/wot/account/list/?application_id=${applicationId}&search=${id}`;
    return axios.get(userIdAPI).then((response) => response.data);
  }
  getGraphValues(id) {
    return axios.get(`${graphAPI}${id}`).then((response) => response.data);
  }
  postGraphValues(data) {
    return axios.post(graphAPI, data).then((response) => response.data);
  }
}
