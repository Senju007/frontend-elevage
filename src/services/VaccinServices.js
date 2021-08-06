import http from "../http-common";

const getAll = () => {
  return http.get("/vaccin");
};

const get = id => {
  return http.get(`/vaccin/${id}`);
};

const create = data => {
  return http.post("/vaccin", data);
};

const update = (id, data) => {
  return http.put(`/vaccin/${id}`, data);
};

const remove = id => {
  return http.delete(`/vaccin/${id}`);
};

const getCount= () => {
  return http.get("/vaccin/nombre");
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  getCount,
};