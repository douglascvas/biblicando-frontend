'use strict';

import {Book} from "../book/book";

export class Bible extends Object {
  _id:string;
  remoteId:string;
  remoteSource:string;
  name:string;
  publisher:string;
  description:string;
  languageCode:string;
  languageCodeType:string;
  contactUrl:string;
  abbreviation:string;
  numberOfBooks:number;
  updatedAt:Date;
  copyright:string;
  books:Book[];
}
