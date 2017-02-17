import {Overlay} from "../menu/Overlay";
import {AbstractMenu} from "../menu/AbstractMenu";

export interface MenuFactory<E> {
  create(overlay: Overlay): AbstractMenu<E>;
}
