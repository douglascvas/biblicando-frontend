import {Factory} from "../common/BasicFactory";
import {Search} from "./Search";

export class SearchFactory implements Factory<Search> {

  create(): Search {
    return new Search();
  }
}
