import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

// Function to get axios calls to the whole app
const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  validateStatus: (status) => status < 400,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => console.error(error.response?.data)
);

// Gets query params
const encodeQueryParams = (url, query) => {
  const encodeURL = new URL(url);
  if (query) {
    Object.entries(query).forEach(([k, v]) =>
      encodeURL.searchParams.append(k, v)
    );
  }
  return encodeURL;
};

// Makes the call stating the method and the rest of the data
const axiosCall = async (url, { query, ...requestOptions }) => {
  const requestUrl = encodeQueryParams(`${API_URL}${url}`, query);
  try {
    const response = await axiosInstance({
      method: requestOptions.method,
      url: requestUrl,
      data: requestOptions.body,
      headers: requestOptions.headers,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const unAuthAxiosCall = (url, requestOptions) => axiosCall(url, requestOptions);
