import { apiFetch } from "../api/client";

export type User = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export const authApi = {
  login: async (credentials: LoginRequest) => {
    const data = await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const { token, user } = data;
    const maxAge = 60 * 60 * 24 * 7; // 7 days

    // Store everything
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${maxAge}; SameSite=Lax`;

    return data;
  },

  logout: async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // Ignore errors
    }
    
    // Clear everything
    localStorage.clear();
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "user=; path=/; max-age=0";
    window.location.href = "/login";
  },

  me: async () => {
    return apiFetch<{ user: User }>("/auth/me").then((res) => res.user);
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  isAdmin: () => {
    const user = authApi.getUser();
    return user?.roles.includes("admin") ?? false;
  },

  isOfficer: () => {
    const user = authApi.getUser();
    return user?.roles.includes("officer") ?? false;
  },
};
