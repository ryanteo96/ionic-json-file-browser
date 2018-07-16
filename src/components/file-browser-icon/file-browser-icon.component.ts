/* ==================================================================================================== */
/* File Browser Icon Component          																*/
/* ==================================================================================================== */

import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "file-browser-icon",
	templateUrl: "file-browser-icon.html",
	styleUrls: ["file-browser-icon.scss"]
})
export class FileBrowserIconComponent implements OnInit {
	@Input() type: string;
	@Input() state: boolean;

	constructor() {}

	ngOnInit() {}
}
