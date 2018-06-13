// import { stringify } from 'qs';
import request from '../utils/request';

export async function loginapi(params) {
  return request('/login', {
    method: 'POST',
    body: params,
  });
}

export async function logoutapi(params) {
  return request('/logout');
}

export async function authorityapi() {
  return request('/authority');
}


export async function getListapi(params) {
  return request('/getList', {
    method: 'POST',
    body: params,
  });
}


