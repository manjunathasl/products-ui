import { get } from "./http";

const getProducts = async (page = 1) => {
  try {
    const res = await get(`products?page=${page}`);
    return res.data;
  } catch (error) {
    throw error?.response?.data ?? new Error("Service error");
  }
};

export { getProducts };