import http from "../http-common";

const getAll = () => {
  return http.get("/elevage");
};

const get = id => {
  return http.get(`/elevage/${id}`);
};

const create = data => {
  return http.post("/elevage", data);
};

const update = (id, data) => {
  return http.put(`/elevage/${id}`, data);
};

const remove = id => {
  return http.delete(`/elevage/${id}`);
};

const getCount= () => {
  return http.get("/elevage/nombre");
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  getCount,
};