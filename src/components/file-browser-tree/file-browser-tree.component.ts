import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { FileBrowserState } from '../../states/file-browser.state';
import { NodeEntity } from '../../states/file-browser.model';
import { ToggleFolder, GetNode } from '../../states/file-browser.actions';
import { FileBrowser } from '../../services/file-browser.service';
import { FileBrowserActionSheetComponent } from '../file-browser-action-sheet/file-browser-action-sheet.component';

@Component({
    selector: 'file-browser-tree',
    templateUrl: 'file-browser-tree.html',
    styleUrls: ['file-browser-tree.scss'],
    providers: [FileBrowserActionSheetComponent]
})
export class FileBrowserTreeComponent implements OnInit {

    @Select(FileBrowserState.getNodeEntity) nodes$: Observable<NodeEntity>;

    constructor(public store: Store, public fileBrowser: FileBrowser,
                public fileBrowserActionSheet: FileBrowserActionSheetComponent) {}

    ngOnInit() {}

    toggleFolder(node) {
        event.stopPropagation();
        this.store.dispatch(new ToggleFolder(node.id));
    }

    showNode(node) {
        if (node.type === 'Folder')
            this.store.dispatch(new GetNode(node.id));
    }

    showActionSheet(node) {
        this.fileBrowserActionSheet.presentActionSheet(node.type);
    }
}