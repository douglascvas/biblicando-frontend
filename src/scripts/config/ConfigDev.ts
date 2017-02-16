import {Config} from "./Config";

export default class ConfigDev implements Config {
  getBiblesUrl(): string {
    return `/data/bibles/bibles.json`
  }

  getBooksUrl(bibleId: string): string {
    return `/data/books/${bibleId}.json`
  }

  getChaptersUrl(bookId: string): string {
    return `/data/chapters/${bookId}.json`
  }

  getVersesUrl(chapterId: string): string {
    return `/data/verses/${chapterId}.json`
  }
}
