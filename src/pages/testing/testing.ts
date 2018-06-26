import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as node from './node.json';
import * as entity from './entity.json';

import { FileBrowserList } from '../../services/file-browser-list.service';

@Component({
  selector: 'testing',
  templateUrl: 'testing.html'
})
export class TestPage implements OnInit {

  constructor(public navCtrl: NavController, private fileBrowserList: FileBrowserList) {}

  ngOnInit() {
    this.fileBrowserList.generateFileBrowser(<any>node, <any>entity, 0);
  }
}
