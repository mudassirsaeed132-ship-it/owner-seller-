import { apiFetch } from "../../../services/api/client";
import { ENDPOINTS } from "../../../services/api/endpoints";

export const listingsApi = {
  list: () => apiFetch(ENDPOINTS.sellerListings),
  create: (payload) => apiFetch(ENDPOINTS.sellerListings, { method: "POST", body: payload }),
  remove: (id) => apiFetch(`${ENDPOINTS.sellerListings}/${id}`, { method: "DELETE" }),
};
