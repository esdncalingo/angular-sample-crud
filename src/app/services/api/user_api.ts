import { async } from "@angular/core/testing";
import axios from "axios";

const BASE_URL = 'https://express-js-api.onrender.com'

export const getUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/users`)
    return res.data
  } catch (error: any) {
    return error.response.data
  }
}