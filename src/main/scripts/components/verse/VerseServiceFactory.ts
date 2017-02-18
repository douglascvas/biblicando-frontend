import {Factory} from "../common/BasicFactory";
import {Container} from "../common/Container";
import {VerseService} from "./VerseService";
import {ConfigFactory} from "../../config/ConfigFactory";
import {Config} from "../../config/Config";
import {HttpClientFactory, HttpClient} from "../common/HttpClient";
import {LoggerFactory} from "../common/logger/LoggerFactory";
import {ConsoleLoggerFactory} from "../common/logger/ConsoleLoggerFactory";

export class VerseServiceFactory implements Factory<VerseService> {
  constructor(private _container: Container) {
  }

  create(): VerseService {
    return this._container.getValue(VerseService, () => new VerseService(
      this.getConfigFactory().create(),
      this.getHttpClientFactory(),
      this.getLoggerFactory()
    ));
  }

  private getConfigFactory(): Factory<Config> {
    return this._container.getValue(ConfigFactory, () => new ConfigFactory(this._container));
  }

  private getHttpClientFactory(): Factory<HttpClient> {
    return this._container.getValue(HttpClientFactory, () => new HttpClientFactory());
  }

  private getLoggerFactory(): LoggerFactory {
    return this._container.getValue(LoggerFactory, () => new ConsoleLoggerFactory())
  }
}
