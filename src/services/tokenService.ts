const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRATION_TIME_KEY = 'jwt_expiration_time';

export const tokenService = {
    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },
    setAccessToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        // const expirationTime = Date.now() + expiresIn * 1000; // זמן תפוגה (במילישניות)
        // localStorage.setItem(EXPIRATION_TIME_KEY, expirationTime.toString());
    },
    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },
    setRefreshToken(token: string) {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    },
    clearTokens() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(EXPIRATION_TIME_KEY);
    },
    getExpirationTime(): number | null {
        return parseInt(localStorage.getItem(EXPIRATION_TIME_KEY) || '0');
    },
    isAccessTokenExpired(): boolean {
        const expirationTime = this.getExpirationTime();
        if (!expirationTime) return true;
        return Date.now() > expirationTime;
    },
};
