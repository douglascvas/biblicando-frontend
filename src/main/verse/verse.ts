'use strict';

import {Chapter} from "../chapter/chapter";

export class Verse {
  _id:string;
  remoteId:string;
  remoteSource:string;
  copyright:string;
  numbers:number[];
  chapter:Chapter;
  text:string;
}