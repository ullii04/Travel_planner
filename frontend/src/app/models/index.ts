export interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  region: string;
  shortDescription: string;
}

export interface Trip {
  id: number;
  destination: {
    id: number;
    name: string;
    image: string;
    country: string;
  };
  start_date: string;
  end_date: string;
  status: 'planned' | 'ongoing' | 'completed';
}

export interface User {
  id: number;
  name: string;
  email: string;
  token?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
