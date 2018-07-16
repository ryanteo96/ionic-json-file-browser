/* ==================================================================================================== */
/* File Browser Actions																					*/
/* ==================================================================================================== */

import { Node, Entity } from "./file-browser.model";

export class GenerateFileBrowser {
	static readonly type = "[Browser] Set";

	constructor(public nodes: Node[], public entities: Entity[]) {}
}

export class GetNode {
	static readonly type = "[Node] Get";

	constructor(public node: number) {}
}

export class SelectNode {
	static readonly type = "[Node] Select";

	constructor(
		public node: number,
		public multi: boolean,
		public type: string
	) {}
}

export class UnselectNode {
	static readonly type = "[Node] Unselect";

	constructor() {}
}

export class GenerateHistory {
	static readonly type = "[Browser] History";

	constructor(public node: number) {}
}

export class GenerateTreeFirstLevel {
	static readonly type = "[Tree] Generate First Level";

	constructor() {}
}

export class GenerateTreeLevels {
	static readonly type = "[Tree] Generate Other Levels";

	constructor(public level: number) {}
}

export class ToggleFolder {
	static readonly type = "[Tree] ToggleFolder";

	constructor(public node: number) {}
}

export class SortNodes {
	static readonly type = "[Node] Sort";

	constructor(public sort: string) {}
}

export class ShowTree {
	static readonly type = "[Browser] Show Tree";

	constructor() {}
}

export class SetOS {
	static readonly type = "[OS] Set";

	constructor(public os: string) {}
}

export class Open {
	static readonly type = "[Node] Open";

	constructor(public node_id: number) {}
}

export class NewFolder {
	static readonly type = "[Node] New Folder";

	constructor(public parent_id: number, public folder_name: string) {}
}

export class Rename {
	static readonly type = "[Node] Rename";

	constructor(public node_id: number, public new_name: string) {}
}

export class Delete {
	static readonly type = "[Node] Delete";

	constructor(public node_id: number[]) {}
}

export class DeleteNodes {
	static readonly type = "[Node] Delete Nodes";

	constructor() {}
}
