import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoadingController, ActionSheetController } from 'ionic-angular';
import { FileBrowserList } from '../../services/file-browser-list.service';
import { FileBrowserContainerCoreComponent } from '../file-browser-container/file-browser-container-core.component';
import { FileBrowserContainerMobileComponent } from '../file-browser-container/file-browser-container-mobile.component';

@Component({
    selector: 'file-browser',
    template: ``,
    styles: [``],
})
export class FileBrowserContainerComponent implements OnInit {
    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
                public actionSheetCtrl: ActionSheetController, public fileBrowserList: FileBrowserList,
                public plt: Platform) {
                    // console.log(this.plt.platforms());

                    if (this.plt.is('core')) {
                        this.navCtrl.push(FileBrowserContainerCoreComponent);
                    } else if (this.plt.is('mobile')) {
                        this.navCtrl.push(FileBrowserContainerMobileComponent);
                    }
                }

    ngOnInit() {
        // this.presentLoading();
    }

    // presentLoading() {
    //   const loader = this.loadingCtrl.create({
    //       content: 'Loading files...',
    //       duration: 3000
    //   });
    //   loader.present();
    // }
}