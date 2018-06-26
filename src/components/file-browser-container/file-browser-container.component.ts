import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoadingController, ActionSheetController } from 'ionic-angular';
import { FileBrowserList } from '../../services/file-browser-list.service';
import { FileBrowserContainerCoreComponent } from '../file-browser-container/file-browser-container-core.component';
import { FileBrowserContainerMobileComponent } from '../file-browser-container/file-browser-container-mobile.component';

@Component({
    selector: 'file-browser',
    template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
})
export class FileBrowserContainerComponent implements OnInit {
    @ViewChild('myNav') nav: NavController;

    public rootPage: any;

    constructor(public loadingCtrl: LoadingController,
                public actionSheetCtrl: ActionSheetController, 
                public fileBrowserList: FileBrowserList,
                public plt: Platform) {
                    // console.log(this.plt.platforms());

                    if (this.plt.is('core')) {
                        this.rootPage = FileBrowserContainerCoreComponent;
                        // this.nav.push(this.corePage);
                    } else if (this.plt.is('mobile')) {
                        this.rootPage = FileBrowserContainerMobileComponent;
                        // this.nav.push(this.mobilePage);
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