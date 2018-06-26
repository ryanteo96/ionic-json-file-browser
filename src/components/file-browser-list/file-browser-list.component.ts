import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Entity } from '../../states/file-browser.model';
import { FileBrowserList } from '../../services/file-browser-list.service';
import { FileBrowserState } from '../../states/file-browser.state';
import { GetNode } from '../../states/file-browser.actions';

@Component({
    selector: 'file-browser-list',
    templateUrl: 'file-browser-list.html',
    styleUrls: ['file-browser-list.scss']
})
export class FileBrowserListComponent implements OnInit {

    @Select(FileBrowserState.getChildEntities) entities$: Observable<Entity>;

    constructor(public store: Store, public fileBrowserList: FileBrowserList) {}

    ngOnInit() {}

    showNode(node) {
        if (node.type === 'Folder')
            this.store.dispatch(new GetNode(node.id));
    }

    // showNode(node) {
    //     this.fileBrowserList.showNode(node);
    // }
}