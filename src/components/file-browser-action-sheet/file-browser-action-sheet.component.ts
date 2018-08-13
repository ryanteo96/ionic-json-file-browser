/* ==================================================================================================== */
/* File Browser Action Sheet Component                                     								*/
/* ==================================================================================================== */

/* Module imports */
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { ActionSheetController } from "ionic-angular";
/* State imports */
import { Store, Select } from "@ngxs/store";
import {
	OpenNodes,
	DownloadNodes,
	PropertiesNodes,
	Upload,
	Open,
	Download,
	Properties
} from "../../states/file-browser.actions";
import { FileBrowserState } from "../../states/file-browser.state";
/* Component imports */
import { FileBrowserContainerCoreComponent } from "../file-browser-container/file-browser-container-core.component";

@Component({
	selector: "file-browser-action-sheet",
	templateUrl: "file-browser-action-sheet.html",
	styleUrls: ["file-browser-action-sheet.scss"],
	providers: [FileBrowserContainerCoreComponent]
})
export class FileBrowserActionSheetComponent {
	constructor(
		public store: Store,
		public actionSheetCtrl: ActionSheetController,
		public fileBrowserContainerCore: FileBrowserContainerCoreComponent
	) {}

	@Select(FileBrowserState.getMultiSelect) multiSelect$: Observable<Boolean>;

	node: string;
	browser: string;

	openBtn = {
		icon: "open",
		text: "Open",
		handler: () => {
			if (this.browser === "list") this.store.dispatch(new OpenNodes());
			if (this.browser === "tree")
				this.store.dispatch(new Open([this.node]));
		}
	};

	newFolderBtn = {
		icon: "add",
		text: "New Folder",
		handler: () => {
			this.fileBrowserContainerCore.presentAlert("new-folder", this.node);
		}
	};

	newFileBtn = {
		icon: "add",
		text: "New File",
		handler: () =>
			this.fileBrowserContainerCore.presentAlert("new-file", this.node)
	};

	renameBtn = {
		icon: "create",
		text: "Rename",
		handler: () =>
			this.fileBrowserContainerCore.presentAlert("rename", this.node)
	};

	uploadBtn = {
		icon: "cloud-upload",
		text: "Upload",
		handler: () => this.store.dispatch(new Upload(this.node))
	};

	downloadBtn = {
		icon: "download",
		text: "Download",
		handler: () => {
			if (this.browser === "list")
				this.store.dispatch(new DownloadNodes());
			if (this.browser === "tree")
				this.store.dispatch(new Download([this.node]));
		}
	};

	deleteBtn = {
		icon: "trash",
		text: "Delete",
		handler: () => {
			if (this.browser === "list")
				this.fileBrowserContainerCore.presentDeleteAlert(
					"list",
					this.node
				);
			if (this.browser === "tree")
				this.fileBrowserContainerCore.presentDeleteAlert(
					"tree",
					this.node
				);
		}
	};

	propertiesBtn = {
		icon: "information-circle",
		text: "Properties",
		handler: () => {
			if (this.browser === "list")
				this.store.dispatch(new PropertiesNodes());
			if (this.browser === "tree")
				this.store.dispatch(new Properties([this.node]));
		}
	};

	cancelBtn = {
		icon: "close",
		text: "Cancel",
		handler: () => {}
	};

	presentActionSheet(node, browser) {
		let actionSheet;
		let multi: Boolean;

		this.multiSelect$.subscribe(a => {
			multi = a;
		});

		if (multi) {
			actionSheet = this.actionSheetCtrl.create(
				this.getActionSheetOptions("multi")
			);
		} else {
			actionSheet = this.actionSheetCtrl.create(
				this.getActionSheetOptions(node.type)
			);
		}

		this.node = node.id;
		this.browser = browser;
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
						this.propertiesBtn,
						this.cancelBtn
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
						this.propertiesBtn,
						this.cancelBtn
					]
				};
				break;
			}
			case "multi": {
				actionSheet = {
					title: "Options",
					buttons: [
						this.openBtn,
						this.downloadBtn,
						this.deleteBtn,
						this.propertiesBtn,
						this.cancelBtn
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
						this.propertiesBtn,
						this.cancelBtn
					]
				};
				break;
			}
		}

		return actionSheet;
	}
}
