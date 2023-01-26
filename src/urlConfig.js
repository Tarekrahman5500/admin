const baseUrl = "http://localhost:5000";

// import.meta.process.env.VITE_REACT_APP_API//
export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
