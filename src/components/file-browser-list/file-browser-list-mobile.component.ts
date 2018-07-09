import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Entity } from '../../states/file-browser.model';
import { FileBrowserState } from '../../states/file-browser.state';
import { GetNode } from '../../states/file-browser.actions';
import { FileBrowser } from '../../services/file-browser.service';
import { FileBrowserActionSheetComponent } from '../file-browser-action-sheet/file-browser-action-sheet.component';

@Component({
    selector: 'file-browser-list-mobile',
    templateUrl: 'file-browser-list-mobile.html',
    styleUrls: ['file-browser-list-mobile.scss'],
    providers: [FileBrowserActionSheetComponent]
})
export class FileBrowserListMobileComponent implements OnInit {

    @Select(FileBrowserState.getChildEntities) nodes$: Observable<Entity>;

    constructor(public store: Store, public fileBrowser: FileBrowser,
                public fileBrowserActionSheet: FileBrowserActionSheetComponent) {}

    ngOnInit() {}

    showNode(node) {
        if (node.type === 'Folder')
            this.store.dispatch(new GetNode(node.id));
    }

    showActionSheet(node) {
        event.stopPropagation();
        this.fileBrowserActionSheet.presentActionSheet(node.type);
    }
}