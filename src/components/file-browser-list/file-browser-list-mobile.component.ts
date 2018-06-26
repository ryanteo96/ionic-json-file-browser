import { Component, OnInit } from '@angular/core';
import { FileBrowserState } from '../../states/file-browser.state';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Node } from '../../states/file-browser.model';
import { FileBrowserList } from '../../services/file-browser-list.service';

@Component({
    selector: 'file-browser-list-mobile',
    templateUrl: 'file-browser-list-mobile.html',
    styleUrls: ['file-browser-list-mobile.scss']
})
export class FileBrowserListMobileComponent implements OnInit {

    @Select(FileBrowserState.getNodes) nodes$: Observable<Node>;

    constructor(public store: Store, public fileBrowserList: FileBrowserList) {}

    ngOnInit() {}

    // nodeSelect(node) : void {
    //     this.store.dispatch(new NodeSelect(node));
    // }

    // showNode(node) {
    //     this.fileBrowserList.showNode(node);
    // }
}