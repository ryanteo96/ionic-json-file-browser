/* ==================================================================================================== */
/* File Browser State 																					*/
/* ==================================================================================================== */

import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { ErrorHandler } from "@angular/core";
import { Node, Entity, NodeEntity } from "./file-browser.model";
import {
	GenerateFileBrowser,
	GetNode,
	SelectNode,
	GenerateTreeFirstLevel,
	GenerateTreeLevels,
	GenerateHistory,
	ToggleFolder,
	SortNodes,
	ShowTree,
	SetOS,
	UnselectNode,
	Delete,
	DeleteNodes,
	OpenNodes,
	Open,
	DownloadNodes,
	Download,
	PropertiesNodes,
	Properties
} from "./file-browser.actions";
import { NodeSortingService } from "../services/node-sorting.service";

export interface FileBrowserStateModel {
	nodes: Node[];
	entities: Entity[];
	nodeEntity: NodeEntity[];
	currentNode: NodeEntity;
	selectedNode: NodeEntity;
	childNodes: NodeEntity[];
	history: NodeEntity[];
	sort: String;
	sidebar: Boolean;
	os: String;
	multiSelect: boolean;
}

@State<FileBrowserStateModel>({
	name: "browser",
	defaults: {
		nodes: [],
		entities: [],
		nodeEntity: [],
		currentNode: <NodeEntity>{},
		selectedNode: <NodeEntity>{},
		childNodes: [],
		history: [],
		sort: "asc",
		sidebar: true,
		os: "",
		multiSelect: false
	}
})
export class FileBrowserState implements ErrorHandler {
	constructor(public store: Store, public nodeSorting: NodeSortingService) {}

	handleError(error) {
		console.error(error);
	}

	/* ======================================== Selector Functions ======================================== */
	/* Getting all nodes */
	@Selector()
	static getNodes(state: FileBrowserStateModel) {
		return state.nodes;
	}

	/* Getting all nodes with entities */
	@Selector()
	static getNodeEntity(state: FileBrowserStateModel) {
		return state.nodeEntity;
	}

	/* Getting all child nodes of a parent node */
	@Selector()
	static getChildNodes(state: FileBrowserStateModel) {
		return state.childNodes;
	}

	/* Getting navigation history */
	@Selector()
	static getHistory(state: FileBrowserStateModel) {
		return state.history;
	}

	/* Getting sorting(ascending/descending) of the nodes */
	@Selector()
	static getSort(state: FileBrowserStateModel): String {
		return state.sort;
	}

	/* Getting the boolean value of sidebar presence */
	@Selector()
	static getSidebar(state: FileBrowserStateModel): Boolean {
		return state.sidebar;
	}

	/* Getting the device operating system */
	@Selector()
	static getOS(state: FileBrowserStateModel): String {
		return state.os;
	}

	/* Getting the boolean value of multiselect */
	@Selector()
	static getMultiSelect(state: FileBrowserStateModel): Boolean {
		return state.multiSelect;
	}
	/* ===================================== End of Selector Functions ===================================== */

	/* ========================================== Action Functions ========================================= */
	/* Generating all nodes with entites */
	@Action(GenerateFileBrowser)
	generateFileBrowser(
		{ patchState }: StateContext<FileBrowserStateModel>,
		{ nodes, entities }: GenerateFileBrowser
	) {
		// Joining nodes and entities.
		const nodeEntity = nodes.map(function(node) {
			let nodeEntity = <NodeEntity>{};
			nodeEntity.id = node.id;
			nodeEntity.parent = node.parent;
			nodeEntity.child = node.child;
			nodeEntity.name = entities.find(a => a.id === node.id).name;
			nodeEntity.type = entities.find(a => a.id === node.id).type;
			nodeEntity.collapsed = false;
			nodeEntity.selected = false;
			return nodeEntity;
		});

		// Generating the first level of the tree.
		this.store.dispatch(new GenerateTreeFirstLevel());

		patchState({
			nodes: nodes,
			entities: entities,
			nodeEntity: this.nodeSorting.sortNodes("asc", nodeEntity)
		});
	}

