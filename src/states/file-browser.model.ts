/* ==================================================================================================== */
/* File Browser Model																					*/
/* ==================================================================================================== */

export interface Node {
	id: string;
	parent: string;
	child: string[];
}

export interface Entity {
	id: string;
	name: string;
	type: string;
}

export interface NodeEntity {
	id: string;
	level: number;
	parent: string;
	child: string[];
	name: string;
	type: string;
	collapsed: boolean;
	selected: boolean;
}
