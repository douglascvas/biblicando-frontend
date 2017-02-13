'use strict';

import {Bible} from "../bible/Bible";
import {Chapter} from "../chapter/Chapter";

export class Book {
  _id:string;
  remoteId:string;
  remoteSource:string;
  name:string;
  number:number;
  description:string;
  categories:string[];
  copyright:string;
  author:string;
  abbreviation:string;
  numberOfChapters:number;
  updatedAt:Date;
  bible:Bible;
  chapters:Chapter[];
}
