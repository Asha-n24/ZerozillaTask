import http from './httpService';
import { apiUrl } from "../config.json";

export const getCategory = () => {
  const apiEndPoint = `${apiUrl}/products/categories`;
  console.log(apiEndPoint,"apiEndPoint")
  return http.get(apiEndPoint)
}

export const getProducts = (params) => {
  console.log(params,"params")
  const apiEndPoint = `${apiUrl}/products/category/${params}`;
  console.log(apiEndPoint,"apiEndPoint")
  return http.get(apiEndPoint)
}


