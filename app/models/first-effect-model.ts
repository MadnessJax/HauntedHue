import {Observable} from 'data/observable';
import http = require("http");

export class FirstEffectModel extends Observable {

  private _counter: number;

  constructor() {
    super();
  }

}