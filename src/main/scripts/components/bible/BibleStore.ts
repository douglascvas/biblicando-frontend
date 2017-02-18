import {Bible} from "./Bible";
import {Store} from "../common/Store";
import {LoggerFactory} from "../common/logger/LoggerFactory";

export class BibleStore extends Store<Bible> {

  constructor(_loggerFactory: LoggerFactory) {
    super(_loggerFactory.getLogger(BibleStore));
  }
}
