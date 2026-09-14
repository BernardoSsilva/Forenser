import Cookies from 'js-cookie';

const TOKEN_COOKIE = 'forenser_token';

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE);
}

export function setToken(token: string) {
  Cookies.set(TOKEN_COOKIE, token, { expires: 1, sameSite: 'lax' });
}

export function clearToken() {
  Cookies.remove(TOKEN_COOKIE);
}

export { TOKEN_COOKIE };
