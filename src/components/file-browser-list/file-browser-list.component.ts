/* ==================================================================================================== */
/* File Browser List Component																			*/
/* ==================================================================================================== */

/* Module imports */
import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";
/* State imports */
import {
	GetNode,
	SelectNode,
	UnselectNode,
	Open
} from "../../states/file-browser.actions";
import { Entity } from "../../states/file-browser.model";
import { FileBrowserState } from "../../states/file-browser.state";
/* Component imports */
import { FileBrowserActionSheetComponent } from "../file-browser-action-sheet/file-browser-action-sheet.component";
/* Service imports */
import { FileBrowser } from "../../services/file-browser.service";

@Component({
	selector: "file-browser-list",
	templateUrl: "file-browser-list.html",
	styleUrls: ["file-browser-list.scss"],
	providers: [FileBrowserActionSheetComponent]
})
export class FileBrowserListComponent implements OnInit {
	@Select(FileBrowserState.getChildNodes) nodes$: Observable<Entity>;

	constructor(
		public store: Store,
		public fileBrowser: FileBrowser,
		public fileBrowserActionSheet: FileBrowserActionSheetComponent
	) {}

	ngOnInit() {}

	showNode(node) {
		if (node.type === "folder") this.store.dispatch(new GetNode(node.id));
		else this.store.dispatch(new Open([node.id]));
	}

	showActionSheet(node) {
		event.stopPropagation();

		if (!node.selected) {
			this.store.dispatch(new SelectNode(node.id, false, ""));
		}

		this.fileBrowserActionSheet.presentActionSheet(node, "list");
	}

	selectNode(node, event) {
		event.stopPropagation();

		if (event.ctrlKey || event.metaKey) {
			this.store.dispatch(new SelectNode(node.id, true, "alt"));
		} else if (event.shiftKey) {
			this.store.dispatch(new SelectNode(node.id, true, "shift"));
		} else this.store.dispatch(new SelectNode(node.id, false, ""));
	}

	unselectNodes() {
		this.store.dispatch(new UnselectNode());
	}

	openNode(node) {
		this.store.dispatch(new Open([node.id]));
	}
}
