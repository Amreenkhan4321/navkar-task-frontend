//(Includes Baseurl,Headers, common function for get,post,put,delete)
import axios from "axios";

const baseUrl = "http://localhost:3000/api/";
const DataService = axios.create({
  baseURL: baseUrl,
});

export default DataService;
