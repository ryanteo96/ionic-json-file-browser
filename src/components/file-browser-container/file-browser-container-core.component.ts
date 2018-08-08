/* ==================================================================================================== */
/* File Browser Container Component (Desktop)                             															*/
/* ==================================================================================================== */

import { Component, OnInit } from "@angular/core";
import {
	NavController,
	LoadingController,
	ActionSheetController
} from "ionic-angular";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { FileBrowser } from "../../services/file-browser.service";
import { FileBrowserState } from "../../states/file-browser.state";
import { FileBrowserAlertComponent } from "../file-browser-alert/file-browser-alert.component";
import { FileBrowserModalComponent } from "../file-browser-modal/file-browser-modal.component";

@Component({
	selector: "file-browser-core",
	templateUrl: "file-browser-container-core.html",
	styleUrls: ["file-browser-container-core.scss"],
	providers: [FileBrowserAlertComponent, FileBrowserModalComponent]
})
export class FileBrowserContainerCoreComponent implements OnInit {
	@Select(FileBrowserState.getSidebar) sidebar$: Observable<Boolean>;

	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public actionSheetCtrl: ActionSheetController,
		public fileBrowser: FileBrowser,
		public alertComponent: FileBrowserAlertComponent,
		public modalComponent: FileBrowserModalComponent
	) {}

	ngOnInit() {
		// this.presentLoading();
	}

	presentLoading() {
		const loader = this.loadingCtrl.create({
			content: "Loading files...",
			duration: 3000
		});
		loader.present();
	}

	presentAlert(type, node) {
		this.alertComponent.presentAlert(type, node);
	}

	presentDeleteAlert(type, node) {
		this.alertComponent.presentDeleteAlert(type, node);
	}

	presentModal() {
		this.modalComponent.presentModal();
	}
}
