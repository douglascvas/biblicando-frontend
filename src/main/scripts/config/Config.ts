export interface Config {
  getBiblesUrl(): string;
  getBooksUrl(bibleId: string): string;
  getChaptersUrl(bookId: string): string;
  getVersesUrl(chapterId: string): string;
}
