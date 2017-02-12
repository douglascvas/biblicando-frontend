import Axios from "axios";

export class HttpClientFactory {
  public createClient(): HttpClient {
    return new HttpClient();
  }
}

export class HttpClient {
  public fetch(url: string, config?: JSON): Promise<any> {
    return Axios.get(url, config);
  }
}
