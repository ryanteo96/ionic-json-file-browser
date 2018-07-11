import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { FileBrowserState } from '../../states/file-browser.state';
import { FileBrowser } from '../../services/file-browser.service';

@Component({
    selector: 'file-browser-header',
    templateUrl: 'file-browser-header.html',
    styleUrls: ["file-browser-header.scss"]
})
export class FileBrowserHeaderComponent implements OnInit {
    @Select(FileBrowserState.getSort) sort$: Observable<String>;

    @Select(FileBrowserState.getOS) os$: Observable<String>;

    constructor(private fileBrowser: FileBrowser) {}

    ngOnInit() {}

    toggleSort(sort) {
        this.fileBrowser.toggleSort(sort);
    }

    showTree() {
        this.fileBrowser.showTree();
    }


}