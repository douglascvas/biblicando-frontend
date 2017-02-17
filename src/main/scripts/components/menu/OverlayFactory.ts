import {Factory} from "../common/BasicFactory";
import {Overlay} from "./Overlay";

export class OverlayFactory implements Factory<Overlay> {

  create(): Overlay {
    return new Overlay();
  }
}
