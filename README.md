# Ionic JSON File Browser

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/69ea6eb4cdfe4fe98a8c2d98913faba6)](https://www.codacy.com/app/ryanteo96/ionic-json-file-browser?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ryanteo96/ionic-json-file-browser&amp;utm_campaign=Badge_Grade) [![npm version](https://badge.fury.io/js/ionic-json-file-browser.svg)](https://badge.fury.io/js/ionic-json-file-browser)

## Status: Work in progress

An Ionic module to render a file browser based on a JSON file.

## Installation 🛠
```sh
$ npm install ionic-json-file-browser
```

## Usage
Importing Module:

```typescript
import { FileBrowserModule } from 'ionic-json-file-browser';

@NgModule({
    imports: [
        ...
        FileBrowserModule
        ...
    ]
})
```

Using in template:
```html
<file-browser></file-browser>
```

## API

```typescript
import { FileBrowser } from 'ionic-json-file-browser';

export class HomePage implements OnInit {
    constructor(public fileBrowser: FileBrowser) {}

    ngOnInit() {
        this.fileBrowser.generateFileBrowser(node, entity, 0);
    }
}
```