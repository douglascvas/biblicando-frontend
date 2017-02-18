import {Factory} from "../common/BasicFactory";
import {Container} from "../common/Container";
import {BibleService} from "./BibleService";
import {ConfigFactory} from "../../config/ConfigFactory";
import {Config} from "../../config/Config";
import {HttpClientFactory, HttpClient} from "../common/HttpClient";
import {LoggerFactory} from "../common/logger/LoggerFactory";
import {ConsoleLoggerFactory} from "../common/logger/ConsoleLoggerFactory";

export class BibleServiceFactory implements Factory<BibleService> {
  constructor(private _container: Container) {
  }

  create(): BibleService {
    return this._container.getValue(BibleService, () => new BibleService(
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
