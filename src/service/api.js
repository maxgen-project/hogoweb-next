import axios from "axios";

export const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidata.hogonnindia.com";

export const apiInfo = axios.create({
  baseURL: BASE,
});

const attachToken = (config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Token ${token}`;
  }
  return config;
};

apiInfo.interceptors.request.use(attachToken);

export const fetchAll = async (url) => {
  let all = [];
  let nextUrl = url;

  while (nextUrl) {
    const res = await apiInfo.get(nextUrl);
    const batch = res.data?.data || [];
    const list = Array.isArray(batch) ? batch : batch.data || [];

    all = [...all, ...list];
    nextUrl = res.data?.next || null;

    if (all.length > 5000) break;
  }

  return all;
};