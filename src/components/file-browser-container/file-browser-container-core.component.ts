import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoadingController, ActionSheetController } from 'ionic-angular';
import { FileBrowserList } from '../../services/file-browser-list.service';

@Component({
    selector: 'file-browser-core',
    templateUrl: 'file-browser-container-core.html',
    styleUrls: ['file-browser-container-core.scss']
  })
  export class FileBrowserContainerCoreComponent implements OnInit {
    nameSort: string = 'arrow-down';
  
    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
                public actionSheetCtrl: ActionSheetController, public fileBrowserList: FileBrowserList) {
    }
  
    ngOnInit() {
      // this.presentLoading();
    }
  
    presentLoading() {
      const loader = this.loadingCtrl.create({
          content: 'Loading files...',
          duration: 3000
      });
      loader.present();
    }
  }