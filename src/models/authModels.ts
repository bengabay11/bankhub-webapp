export interface LoginResponse {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
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
