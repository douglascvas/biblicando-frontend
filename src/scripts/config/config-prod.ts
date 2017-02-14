import {Config} from "./config";

export class ConfigProd implements Config {
  getBiblesUrl(): string {
    return `api/v1/bibles?time=${(new Date()).getTime()}`;
  };

  getBooksUrl(bibleId: string): string {
    return `api/v1/bible/${bibleId}/books?time=${(new Date()).getTime()}`;
  }

  getChaptersUrl(bookId: string): string {
    return `api/v1/book/${bookId}/chapters?time=${(new Date()).getTime()}`;
  }

}
