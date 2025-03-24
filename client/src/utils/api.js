import axios from "axios";

const API_URL = "https://distraction-tracker.onrender.com/api";

export const fetchReport = async () => {
    return axios.get(`${API_URL}/weekly-report`).then(res => res.data);
};
