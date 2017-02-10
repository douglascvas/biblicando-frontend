'use strict';

import {Book} from "../book/book";
import {Verse} from "../verse/verse";

export class Chapter {
  _id:string;
  remoteId:string;
  remoteSource:string;
  copyright:string;
  number:number;
  book:Book;
  verses:Verse[];
}