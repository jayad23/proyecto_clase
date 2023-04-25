import axios from "axios";

const github_url = import.meta.env.VITE_GH_URL;
export const getElementById = (login) => axios.get(`${github_url}/${login}`);
