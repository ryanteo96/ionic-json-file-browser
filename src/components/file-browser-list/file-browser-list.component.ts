import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Entity } from '../../states/file-browser.model';
import { FileBrowser } from '../../services/file-browser.service';
import { FileBrowserState } from '../../states/file-browser.state';
import { GetNode } from '../../states/file-browser.actions';
import { FileBrowserActionSheetComponent } from '../file-browser-action-sheet/file-browser-action-sheet.component';

@Component({
    selector: 'file-browser-list',
    templateUrl: 'file-browser-list.html',
    styleUrls: ['file-browser-list.scss'],
    providers: [FileBrowserActionSheetComponent]
})
export class FileBrowserListComponent implements OnInit {
    @Select(FileBrowserState.getChildEntities) nodes$: Observable<Entity>;

    constructor(public store: Store, public fileBrowser: FileBrowser,
                public fileBrowserActionSheet: FileBrowserActionSheetComponent) {}

    ngOnInit() {}

    showNode(node) {
        if (node.type === 'Folder')
            this.store.dispatch(new GetNode(node.id));
    }

    showActionSheet(node) {
        this.fileBrowserActionSheet.presentActionSheet(node);
    }
}