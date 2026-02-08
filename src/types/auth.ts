export interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}

export interface AuthResponse extends User { }

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password?: string;
}
