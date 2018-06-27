import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { FileBrowserState } from '../../states/file-browser.state'
import { GetNode, GenerateHistory } from '../../states/file-browser.actions';

@Component({
    selector: 'file-browser-history',
    templateUrl: 'file-browser-history.html',
    styleUrls: ['file-browser-history.scss']
})
export class FileBrowserHistoryComponent implements OnInit {
    @Select(FileBrowserState.getHistory) history$: Observable<String>;

    constructor(private store: Store) {}

    ngOnInit() {}

    showNodeInHistory(node) {
        this.store.dispatch(new GetNode(node));
    }
}