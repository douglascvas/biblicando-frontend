export interface Config {
  getBiblesUrl(): string;
  getBooksUrl(bibleId: string): string;
}
