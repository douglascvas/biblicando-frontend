import {Config} from "./Config";
import {Utils} from "../components/common/Utils";
import {ConfigProd} from "./ConfigProd";
import {Factory} from "../components/common/BasicFactory";
import {Container} from "../components/common/Container";

export class ConfigFactory implements Factory<Config> {
  constructor(private _container: Container) {
  }

  create(): Config {
    return this._container.getValue(Config, () => this.createConfig());
  }

  private createConfig(): Config {
    if (Utils.isDevMode()) {
      const ConfigClass = require('./ConfigDev').default;
      return new ConfigClass();
    }
    return new ConfigProd();
  }
}
