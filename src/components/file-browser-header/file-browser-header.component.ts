import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { FileBrowserState } from '../../states/file-browser.state';
import { FileBrowserList } from '../../services/file-browser-list.service';

@Component({
    selector: 'file-browser-header',
    templateUrl: 'file-browser-header.html',
    styleUrls: ["file-browser-header.scss"]
})
export class FileBrowserHeaderComponent implements OnInit {
    @Select(FileBrowserState.getSort) sort$: Observable<String>;

    constructor(private fileBrowserList: FileBrowserList) {}

    ngOnInit() {}

    toggleSort(sort) {
        this.fileBrowserList.toggleSort(sort);
    }
}