import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';

@Component({
    selector: 'file-browser-action-sheet',
    templateUrl: 'file-browser-action-sheet.html',
    styleUrls: ['file-browser-action-sheet.scss']
})
export class FileBrowserActionSheetComponent implements OnInit {
    constructor(private actionSheetCtrl: ActionSheetController) {}

    ngOnInit() {}

    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Options',
            buttons: [
                {
                    text: 'New Folder',
                    handler: () => {
                        console.log('New Folder Triggered.');
                    }
                },
            ]
        });
        actionSheet.present();
    }
}
