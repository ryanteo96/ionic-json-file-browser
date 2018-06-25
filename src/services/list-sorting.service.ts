import { Injectable } from '@angular/core';
import { Node } from '../states/file-browser.model';

@Injectable()
export class ListSortingService {
    private nodes: Node[];

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

    sortNodes(field, array) {
        this.nodes = array;

        switch (field) {
            case 'name-asc': {
                this.nodes.sort(this.compareNamesAsc);
                break;
            }
            case 'name-desc': {
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