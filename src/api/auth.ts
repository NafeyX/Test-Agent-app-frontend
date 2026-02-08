import apiClient from './client';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
};
