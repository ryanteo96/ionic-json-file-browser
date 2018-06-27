import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { FileBrowserList } from '../../services/file-browser-list.service';
import { FileBrowserState } from '../../states/file-browser.state';

@Component({
    selector: 'file-browser-core',
    templateUrl: 'file-browser-container-core.html',
    styleUrls: ['file-browser-container-core.scss'],
  })
  export class FileBrowserContainerCoreComponent implements OnInit {
    @Select(FileBrowserState.getSidebar) sidebar$: Observable<Boolean>;

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