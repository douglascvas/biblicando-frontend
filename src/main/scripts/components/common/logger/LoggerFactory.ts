import {Logger} from "./Logger";

export abstract class LoggerFactory {
  abstract getLogger(loggerClassName: any): Logger;
}

