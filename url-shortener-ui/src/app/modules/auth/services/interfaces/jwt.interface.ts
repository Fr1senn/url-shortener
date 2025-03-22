export interface IJwtService {
  getJWT(): string | null;
  saveJWT(jwt: string): void;
  clearJWT(): void;
  isJWTExpired(): boolean;
}
