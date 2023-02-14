class AuthToken {
  constructor() {
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  setToken(newToken) {
    this.token = newToken;
  }
}

export const authToken = new AuthToken();
