import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchReport = async () => {
    return axios.get(`${API_URL}/weekly-report`).then(res => res.data);
};
