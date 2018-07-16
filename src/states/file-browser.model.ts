/* ==================================================================================================== */
/* File Browser Model																					*/
/* ==================================================================================================== */

export interface Node {
	id: number;
	parent: number;
	child: number[];
}

export interface Entity {
	id: number;
	name: string;
	type: string;
}

export interface NodeEntity {
	id: number;
	level: number;
	parent: number;
	child: number[];
	name: string;
	type: string;
	collapsed: boolean;
	selected: boolean;
}
