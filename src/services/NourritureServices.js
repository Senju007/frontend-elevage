import http from "../http-common";

const getAll = () => {
  return http.get("/nourriture");
};

const get = id => {
  return http.get(`/nourriture/${id}`);
};

const create = data => {
  return http.post("/nourriture", data);
};

const update = (id, data) => {
  return http.put(`/nourriture/${id}`, data);
};

const remove = id => {
  return http.delete(`/nourriture/${id}`);
};



const getCount= () => {
  return http.get("/nourriture/nombre");
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  getCount,
};