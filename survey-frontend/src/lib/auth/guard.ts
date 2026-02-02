import { authApi } from "./auth";

export function requireAdmin() {
  if (!authApi.isAuthenticated() || !authApi.isAdmin()) {
    window.location.href = "/login";
  }
}

export function requireOfficer() {
  if (!authApi.isAuthenticated() || !authApi.isOfficer()) {
    window.location.href = "/login";
  }
}
