import { Component } from "@angular/core";
import { Platform } from "ionic-angular";

import { TestPage } from "../pages/testing/testing";
@Component({
	templateUrl: "app.html"
})
export class MyApp {
	rootPage: any = TestPage;

	constructor(platform: Platform) {
		platform.ready().then(() => {});
	}
}
