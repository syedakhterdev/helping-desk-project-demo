import http from "./httpService";
import { getToken } from "../utils/userdata";
const baseUrl = "http://localhost:3000";

let headers = {};
const attachHeader = () => {
  headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${getToken() && getToken()["token"]}`
  };
};

export const createUser = user => {
  attachHeader();
  console.log(headers);
  return http.post(`${baseUrl}/users`, user, { headers: headers });
};

export const login = ({ email, password }) => {
  attachHeader();
  console.log("email:", email);
  return fetch(`${baseUrl}/login`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({
      email,
      password
    })
  });
};
export const getUsers = () => {
  attachHeader();
  return http.get(`${baseUrl}/users`, { headers: headers });
};
export const getOrganization = () => {
  attachHeader();
  return http.get(`${baseUrl}/organizations`, { headers: headers });
};
// deleteUser
export const deleteUser = ({ id }) => {
  attachHeader();
  return http.delete(`${baseUrl}/users/` + id, { headers: headers });
};

// create Organization
export const createOrganization = organization => {
  attachHeader();
  return http.post(`${baseUrl}/organizations`, organization, {
    headers: headers
  });
};
// getAllOrganization
export const getAllOrganization = () => {
  attachHeader();
  return http.get(`${baseUrl}/organizations`, { headers: headers });
};

// deleteOrganization
export const deleteOrganization = id => {
  attachHeader();
  return http.delete(`${baseUrl}/organizations/` + id, { headers: headers });
};

//getAllTicket
export const getAllTicket = () => {
  attachHeader();
  return http.get(`${baseUrl}/tickets`, { headers: headers });
};

// createTicket
export const createTicket = ticket => {
  attachHeader();
  return http.post(`${baseUrl}/tickets`, ticket, { headers: headers });
};
