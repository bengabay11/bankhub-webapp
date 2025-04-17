export interface LoginResponse {
    token: string;
    refreshToken: string;
    expiresIn: number; // optional depending on backend
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface RegisterDto {
    email: string;
    password: string;
    userType: number;
    displayName: string;
}
export interface User {
    email: string;
    displayName: string;
    userType: string;
}
