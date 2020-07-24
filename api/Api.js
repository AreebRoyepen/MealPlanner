import axios from "axios";

let Authorization = "Zl7RU0RkTL63IU0IcN0NRqGGXNPMwE2ai1gvZPOjkgY=";

let API_BASE_ADDRESS = "http://royependemo.co.za/peoplefinder/public/api/";
let axiosInstance = axios.create({
  baseURL: API_BASE_ADDRESS,
  timeout: 20000,
});
axiosInstance.defaults.headers.common["Authorization"] = Authorization;

export async function fetchRecipes() {
  return axiosInstance
    .get(`v2/recipes`)
    .then((resp) => {
      console.log(resp.data);
      return resp.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function fetchIngredients(id) {
  return axiosInstance
    .get(`v2/ingredient/${id}`)
    .then((resp) => {
      console.log(resp.data);
      return resp.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function fetchSteps(id) {
  return axiosInstance
    .get(`v2/instruction/${id}`)
    .then((resp) => {
      console.log(resp.data);
      return resp.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function fetchInventory(params) {
  return axiosInstance
    .get(`v1/inventory/${params}`)
    .then((resp) => {
      console.log(resp.data);
      return resp.data;
    })
    .catch((e) => {
      console.log(e);
    });
}
