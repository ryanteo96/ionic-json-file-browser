import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'file-browser-alert',
    templateUrl: 'file-browser-alert.html',
})

export class FileBrowserAlertComponent {
    constructor(public alertCtrl: AlertController) {}

    presentAlert(type) {
        let alert;
        switch(type) {
            case 'new-folder': {
                alert = this.alertCtrl.create({
                    title: 'New Folder',
                    message: 'Enter the new folder name.',
                    inputs: [
                        {
                            name: 'foldername',
                            placeholder: 'New Folder',
                        }
                    ],
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                        },
                        {
                            text: 'Create',
                            handler: data => console.log(data),
                        }
                    ]
                });
                break;
            }
            case 'new-file': {
                alert = this.alertCtrl.create({
                    title: 'New File',
                    message: 'Enter the new file name.',
                    inputs: [
                        {
                            name: 'filename',
                            placeholder: 'New File',
                        }
                    ],
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                        },
                        {
                            text: 'Create',
                            handler: data => console.log(data),
                        }
                    ]
                });
                break;
            }
            case 'rename': {
                alert = this.alertCtrl.create({
                    title: 'Rename',
                    message: 'Enter a new file name.',
                    inputs: [
                        {
                            name: 'filename',
                            placeholder: 'File name',
                        },
                    ],
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                        },
                        {
                            text: 'Rename',
                            handler: data => {
                                console.log(data);
                            }
                        }
                    ]
                });
                break;
            }
            case 'delete': {
                alert = this.alertCtrl.create({
                    title: 'Delete',
                    message: 'Are you sure to delete?',
                    buttons: [
                        {
                            text: 'No',
                            handler: () => console.log('No'),
                        },
                        {
                            text: 'Yes',
                            handler: () => console.log('Yes'),
                        }
                    ]
                });
                break;
            }
        }

        alert.present();
    }
}