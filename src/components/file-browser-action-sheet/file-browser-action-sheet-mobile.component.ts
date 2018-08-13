/* ==================================================================================================== */
/* File Browser Action Sheet Component (Mobile)                                    						*/
/* ==================================================================================================== */

/* Module imports */
import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ActionSheetController } from "ionic-angular";
/* State imports */
import {
	Open,
	Download,
	Properties,
	Upload
} from "../../states/file-browser.actions";
/* Component imports */
import { FileBrowserContainerMobileComponent } from "../file-browser-container/file-browser-container-mobile.component";

@Component({
	selector: "file-browser-action-sheet-mobile",
	templateUrl: "file-browser-action-sheet.html",
	styleUrls: ["file-browser-action-sheet-mobile.scss"],
	providers: [FileBrowserContainerMobileComponent]
})
export class FileBrowserActionSheetMobileComponent {
	constructor(
		public store: Store,
		public actionSheetCtrl: ActionSheetController,
		public fileBrowserContainerMobile: FileBrowserContainerMobileComponent
	) {}

	node: string;

	openBtn = {
		icon: "open",
		text: "Open",
		handler: () => this.store.dispatch(new Open([this.node]))
	};

	newFolderBtn = {
		icon: "add",
		text: "New Folder",
		handler: () =>
			this.fileBrowserContainerMobile.presentAlert(
				"new-folder",
				this.node
			)
	};

	newFileBtn = {
		icon: "add",
		text: "New File",
		handler: () =>
			this.fileBrowserContainerMobile.presentAlert("new-file", this.node)
	};

	renameBtn = {
		icon: "create",
		text: "Rename",
		handler: () =>
			this.fileBrowserContainerMobile.presentAlert("rename", this.node)
	};

	uploadBtn = {
		icon: "cloud-upload",
		text: "Upload",
		handler: () => this.store.dispatch(new Upload(this.node))
	};

	downloadBtn = {
		icon: "download",
		text: "Download",
		handler: () => this.store.dispatch(new Download([this.node]))
	};

	deleteBtn = {
		icon: "trash",
		text: "Delete",
		handler: () =>
			this.fileBrowserContainerMobile.presentDeleteAlert(
				"tree",
				this.node
			)
	};

	propertiesBtn = {
		icon: "information-circle",
		text: "Properties",
		handler: () => this.store.dispatch(new Properties([this.node]))
	};

	presentActionSheet(node) {
		let actionSheet = this.actionSheetCtrl.create(
			this.getActionSheetOptions(node.type)
		);
		this.node = node.id;
		actionSheet.present();
	}

	getActionSheetOptions(type) {
		let actionSheet;

		switch (type) {
			case "folder": {
				actionSheet = {
					title: "Options",
					buttons: [
						this.openBtn,
						this.newFolderBtn,
						this.renameBtn,
						this.downloadBtn,
						this.uploadBtn,
						this.deleteBtn,
						this.propertiesBtn
					]
				};
				break;
			}
			case "file":
			case "word":
			case "excel":
			case "powerpoint":
			case "pdf":
			case "code":
			case "archive":
			case "image":
			case "video":
			case "audio": {
				actionSheet = {
					title: "Options",
					buttons: [
						this.openBtn,
						this.renameBtn,
						this.downloadBtn,
						this.deleteBtn,
						this.propertiesBtn
					]
				};
				break;
			}
			default: {
				actionSheet = {
					title: "Options",
					buttons: [
						this.openBtn,
						this.renameBtn,
						this.downloadBtn,
						this.deleteBtn,
						this.propertiesBtn
					]
				};
				break;
			}
		}

		return actionSheet;
	}
}
