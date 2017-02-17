import {LoggerFactory, ConsoleLoggerFactory} from "../../../common/LoggerFactory";
import {BibleMenuBody} from "./BibleMenuBody";
import {Factory} from "../../../common/BasicFactory";
import {Container} from "../../../common/Container";

export class BibleMenuBodyFactory implements Factory<BibleMenuBody> {
  constructor(private _container: Container) {
  }

  public create(): BibleMenuBody {
    const loggerFactory = this._container.getValue(LoggerFactory, () => this.createLoggerFactory());
    return new BibleMenuBody(loggerFactory);
  }

  private createLoggerFactory(): LoggerFactory {
    return new ConsoleLoggerFactory();
  }
}
