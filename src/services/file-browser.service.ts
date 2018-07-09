import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Node, Entity } from '../states/file-browser.model';
import { GenerateFileBrowser, GetNode, SortNodes, ShowTree } from '../states/file-browser.actions';

@Injectable()
export class FileBrowser {
    nodes: Node[];
    entities: Entity[];

    constructor(private store: Store) {}

    // Generating the nodes and entities based on JSON
    generateFileBrowser(nodes:Node[], entities:Entity[], node:number) {
        this.nodes = nodes;
        this.entities = entities;

        if (node < 0) {
            node = 0;
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