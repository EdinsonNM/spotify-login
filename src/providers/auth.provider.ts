export class AuthProvider {
  static getAuthUrl(): string {
    const client = process.env.CLIENT_ID;
    const uri = encodeURIComponent(process.env.REDIRECT_URL);
    const authUrl = "https://accounts.spotify.com/authorize";
    const scopes = encodeURIComponent(
      ["user-read-private", "user-read-email"].join(" ")
    );
    const redirectUrl = `${authUrl}?response_type=code&client_id=${client}&scope=${scopes}&redirect_uri=${uri}`;
    return redirectUrl;
  }

  static getToken(code: string): Promise<Record<string, any>> {
    const endpoint = "https://accounts.spotify.com/api/token";
    const contentType = "application/x-www-form-urlencoded";
    const accept = "application/json";
    const client = process.env.CLIENT_ID;
    const secret = process.env.SECRET_ID;
    const redirect = process.env.REDIRECT_URL;
    const basicToken = btoa(`${client}:${secret}`);
    const headers = {
      Authorization: `Basic ${basicToken}`,
      Accept: accept,
      "Content-Type": contentType,
    };
    const body = new FormData();
    body.append("code", code);
    body.append("redirect_uri", redirect);
    body.append("grant_type", "authorization_code");
    const _body = `code=${code}&redirect_uri=${redirect}&grant_type=authorization_code`;
    return fetch(endpoint, {
      method: "POST",
      body: _body,
      headers,
    }).then((res) => res.json());
  }
}
