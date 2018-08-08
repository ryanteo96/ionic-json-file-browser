import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import * as node from "./node.json";
import * as entity from "./entity.json";
import * as test from "./test.json";

import { FileBrowser } from "../../services/file-browser.service";

@Component({
	selector: "testing",
	templateUrl: "testing.html"
})
export class TestPage implements OnInit {
	constructor(
		public navCtrl: NavController,
		private fileBrowser: FileBrowser
	) {}

	ngOnInit() {
		// console.log(JSON.stringify(node));
		this.fileBrowser.generateFileBrowser(<any>node, <any>entity, "0");
	}
}
