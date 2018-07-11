import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { FileBrowser } from '../../services/file-browser.service';
import { FileBrowserState } from '../../states/file-browser.state';
import { FileBrowserAlertComponent } from '../file-browser-alert/file-browser-alert.component';
import { FileBrowserModalComponent } from '../file-browser-modal/file-browser-modal.component';

@Component({
    selector: 'file-browser-mobile',
    templateUrl: 'file-browser-container-mobile.html',
    styleUrls: ['file-browser-container-mobile.scss'],
    providers: [FileBrowserAlertComponent, FileBrowserModalComponent]
  })
  export class FileBrowserContainerMobileComponent implements OnInit {
    @Select(FileBrowserState.getSidebar) sidebar$: Observable<Boolean>;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
                public actionSheetCtrl: ActionSheetController, public fileBrowser: FileBrowser,
                public alertComponent: FileBrowserAlertComponent, public modalComponent: FileBrowserModalComponent) {
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

    presentAlert(type) {
      this.alertComponent.presentAlert(type);
    }

    presentModal() {
      this.modalComponent.presentModal();
    }
  }