import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
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
	SetOS
} from "./file-browser.actions";
import { NodeSortingService } from "../services/node-sorting.service";

export interface FileBrowserStateModel {
	nodes: Node[];
	entities: Entity[];
	nodeEntity: NodeEntity[];
	currentNode: NodeEntity;
	childNodes: NodeEntity[];
	selectedNode: NodeEntity[];
	history: NodeEntity[];
	sort: String;
	sidebar: Boolean;
	os: String;
}

@State<FileBrowserStateModel>({
	name: "browser",
	defaults: {
		nodes: [],
		entities: [],
		nodeEntity: [],
		currentNode: <NodeEntity>{},
		childNodes: [],
		selectedNode: [],
		history: [],
		sort: "asc",
		sidebar: true,
		os: ""
	}
})
export class FileBrowserState {
	constructor(
		private store: Store,
		private nodeSorting: NodeSortingService
	) {}

	@Selector()
	static getNodes(state: FileBrowserStateModel) {
		return state.nodes;
	}

	@Selector()
	static getNodeEntity(state: FileBrowserStateModel) {
		return state.nodeEntity;
	}

	@Selector()
	static getChildNodes(state: FileBrowserStateModel) {
		return state.childNodes;
	}

	@Selector()
	static getHistory(state: FileBrowserStateModel) {
		return state.history;
	}

	@Selector()
	static getSort(state: FileBrowserStateModel): String {
		return state.sort;
	}

	@Selector()
	static getSidebar(state: FileBrowserStateModel): Boolean {
		return state.sidebar;
	}

	@Selector()
	static getOS(state: FileBrowserStateModel): String {
		return state.os;
	}

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

	@Action(SelectNode)
	selectNode(
		{ getState, patchState }: StateContext<FileBrowserStateModel>,
		{ node, multi }: SelectNode
	) {
		const state = getState();

		if (!multi) {
			const childNode = state.childNodes.map(function(node) {
				let nodeEntity = <NodeEntity>{};
				nodeEntity.id = node.id;
				nodeEntity.parent = node.parent;
				nodeEntity.child = node.child;
				nodeEntity.name = node.name;
				nodeEntity.type = node.type;
				nodeEntity.collapsed = false;
				nodeEntity.selected = false;
				return nodeEntity;
			});

			const selectedNode = childNode.find(a => a.id === node);
			selectedNode.selected = true;

			patchState({
				childNodes: childNode
			});
		} else if (multi) {
			const childNode = state.childNodes.find(a => a.id === node);
			childNode.selected = true;

			patchState({
				selectedNode: [...state.selectedNode, childNode]
			});
		}
	}

	@Action(GenerateHistory)
	generateHistory(
		{ getState, patchState }: StateContext<FileBrowserStateModel>,
		{ node }: GenerateHistory
	) {
		const state = getState();
		// Getting index of current node in history.
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

	@Action(GenerateTreeFirstLevel)
	generateTreeFirstLevel({
		getState,
		patchState
	}: StateContext<FileBrowserStateModel>) {
		const state = getState();

		// Assigning first level of tree.
		state.nodeEntity.forEach(function(node) {
			if (node.parent < 0) {
				node.level = 0;
			}
		});

		// Generating other levels of the tree.
		this.store.dispatch(new GenerateTreeLevels(0));

		patchState({
			nodeEntity: state.nodeEntity
		});
	}

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

	@Action(ShowTree)
	showTree({ getState, patchState }: StateContext<FileBrowserStateModel>) {
		const state = getState();

		patchState({
			sidebar: !state.sidebar
		});
	}

	@Action(SetOS)
	setOS({ patchState }: StateContext<FileBrowserStateModel>, { os }: SetOS) {
		patchState({
			os: os
		});
	}
}
