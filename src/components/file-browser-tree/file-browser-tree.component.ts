import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { FileBrowserState } from '../../states/file-browser.state';
import { Node } from '../../states/file-browser.model';
import { ToggleFolder } from '../../states/file-browser.actions';
import { FileBrowserList } from '../../services/file-browser-list.service';
// import { NodeSelect } from '../states/file-browser.actions';

@Component({
    selector: 'file-browser-tree',
    templateUrl: 'file-browser-tree.html',
    styleUrls: ['file-browser-tree.scss']
})
export class FileBrowserTreeComponent implements OnInit {

    @Select(FileBrowserState.getNodes) nodes$: Observable<Node>;

    // @Select(FileBrowserState.getRoot) root$: Observable<Node>;

    constructor(public store: Store, public fileBrowserList: FileBrowserList) {}

    ngOnInit() {}

    toggleFolder(node) {
        this.store.dispatch(new ToggleFolder(node));
    }

    // nodeSelect(node) : void {
    //     this.store.dispatch(new NodeSelect(node));
    // }

    // showNode(node) {
    //     this.fileBrowserList.showNode(node);
    // }
}