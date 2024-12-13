import axios from "axios";
//json-server --watch db.json (para rodar a api)
export const api = axios.create({
    baseURL: "http://localhost:3000/"
})