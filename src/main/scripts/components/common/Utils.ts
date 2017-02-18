export class Utils {
  public static isDevMode(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}
