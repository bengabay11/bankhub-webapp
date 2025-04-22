const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRATION_TIME_KEY = 'jwt_expiration_time';

export const tokenService = {
    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },
    setAccessToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    },
    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },
    setRefreshToken(token: string) {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    },
    getExpirationTime(): number | null {
        return parseInt(localStorage.getItem(EXPIRATION_TIME_KEY) || '0');
    },
    setExpirationTime(expiresIn: number) {
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem(EXPIRATION_TIME_KEY, expirationTime.toString());
    },
    setTokens(accessToken: string, refreshToken: string, expiresIn: number) {
        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
        this.setExpirationTime(expiresIn);
    },
    clearTokens() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(EXPIRATION_TIME_KEY);
    },
    isAccessTokenExpired(): boolean {
        const expirationTime = this.getExpirationTime();
        if (!expirationTime) return true;
        return Date.now() > expirationTime;
    },
};
