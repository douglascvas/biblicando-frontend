export abstract class Config {
  abstract getBiblesUrl(): string;

  abstract getBooksUrl(bibleId: string): string;

  abstract getChaptersUrl(bookId: string): string;

  abstract getVersesUrl(chapterId: string): string;
}
