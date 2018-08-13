/* ==================================================================================================== */
/* File Browser List Component (Mobile)																	*/
/* ==================================================================================================== */

/* Module imports */
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
/* State imports */
import { Store, Select } from "@ngxs/store";
import { Entity } from "../../states/file-browser.model";
import { FileBrowserState } from "../../states/file-browser.state";
import { GetNode } from "../../states/file-browser.actions";
/* Component imports */
import { FileBrowserActionSheetMobileComponent } from "../file-browser-action-sheet/file-browser-action-sheet-mobile.component";
/* Service imports */
import { FileBrowser } from "../../services/file-browser.service";

@Component({
	selector: "file-browser-list-mobile",
	templateUrl: "file-browser-list-mobile.html",
	styleUrls: ["file-browser-list.scss"],
	providers: [FileBrowserActionSheetMobileComponent]
})
export class FileBrowserListMobileComponent implements OnInit {
	@Select(FileBrowserState.getChildNodes) nodes$: Observable<Entity>;

	constructor(
		public store: Store,
		public fileBrowser: FileBrowser,
		public fileBrowserActionSheet: FileBrowserActionSheetMobileComponent
	) {}

	ngOnInit() {}

	showNode(node) {
		if (node.type === "folder") this.store.dispatch(new GetNode(node.id));
	}

	showActionSheet(node) {
		event.stopPropagation();
		this.fileBrowserActionSheet.presentActionSheet(node);
	}
}
