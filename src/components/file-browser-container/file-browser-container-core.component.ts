/* ==================================================================================================== */
/* File Browser Container Component (Desktop)                             															*/
/* ==================================================================================================== */

/* Module imports */
import { Component, OnInit } from "@angular/core";
import {
	NavController,
	LoadingController,
	ActionSheetController
} from "ionic-angular";
import { Observable } from "rxjs";
/* State imports */
import { Select } from "@ngxs/store";
import { FileBrowserState } from "../../states/file-browser.state";
/* Component imports */
import { FileBrowserAlertComponent } from "../file-browser-alert/file-browser-alert.component";
/* Service imports */
import { FileBrowser } from "../../services/file-browser.service";

@Component({
	selector: "file-browser-core",
	templateUrl: "file-browser-container-core.html",
	styleUrls: ["file-browser-container-core.scss"],
	providers: [FileBrowserAlertComponent]
})
export class FileBrowserContainerCoreComponent implements OnInit {
	@Select(FileBrowserState.getSidebar) sidebar$: Observable<Boolean>;

	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public actionSheetCtrl: ActionSheetController,
		public fileBrowser: FileBrowser,
		public alertComponent: FileBrowserAlertComponent
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
}
