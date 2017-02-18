'use strict';

export class ObjectUtils {
  public static extractClassName(classz: Function): string {
    let asString = classz.toString();
    if (asString === '[object]') {
      asString = classz.constructor.toString();
    }
    let match = asString.match(/(?:function|class)[\s]*(\w+).*(\(|\{)/);
    if (!match) {
      console.log('The class must specify a name.', classz);
      return null;
    }
    return match[1];
  }

  public static isClass(classz: Function): boolean {
    return classz.toString().indexOf('class') === 0;
  }

}
