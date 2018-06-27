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

    presentActionSheet(type) {
        let actionSheet = this.actionSheetCtrl.create(this.getActionSheetOptions(type));
        actionSheet.present();
    }

    getActionSheetOptions(type) {
        let actionSheet;

        if (type === 'Folder') {
            actionSheet = {
                title: 'Options',
                buttons: [
                    {
                        text: 'New Folder',
                        handler: () => {
                            console.log('New Folder Triggered.');
                        }
                    },
                ]
            }
            
            return actionSheet;
        }

        if (type === 'Document') {
            actionSheet = {
                title: 'Options',
                buttons: [
                    {
                        text: 'Rename',
                        handler: () => {
                            console.log('Rename Document Triggered.');
                        }
                    },
                ]
            }

            return actionSheet;
        }
    }
}