import axios from 'axios';

const expectedAPI = 'http://localhost:3001/api/expected';

export default class ExpectedService {
  getExpectedValues() {
    return axios
      .get(expectedAPI)

      .then((response) => response.data);
  }
}
