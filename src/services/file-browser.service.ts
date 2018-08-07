/* ==================================================================================================== */
/* File Browser Service 																				*/
/* ==================================================================================================== */
/* Service to generate all nodes with entities. It also includes functions to toggle folders in the     */
/* tree and also toggle the tree view in file browser.                                                  */
/* ==================================================================================================== */

import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Node, Entity } from "../states/file-browser.model";
import {
	GenerateFileBrowser,
	GetNode,
	SortNodes,
	ShowTree
} from "../states/file-browser.actions";

@Injectable()
export class FileBrowser {
	nodes: Node[];
	entities: Entity[];

	constructor(private store: Store) {}

	// Generating the nodes and entities based on JSON
	generateFileBrowser(nodes: Node[], entities: Entity[], node: number) {
		this.nodes = nodes;
		this.entities = entities;

		if (nodes.length === 0) {
			return console.error("Invalid Node JSON");
		}

		if (entities.length === 0) {
			return console.error("Invalid Entities JSON");
		}
		// TO-DO check if currentNode does not exist.
		this.store.dispatch(new GenerateFileBrowser(<any>nodes, <any>entities));
		this.store.dispatch(new GetNode(node));
	}

	toggleSort(sort) {
		this.store.dispatch(new SortNodes(sort));
	}

	showTree() {
		this.store.dispatch(new ShowTree());
	}
}
