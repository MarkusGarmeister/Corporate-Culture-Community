import simpleRestProvider from "ra-data-simple-rest";

const API_URL = process.env.REACT_APP_API_URL || "https://joinculture.co/";

export const dataProvider = simpleRestProvider(API_URL);

// import { DataProvider } from "react-admin";
// import axios from "axios";

// export const dataProvider: DataProvider = {
//   getList: async (resource, params) => {
//     try {
//       const url = `${API_URL}/${resource}`;
//       const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
//       const { field, order } = params.sort || { field: "id", order: "ASC" };

//       const queryParams = {
//         skip: (page - 1) * perPage,
//         limit: perPage,
//         sort: field,
//         order: order,
//         ...params.filter,
//       };
//       const token = localStorage.getItem("token");
//       const response = await axios.get(url, {
//         params: queryParams,
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return {
//         data: response.data.items,
//         total: response.data.total,
//       };
//     } catch (error) {
//       throw error;
//     }
//   },

//   getOne: async (resource, params) => {
//     try {
//       const url = `${API_URL}/${resource}/${params.id}`;
//       const token = localStorage.getItem("token");
//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return {
//         data: response.data,
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
//   getMany: async (resource, params) => {
//     try {
//       const token = localStorage.getItem("token");
//       const responses = await Promise.all(
//         params.ids.map((id) =>
//           axios.get(`${API_URL}/${resource}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ),
//       );
//       return {
//         data: responses.map((response) => response.data),
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
//   getManyReference: async (resource, params) => {
//     try {
//       const url = `${API_URL}/${resource}`;
//       const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
//       const { field, order } = params.sort || { field: "id", order: "ASC" };

//       const queryParams = {
//         skip: (page - 1) * perPage,
//         limit: perPage,
//         sort: field,
//         order: order,
//         ...params.filter,
//         [params.target]: params.id,
//       };
//       const token = localStorage.getItem("token");
//       const response = await axios.get(url, {
//         params: queryParams,
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return {
//         data: response.data.items,
//         total: response.data.total,
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
//   create: async (resource, params) => {
//     try {
//       const url = `${API_URL}/${resource}`;
//       const token = localStorage.getItem("token");

//       const response = await axios.post(url, params.data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       return {
//         data: response.data,
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
//   update: async (resource, params) => {
//     try {
//       const url = `${API_URL}/${resource}/${params.id}`;
//       const token = localStorage.getItem("token");

//       const response = await axios.put(url, params.data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       return {
//         data: response.data,
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
//   updateMany: async (resource, params) => {
//     try {
//       const token = localStorage.getItem("token");
//       const responses = await Promise.all(
//         params.ids.map((id) =>
//           axios.put(`${API_URL}/${resource}/${id}`, params.data, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ),
//       );
//       return {
//         data: params.ids,
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
//   delete: async (resource, params) => {
//     try {
//       const url = `${API_URL}/${resource}/${params.id}`;
//       const token = localStorage.getItem("token");

//       const response = await axios.delete(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       return {
//         data: params.previousData!,
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
//   deleteMany: async (resource, params) => {
//     try {
//       const token = localStorage.getItem("token");
//       const responses = await Promise.all(
//         params.ids.map((id) =>
//           axios.delete(`${API_URL}/${resource}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ),
//       );
//       return {
//         data: params.ids,
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
// };
