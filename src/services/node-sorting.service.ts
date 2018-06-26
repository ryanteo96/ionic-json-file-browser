import { Injectable } from '@angular/core';
import { NodeEntity } from '../states/file-browser.model';

@Injectable()
export class NodeSortingService {
    private nodes: NodeEntity[];

    constructor() {}

    compareNamesAsc(a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    compareNamesDesc(a, b) {
        if (a.name < b.name)
            return 1;
        if (a.name > b.name)
            return -1;
        return 0;
    }

    sortNodes(sort, array) {
        this.nodes = array;

        switch (sort) {
            case 'asc': {
                this.nodes.sort(this.compareNamesAsc);
                break;
            }
            case 'desc': {
                this.nodes.sort(this.compareNamesDesc);
                break;
            }
            default: {
                this.nodes.sort(this.compareNamesAsc);
                break;
            }
        }

        return this.nodes;
    }
}