	/* Setting current node and child nodes to be displayed on the file browser  */
	@Action(GetNode)
	getNode(
		{ getState, patchState }: StateContext<FileBrowserStateModel>,
		{ node }: GetNode
	) {
		const state = getState();
		const currentNode = state.nodeEntity.filter(a => a.id === node)[0];
		const childNodes = state.nodeEntity.filter(a => a.parent === node);

		patchState({
			currentNode: currentNode,
			childNodes: childNodes
		});

		this.store.dispatch(new GenerateHistory(node));
	}

	/* Setting select attribute on nodes that have been selected in the file browser */
	@Action(SelectNode)
	selectNode(
		{ getState, patchState }: StateContext<FileBrowserStateModel>,
		{ node, multi, type }: SelectNode
	) {
		const state = getState();

		/* If alt/shift keys are not held during selection */
		if (!multi) {
			const childNode = state.childNodes.map(function(node) {
				node.selected = false;
				return node;
			});

			const selectedNode = childNode.find(a => a.id === node);
			selectedNode.selected = true;

			patchState({
				childNodes: childNode,
				selectedNode: selectedNode,
				multiSelect: false
			});
			/* If alt/shift keys are held during selection */
		} else if (multi) {
			if (type === "alt") {
				const selectedNode = state.childNodes.find(a => a.id === node);

				if (selectedNode.selected) {
					selectedNode.selected = false;
				} else selectedNode.selected = true;

				/* potential bug ⁉️ */
				patchState({
					childNodes: state.childNodes,
					selectedNode: selectedNode,
					multiSelect: true
				});
			} else if (type === "shift") {
				let childNode = state.childNodes.map(function(node) {
					node.selected = false;
					return node;
				});

				const selectedNode = childNode.find(a => a.id === node);

				/* Selecting a range of nodes based on the second selection and anchor node */
				if (
					state.childNodes.indexOf(selectedNode) >
					state.childNodes.indexOf(state.selectedNode)
				) {
					childNode = state.childNodes.map(function(node) {
						if (
							state.childNodes.indexOf(node) <=
								state.childNodes.indexOf(selectedNode) &&
							state.childNodes.indexOf(node) >=
								state.childNodes.indexOf(state.selectedNode)
						) {
							node.selected = true;
							return node;
						}

						return node;
					});
				} else if (
					state.childNodes.indexOf(selectedNode) <
					state.childNodes.indexOf(state.selectedNode)
				) {
					childNode = state.childNodes.map(function(node) {
						if (
							state.childNodes.indexOf(node) >=
								state.childNodes.indexOf(selectedNode) &&
							state.childNodes.indexOf(node) <=
								state.childNodes.indexOf(state.selectedNode)
						) {
							node.selected = true;
							return node;
						}

						return node;
					});
				}

				patchState({
					childNodes: childNode,
					multiSelect: true
				});
			}
		}
	}

	/* Removing select attribute on selected nodes */
	@Action(UnselectNode)
	unselectNode({
		getState,
		patchState
	}: StateContext<FileBrowserStateModel>) {
		const state = getState();

		const childNode = state.childNodes.map(function(node) {
			node.selected = false;
			return node;
		});

		patchState({
			childNodes: childNode,
			multiSelect: false
		});
	}

	/* Generating navigation history for the file browser */
	@Action(GenerateHistory)
	generateHistory(
		{ getState, patchState }: StateContext<FileBrowserStateModel>,
		{ node }: GenerateHistory
	) {
		const state = getState();
		/* Getting index of current node in history. */
		const currentNode = state.nodeEntity.find(a => a.id === node);

		if (state.history.indexOf(currentNode) < 0) {
			if (currentNode.level === 0) {
				patchState({
					history: state.history.concat(currentNode)
				});
			} else {
				let level = currentNode.level;
				let history: NodeEntity[] = [];
				let node = currentNode;

				while (level >= 0) {
					history.push(node);
					node = state.nodeEntity.find(a => a.id === node.parent);
					level--;
				}

				patchState({
					history: history.reverse()
				});
			}
		} else {
			const index = state.history.indexOf(currentNode) + 1;

			patchState({
				history: state.history.slice(0, index)
			});
		}
	}

