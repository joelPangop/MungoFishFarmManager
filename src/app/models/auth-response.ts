export interface AuthResponse {
  user: {
    id: number,
    username: string,
    email: string,
    role: string
  },
  accessToken: string,
  refreshToken: string,
  expires_in: number
}
