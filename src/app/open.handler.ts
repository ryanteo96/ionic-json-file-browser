import { Injectable } from "@angular/core";
import { Actions, ofActionSuccessful } from "@ngxs/store";
import { Upload } from "../../dist";

@Injectable()
export class OpenHandler {
	constructor(private actions$: Actions) {
		console.log("open handler created");

		this.actions$
			.pipe(ofActionSuccessful(Upload))
			.subscribe(({ parent_id }) => {
				// substitute this with your own implementation
				console.log(parent_id);
				// console.log(new_name);
			});
	}
}
