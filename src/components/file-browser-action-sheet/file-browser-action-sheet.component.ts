import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { FileBrowserContainerCoreComponent } from '../file-browser-container/file-browser-container-core.component';

@Component({
    selector: 'file-browser-action-sheet',
    templateUrl: 'file-browser-action-sheet.html',
    styleUrls: ['file-browser-action-sheet.scss'],
    providers: [FileBrowserContainerCoreComponent]
})
export class FileBrowserActionSheetComponent {
    constructor(public actionSheetCtrl: ActionSheetController, public fileBrowserContainerCore: FileBrowserContainerCoreComponent) {}

    openBtn = {
        icon: 'open',
        text: 'Open',
        handler: () => {
            console.log('Open Folder Triggered.');
        }
    }

    newFolderBtn = {
        icon: 'add',
        text: 'New Folder',
        handler: () => this.fileBrowserContainerCore.presentAlert('new-folder'),
    }

    newFileBtn = {
        icon: 'add',
        text: 'New File',
        handler: () => this.fileBrowserContainerCore.presentAlert('new-file'),
    }

    renameBtn = {
        icon: 'create',
        text: 'Rename',
        handler: () => this.fileBrowserContainerCore.presentAlert('rename'),
    }

    deleteBtn = {
        icon: 'trash',
        text: 'Delete',
        handler: () => this.fileBrowserContainerCore.presentAlert('delete'),
    }

    propertiesBtn = {
        icon: 'information',
        text: 'Properties',
        handler: () => {
            console.log('Folder Properties Triggered.');
        }
    }

    presentActionSheet(type) {
        let actionSheet = this.actionSheetCtrl.create(this.getActionSheetOptions(type));
        actionSheet.present();
    }

    getActionSheetOptions(type) {
        let actionSheet;

        switch(type) {
            case 'Folder': {
                actionSheet = {
                    title: 'Options',
                    buttons: [
                        this.openBtn,
                        this.newFolderBtn,
                        this.newFileBtn,
                        this.renameBtn,
                        this.deleteBtn,
                        this.propertiesBtn,
                    ]
                }
                break;
            }
            case 'Document': {
                actionSheet = {
                    title: 'Options',
                    buttons: [
                        this.renameBtn,
                        this.deleteBtn,
                        this.propertiesBtn,
                    ]
                }
                break;
            }
            default: {
                actionSheet = {
                    title: 'Options',
                    buttons: [
                        this.renameBtn,
                        this.deleteBtn,
                        this.propertiesBtn,
                    ]
                }
                break;
            }
        }

        return actionSheet;
    }
}