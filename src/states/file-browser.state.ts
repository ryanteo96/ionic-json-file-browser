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
    // SortField,
    // NodeSelect,
} from './file-browser.actions';
import { ListSortingService } from '../services/list-sorting.service';

export interface FileBrowserStateModel {
    nodes: Node[];
    // rootNode: Node;
    currentNode: Node;
    childNodes: Node[];
    entities: Entity[];
    currentEntity: Entity;
    childEntities: Entity[];
    nodeEntity: NodeEntity[];
    history: Entity[];
    nodeSelected: Node;
}

@State<FileBrowserStateModel>({
    name: 'browser',
    defaults : {
        nodes: [],
        // rootNode: <Node>{},
        currentNode: <Node>{},
        childNodes: [],
        entities: [],
        currentEntity: <Entity>{},
        childEntities: [],
        nodeEntity: [],
        history: [],
        nodeSelected: <Node>{},
    },
})

export class FileBrowserState {
    constructor(private store: Store, private listSorting: ListSortingService) {}

    @Selector()
    static getNodes(state: FileBrowserStateModel) {
        return state.nodeEntity;
    }

    // @Selector()
    // static getRoot(state: FileBrowserStateModel) {
    //     return state.rootNode;
    // }

    @Selector()
    static getChildEntities(state: FileBrowserStateModel) {
        return state.childEntities;
    }

    @Selector()
    static getHistory(state: FileBrowserStateModel) {
        return state.history;
    }

    @Selector()
    static getNodeSelected(state: FileBrowserStateModel) {
        console.log('here');
        return state.nodeSelected;
    }

    @Action(GenerateFileBrowser)
    generateFileBrowser({ patchState }: StateContext<FileBrowserStateModel>, { nodes, entities, root }: GenerateFileBrowser) {
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

        this.store.dispatch(new GenerateTreeFirstLevel());

        patchState({
            // rootNode: nodes.find(a => a.id === root),
            nodes: nodes,
            entities: entities,
            nodeEntity: nodeEntity,
        });
    }

    @Action(GetNode) 
    getNode({ getState, patchState }: StateContext<FileBrowserStateModel>, { node }: GetNode) {
        const state = getState();
        // Getting current node and child nodes.
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
            childEntities: childEntities,
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

        console.log('here');

        // Assigning first level of tree
        state.nodeEntity.forEach(function(node) {
            if(node.parent < 0) {
                node.level = 0;
            }
        });

        this.store.dispatch(new GenerateTreeLevels(0));

        patchState({
            nodeEntity: state.nodeEntity,
        });
    }

    @Action(GenerateTreeLevels)
    generateTreeLevels({ getState, patchState }: StateContext<FileBrowserStateModel>, { level }: GenerateTreeLevels) {
        const state = getState();

        const rootNodes = state.nodeEntity.filter(a => a.level === level);

        // Assigning all other levels of tree
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
        let toggle: NodeEntity;

        state.nodeEntity.find(a => a.id === node).collapsed = !state.nodeEntity.find(a => a.id === node).collapsed;

        patchState({
            nodeEntity: state.nodeEntity,
        });
    }

    // @Action(SortField) 
    // sortField({ getState, patchState }: StateContext<FileBrowserStateModel>, { field }: SortField) {
    //     const state = getState();

    //     patchState({
    //          nodes: this.objectSorting.sortObjects(field, state.nodes),
    //     });
    // }

    // @Action(NodeSelect)
    // nodeSelect({ getState, patchState }: StateContext<FileBrowserStateModel>, { node }: NodeSelect) {
    //     const state = getState();

    //     patchState({
    //         ...state,
    //         nodeSelected: node,
    //     });
    // }
}