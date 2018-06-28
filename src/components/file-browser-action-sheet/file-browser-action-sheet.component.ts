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
                        icon: 'open',
                        text: 'Open',
                        handler: () => {
                            console.log('Open Folder Triggered.');
                        }
                    },
                    {
                        icon: 'add',
                        text: 'New Folder',
                        handler: () => {
                            console.log('New Folder Triggered.');
                        }
                    },
                    {
                        icon: 'add',
                        text: 'New File',
                        handler: () => {
                            console.log('New File Triggered.');
                        }
                    },
                    {
                        icon: 'create',
                        text: 'Rename',
                        handler: () => {
                            console.log('Rename Folder Triggered.');
                        }
                    },
                    {
                        icon: 'trash',
                        text: 'Delete',
                        handler: () => {
                            console.log('Delete Folder Triggered.');
                        }
                    },
                    {
                        icon: 'information',
                        text: 'Properties',
                        handler: () => {
                            console.log('Folder Properties Triggered.');
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
                        icon: 'create',
                        text: 'Rename',
                        handler: () => {
                            console.log('Rename Folder Triggered.');
                        }
                    },
                    {
                        icon: 'trash',
                        text: 'Delete',
                        handler: () => {
                            console.log('Delete Folder Triggered.');
                        }
                    },
                    {
                        icon: 'information',
                        text: 'Properties',
                        handler: () => {
                            console.log('Folder Properties Triggered.');
                        }
                    },
                ]
            }

            return actionSheet;
        }
    }
}