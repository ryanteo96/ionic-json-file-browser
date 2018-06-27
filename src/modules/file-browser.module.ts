// Module imports
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
// Service imports
import { FileBrowserList } from '../services/file-browser-list.service';
import { NodeSortingService } from '../services/node-sorting.service';
// State imports
import { FileBrowserState } from '../states/file-browser.state';
// Component imports
import { FileBrowserContainerComponent } from '../components/file-browser-container/file-browser-container.component';
import { FileBrowserContainerCoreComponent } from '../components/file-browser-container/file-browser-container-core.component';
import { FileBrowserContainerMobileComponent } from '../components/file-browser-container/file-browser-container-mobile.component';
import { FileBrowserHistoryComponent } from '../components/file-browser-history/file-browser-history.component';
import { FileBrowserHeaderComponent } from '../components/file-browser-header/file-browser-header.component';
import { FileBrowserListComponent } from '../components/file-browser-list/file-browser-list.component';
import { FileBrowserListMobileComponent } from '../components/file-browser-list/file-browser-list-mobile.component';
import { FileBrowserTreeComponent } from '../components/file-browser-tree/file-browser-tree.component';
import { FileBrowserIconComponent } from '../components/file-browser-icon/file-browser-icon.component';
import { FileBrowserActionSheetComponent } from '../components/file-browser-action-sheet/file-browser-action-sheet.component';

@NgModule({
    imports: [
        IonicModule,
        NgxsModule.forRoot([
            FileBrowserState,
        ]),
        NgxsLoggerPluginModule.forRoot(),
    ],
    declarations: [
        FileBrowserContainerComponent,
        FileBrowserContainerCoreComponent,
        FileBrowserContainerMobileComponent,
        FileBrowserHistoryComponent,
        FileBrowserHeaderComponent,
        FileBrowserListComponent,
        FileBrowserListMobileComponent,
        FileBrowserTreeComponent,
        FileBrowserIconComponent,
        FileBrowserActionSheetComponent,
    ],
    exports: [
        FileBrowserContainerComponent,
        FileBrowserContainerCoreComponent,
        FileBrowserContainerMobileComponent,
        FileBrowserHistoryComponent,
        FileBrowserHeaderComponent,
        FileBrowserListComponent,
        FileBrowserListMobileComponent,
        FileBrowserTreeComponent,
        FileBrowserIconComponent,
        FileBrowserActionSheetComponent,
    ],
    entryComponents: [
        FileBrowserContainerComponent,
        FileBrowserContainerCoreComponent,
        FileBrowserContainerMobileComponent,
    ],
})
export class FileBrowserModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FileBrowserModule,
            providers: [FileBrowserList, NodeSortingService,
                { provide: ErrorHandler, useClass: IonicErrorHandler }]
        };
    }
}