import { Injectable } from "@angular/core";
import { Actions, ofActionSuccessful } from "@ngxs/store";
import { Download } from "../states/file-browser.actions";

@Injectable()
export class OpenHandler {
	constructor(private actions$: Actions) {
		console.log("open handler created");

		this.actions$
			.pipe(ofActionSuccessful(Download))
			.subscribe(({ node_id }) => {
				// substitute this with your own implementation
				console.log(node_id);
				// console.log(new_name);
			});
	}
}
