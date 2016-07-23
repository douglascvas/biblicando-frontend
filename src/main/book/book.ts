'use strict';

import {Bible} from "../bible/bible";
import {Chapter} from "../chapter/chapter";

export class Book {
  _id:string;
  remoteId:string;
  remoteSource:string;
  name:string;
  number:number;
  description:string;
  testament:string;
  copyright:string;
  author:string;
  abbreviation:string;
  numberOfChapters:number;
  updatedAt:Date;
  bible:Bible;
  chapters:Chapter[];
}