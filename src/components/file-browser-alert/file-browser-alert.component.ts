/* ==================================================================================================== */
/* File Browser Alert Component                                     									*/
/* ==================================================================================================== */

/* Module imports */
import { Component } from "@angular/core";
import { AlertController } from "ionic-angular";
/* State imports */
import { Store } from "@ngxs/store";
import {
	NewFolder,
	Rename,
	DeleteNodes,
	Delete
} from "../../states/file-browser.actions";

@Component({
	selector: "file-browser-alert",
	templateUrl: "file-browser-alert.html"
})
export class FileBrowserAlertComponent {
	constructor(public store: Store, public alertCtrl: AlertController) {}

	presentAlert(type, node) {
		let alert;
		switch (type) {
			case "new-folder": {
				alert = this.alertCtrl.create({
					title: "New Folder",
					message: "Enter the new folder name.",
					inputs: [
						{
							name: "folder_name",
							placeholder: "New Folder"
						}
					],
					buttons: [
						{
							text: "Cancel",
							role: "cancel"
						},
						{
							text: "Create",
							handler: data => this.newFolder(data, node)
						}
					]
				});
				break;
			}
			case "new-file": {
				alert = this.alertCtrl.create({
					title: "New File",
					message: "Enter the new file name.",
					inputs: [
						{
							name: "filename",
							placeholder: "New File"
						}
					],
					buttons: [
						{
							text: "Cancel",
							role: "cancel"
						},
						{
							text: "Create",
							handler: data => console.log(data)
						}
					]
				});
				break;
			}
			case "rename": {
				alert = this.alertCtrl.create({
					title: "Rename",
					message: "Enter a new name.",
					inputs: [
						{
							name: "name",
							placeholder: "Name"
						}
					],
					buttons: [
						{
							text: "Cancel",
							role: "cancel"
						},
						{
							text: "Rename",
							handler: data => this.rename(data, node)
						}
					]
				});
				break;
			}
			case "delete": {
				alert = this.alertCtrl.create({
					title: "Delete",
					message: "Are you sure to delete?",
					buttons: [
						{
							text: "No"
						},
						{
							text: "Yes",
							handler: () => this.delete()
						}
					]
				});
				break;
			}
		}

		alert.present();
	}

	presentDeleteAlert(type, node) {
		let alert = this.alertCtrl.create({
			title: "Delete",
			message: "Are you sure to delete?",
			buttons: [
				{
					text: "No"
				},
				{
					text: "Yes",
					handler: () => {
						if (type === "list")
							this.store.dispatch(new DeleteNodes());
						if (type === "tree")
							this.store.dispatch(new Delete([node]));
					}
				}
			]
		});

		alert.present();
	}

	newFolder(data, node) {
		this.store.dispatch(new NewFolder(node, data.folder_name));
	}

	rename(data, node) {
		this.store.dispatch(new Rename(node, data.name));
	}

	delete() {
		this.store.dispatch(new DeleteNodes());
	}
}
