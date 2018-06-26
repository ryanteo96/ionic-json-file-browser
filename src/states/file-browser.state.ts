import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import {
    Node,
    Entity,
    NodeEntity,
} from './file-browser.model';
import { 
    GenerateFileBrowser,
    GetNode,
    GenerateTreeFirstLevel,
    GenerateTreeLevels,
    GenerateHistory,
    ToggleFolder,
    SortNodes,
    // NodeSelect,
} from './file-browser.actions';
import { NodeSortingService } from '../services/node-sorting.service';

export interface FileBrowserStateModel {
    nodes: Node[];
    entities: Entity[];
    nodeEntity: NodeEntity[];
    currentNode: Node;
    childNodes: Node[];
    currentEntity: Entity;
    childEntities: Entity[];
    nodeSelected: Node;
    history: Entity[];
    sort: String;
}

@State<FileBrowserStateModel>({
    name: 'browser',
    defaults : {
        nodes: [],
        entities: [],
        nodeEntity: [],
        currentNode: <Node>{},
        childNodes: [],
        currentEntity: <Entity>{},
        childEntities: [],
        nodeSelected: <Node>{},
        history: [],
        sort: 'asc',
    },
})

export class FileBrowserState {
    constructor(private store: Store, private nodeSorting: NodeSortingService) {}

    @Selector()
    static getNodes(state: FileBrowserStateModel) {
        return state.nodeEntity;
    }

    @Selector()
    static getChildEntities(state: FileBrowserStateModel) {
        return state.childEntities;
    }

    @Selector()
    static getHistory(state: FileBrowserStateModel) {
        return state.history;
    }

    @Selector()
    static getSort(state: FileBrowserStateModel): String{
        return state.sort;
    }

    @Selector()
    static getNodeSelected(state: FileBrowserStateModel) {
        console.log('here');
        return state.nodeSelected;
    }

    @Action(GenerateFileBrowser)
    generateFileBrowser({ patchState }: StateContext<FileBrowserStateModel>, { nodes, entities }: GenerateFileBrowser) {
        // Joining nodes and entities.
        const nodeEntity = nodes.map(function(node) {
            let nodeEntity = <NodeEntity>{};
            nodeEntity.id = node.id;
            nodeEntity.parent = node.parent;
            nodeEntity.child = node.child;
            nodeEntity.name = entities.find(a => a.id === node.id).name;
            nodeEntity.type = entities.find(a => a.id === node.id).type;
            nodeEntity.collapsed = false;
            return nodeEntity;
        });

        // Generating the first level of the tree.
        this.store.dispatch(new GenerateTreeFirstLevel());

        patchState({
            nodes: nodes,
            entities: entities,
            nodeEntity: this.nodeSorting.sortNodes('asc', nodeEntity),
        });
    }

    @Action(GetNode) 
    getNode({ getState, patchState }: StateContext<FileBrowserStateModel>, { node }: GetNode) {
        const state = getState();
        // Getting current node.
        const currentNode = state.nodes.filter(a => a.id === node)[0];
        const childNodes = state.nodes.filter(a => a.parent === node);
        // Getting node entity and child entities.
        const currentEntity = state.entities.filter(a => a.id === node)[0];
        const childEntities = childNodes.map(function(node) {
            return state.entities.filter(a => a.id === node.id)[0];
        });

        patchState({
            currentNode: currentNode,
            childNodes: childNodes,
            currentEntity: currentEntity,
            childEntities: this.nodeSorting.sortNodes(state.sort, childEntities),
            history: [...state.history, currentEntity],
        });
    }

    @Action(GenerateHistory)
    generateHistory({ getState, patchState }: StateContext<FileBrowserStateModel>, { node }: GenerateHistory) {
        const state = getState();
        // Getting index of current node in history.
        const currentNode = state.history.find(a => a.id === node);
        const index = state.history.indexOf(currentNode) + 1;

        patchState({
            history: state.history.slice(0, index),
        });
    }

    @Action(GenerateTreeFirstLevel)
    generateTreeFirstLevel({ getState, patchState }: StateContext<FileBrowserStateModel>) {
        const state = getState();

        // Assigning first level of tree.
        state.nodeEntity.forEach(function(node) {
            if(node.parent < 0) {
                node.level = 0;
            }
        });

        // Generating other levels of the tree.
        this.store.dispatch(new GenerateTreeLevels(0));

        patchState({
            nodeEntity: state.nodeEntity,
        });
    }

    @Action(GenerateTreeLevels)
    generateTreeLevels({ getState, patchState }: StateContext<FileBrowserStateModel>, { level }: GenerateTreeLevels) {
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
            nodeEntity: state.nodeEntity,
        });
    }

    @Action(ToggleFolder)
    toggleFolder({ getState, patchState }: StateContext<FileBrowserStateModel>, { node }: ToggleFolder) {
        const state = getState();

        state.nodeEntity.find(a => a.id === node).collapsed = !state.nodeEntity.find(a => a.id === node).collapsed;

        patchState({
            nodeEntity: state.nodeEntity,
        });
    }

    @Action(SortNodes) 
    sortNodes({ getState, patchState}: StateContext<FileBrowserStateModel>, { sort }: SortNodes) {
        const state = getState();

        patchState({
            childEntities: this.nodeSorting.sortNodes(sort, state.childEntities),
            sort: sort,
        });
    }
}
