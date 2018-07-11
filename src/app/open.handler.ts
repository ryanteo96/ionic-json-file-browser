import { Injectable } from "@angular/core";
import { Actions, ofActionSuccessful } from "@ngxs/store";
import { Delete } from "../states/file-browser.actions";

@Injectable()
export class OpenHandler {
	constructor(private actions$: Actions) {
		console.log("open handler created");

		this.actions$
			.pipe(ofActionSuccessful(Delete))
			.subscribe(({ node_id }) => {
				// substitute this with your own implementation
				console.log(node_id);
			});
	}
}
