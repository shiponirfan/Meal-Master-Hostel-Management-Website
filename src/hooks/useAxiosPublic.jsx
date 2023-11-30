import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://hostel-management-website-server-side.vercel.app/api/v1",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
