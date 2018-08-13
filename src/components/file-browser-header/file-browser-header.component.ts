/* ==================================================================================================== */
/* File Browser Header Component                                										*/
/* ==================================================================================================== */

/* Module imports */
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
/* State imports */
import { Store, Select } from "@ngxs/store";
import { FileBrowserState } from "../../states/file-browser.state";
import { UnselectNode } from "../../states/file-browser.actions";
/* Service imports */
import { FileBrowser } from "../../services/file-browser.service";

@Component({
	selector: "file-browser-header",
	templateUrl: "file-browser-header.html",
	styleUrls: ["file-browser-header.scss"]
})
export class FileBrowserHeaderComponent implements OnInit {
	@Select(FileBrowserState.getSort) sort$: Observable<String>;

	@Select(FileBrowserState.getOS) os$: Observable<String>;

	constructor(public store: Store, public fileBrowser: FileBrowser) {}

	ngOnInit() {}

	toggleSort(sort) {
		this.fileBrowser.toggleSort(sort);
	}

	showTree() {
		this.fileBrowser.showTree();
	}

	unselectNodes() {
		this.store.dispatch(new UnselectNode());
	}
}
