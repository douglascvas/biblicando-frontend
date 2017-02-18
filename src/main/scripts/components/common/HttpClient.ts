import Axios from "axios";
import {Factory} from "./BasicFactory";

export class HttpClientFactory implements Factory<HttpClient> {
  public create(): HttpClient {
    return new HttpClient();
  }
}

export class HttpClient {
  public fetch(url: string, config?: JSON): Promise<any> {
    return Axios.get(url, config);
  }
}
