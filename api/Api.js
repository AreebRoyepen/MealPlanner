import { API_BASE, TOKEN } from 'react-native-dotenv';


const headers = {
  Authorization: TOKEN,
};

export async function fetchRecipes() {
  try {

    let resp = await fetch(API_BASE + "/v2/recipes", {headers});

    if(resp.status === 200){
      let data = await resp.json();

      return data;
    }
  } catch (err) {
    console.log("THERE HAS BEEN AN ERROR");
    console.log(err);
  }
}

export async function fetchIngredients(id) {
  try {
    let resp = await fetch(API_BASE + "/v2/ingredient/" + id, {headers});

    let data = await resp.json();

    return data;
  } catch (err) {
    console.log("THERE HAS BEEN AN ERROR");
    console.log(err);
  }
}

export async function fetchSteps(id) {
  try {
    let resp = await fetch(API_BASE + "/v2/instruction/" + id, {headers});

    let data = await resp.json();

    return data;
  } catch (err) {
    console.log("THERE HAS BEEN AN ERROR");
    console.log(err);
  }
}

export async function fetchInventory(param) {
  try {
    let resp = await fetch(API_BASE + "/v1/inventory/" + param, {headers});

    let data = await resp.json();

    return data;
  } catch (err) {
    console.log("THERE HAS BEEN AN ERROR");
    console.log(err);
  }
}
