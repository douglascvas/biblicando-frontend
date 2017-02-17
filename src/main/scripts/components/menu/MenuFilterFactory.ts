import {MenuFilter} from "./MenuFilter";

export abstract class MenuFilterFactory {
  abstract create(query: String): MenuFilter;
}

export class MenuFilterFactoryDefault implements MenuFilterFactory {
  public create(query: string): MenuFilter {
    return new MenuFilter(query);
  }
}
