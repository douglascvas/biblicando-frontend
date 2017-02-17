'use strict';

import {Book} from "../book/Book";
import {Verse} from "../verse/Verse";

export class Chapter {
  _id:string;
  remoteId:string;
  remoteSource:string;
  copyright:string;
  number:number;
  book:Book;
  verses:Verse[];
}
