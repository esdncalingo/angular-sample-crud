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

export const createUsers = async (params: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, params)
    return res.data
  } catch (error: any) {
    return error.response.data
  }
}

export const deleteUsers = async (id: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/users/${id}`)
    return res.data
  } catch (error: any) {
    return error.response.data
  }
}

export const updateUsers = async (id: number, params: any) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${id}`, params)
    return res.data
  } catch (error: any) {
    return error.response.data
  }
}