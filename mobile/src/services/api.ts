import axios from "axios";

export const api = axios.create({
	baseURL: "http://26.67.12.101:3333",
	timeout: 700,
});