	/* Generating first level of the tree */
	@Action(GenerateTreeFirstLevel)
	generateTreeFirstLevel({
		getState,
		patchState
	}: StateContext<FileBrowserStateModel>) {
		const state = getState();

		// Assigning first level of tree.
		state.nodeEntity.forEach(function(node) {
			if (!node.parent) {
				node.level = 0;
			}
		});

		// Generating other levels of the tree.
		this.store.dispatch(new GenerateTreeLevels(0));

		patchState({
			nodeEntity: state.nodeEntity
		});
	}

	/* Generating all other levels of the tree */
	@Action(GenerateTreeLevels)
	generateTreeLevels(
		{ getState, patchState }: StateContext<FileBrowserStateModel>,
		{ level }: GenerateTreeLevels
	) {
		const state = getState();

		const rootNodes = state.nodeEntity.filter(a => a.level === level);

		// Assigning all other levels of tree.
		rootNodes.forEach(function(node) {
			const childNodes = state.nodeEntity.find(a => a.id === node.id);

			if (childNodes.child.length > 0) {
				childNodes.child.forEach(function(node) {
					state.nodeEntity.find(a => a.id === node).level = level + 1;
				});
			}
		});

		if (rootNodes.length > 0) {
			this.store.dispatch(new GenerateTreeLevels(level + 1));
		}

		patchState({
			nodeEntity: state.nodeEntity
		});
	}

	/* Setting collapsed attribute on folder nodes */
	@Action(ToggleFolder)
	toggleFolder(
		{ getState, patchState }: StateContext<FileBrowserStateModel>,
		{ node }: ToggleFolder
	) {
		const state = getState();

		state.nodeEntity.find(
			a => a.id === node
		).collapsed = !state.nodeEntity.find(a => a.id === node).collapsed;

		patchState({
			nodeEntity: state.nodeEntity
		});
	}

	/* Sorting nodes and setting sort attribute in the state */
	@Action(SortNodes)
	sortNodes(
		{ getState, patchState }: StateContext<FileBrowserStateModel>,
		{ sort }: SortNodes
	) {
		const state = getState();

		patchState({
			childNodes: this.nodeSorting.sortNodes(sort, state.childNodes),
			sort: sort
		});
	}

	/* Setting sidebar attribute in the state */
	@Action(ShowTree)
	showTree({ getState, patchState }: StateContext<FileBrowserStateModel>) {
		const state = getState();

		patchState({
			sidebar: !state.sidebar
		});
	}

	/* Setting operating system attribute in the state */
	@Action(SetOS)
	setOS({ patchState }: StateContext<FileBrowserStateModel>, { os }: SetOS) {
		patchState({
			os: os
		});
	}

	/* Setting nodes to be opened before dispatching Open action */
	@Action(OpenNodes)
	openNodes({ getState }: StateContext<FileBrowserStateModel>) {
		const state = getState();
		const selectedNodes = state.childNodes.filter(a => a.selected);
		const nodeIds = selectedNodes.map(function(node) {
			return node.id;
		});

		this.store.dispatch(new Open(nodeIds));
	}

	/* Setting nodes to be deleted before dispatching Delete action */
	@Action(DeleteNodes)
	deleteNodes({ getState }: StateContext<FileBrowserStateModel>) {
		const state = getState();
		const selectedNodes = state.childNodes.filter(a => a.selected);
		const nodeIds = selectedNodes.map(function(node) {
			return node.id;
		});

		this.store.dispatch(new Delete(nodeIds));
	}

	/* Setting nodes to be downloaded before dispatching Download action */
	@Action(DownloadNodes)
	downloadNodes({ getState }: StateContext<FileBrowserStateModel>) {
		const state = getState();
		const selectedNodes = state.childNodes.filter(a => a.selected);
		const nodeIds = selectedNodes.map(function(node) {
			return node.id;
		});

		this.store.dispatch(new Download(nodeIds));
	}

	@Action(PropertiesNodes)
	propertiesNodes({ getState }: StateContext<FileBrowserStateModel>) {
		const state = getState();
		const selectedNodes = state.childNodes.filter(a => a.selected);
		const nodeIds = selectedNodes.map(function(node) {
			return node.id;
		});

		this.store.dispatch(new Properties(nodeIds));
	}

	/* ======================================= End of Action Functions ====================================== */
}
