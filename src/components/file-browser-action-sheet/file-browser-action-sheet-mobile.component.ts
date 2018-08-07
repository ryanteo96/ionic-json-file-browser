/* ==================================================================================================== */
/* File Browser Action Sheet Component (Mobile)                                    						*/
/* ==================================================================================================== */

import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { ActionSheetController } from "ionic-angular";
import { FileBrowserState } from "../../states/file-browser.state";
import { FileBrowserContainerMobileComponent } from "../file-browser-container/file-browser-container-mobile.component";
import { Open, OpenNodes } from "../../states/file-browser.actions";

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

	@Select(FileBrowserState.getOS) os$: Observable<String>;

	node: number;

	openBtn = {
		icon: "open",
		text: "Open",
		handler: () => {
			this.store.dispatch(new OpenNodes());
		}
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

	deleteBtn = {
		icon: "trash",
		text: "Delete",
		handler: () =>
			this.fileBrowserContainerMobile.presentAlert("delete", this.node)
	};

	// propertiesBtn = {
	//     icon: 'information',
	//     text: 'Properties',
	//     handler: () => this.fileBrowserContainerMobile.presentModal(),
	// }

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
						this.newFolderBtn,
						// this.newFileBtn,
						this.renameBtn,
						this.deleteBtn
						// this.propertiesBtn,
					]
				};
				break;
			}
			case "document": {
				actionSheet = {
					title: "Options",
					buttons: [
						this.openBtn,
						this.renameBtn,
						this.deleteBtn
						// this.propertiesBtn,
					]
				};
				break;
			}
			default: {
				actionSheet = {
					title: "Options",
					buttons: [
						this.renameBtn,
						this.deleteBtn
						// this.propertiesBtn,
					]
				};
				break;
			}
		}

		return actionSheet;
	}
}
