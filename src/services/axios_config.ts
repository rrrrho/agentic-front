import axios from 'axios';
import { BASE } from './urls';

export const api = axios.create({
  baseURL: BASE,
  withCredentials: true
});