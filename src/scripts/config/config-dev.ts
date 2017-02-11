import {Config} from "./config";

export default class ConfigDev implements Config {
  getBiblesUrl(): string {
    return `/data/bibles.json`
  }

  getBooksUrl(bibleId: string): string {
    return `/data/books.json`
  }
}
