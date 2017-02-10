export class HttpClientFactory {
  public createClient(): HttpClient {
    return new HttpClient()
  }
}

export class HttpClient {
  public fetch(a?: any): Promise<any> {
    return null;
  }
}
