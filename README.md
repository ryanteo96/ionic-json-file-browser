# Ionic JSON File Browser

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/69ea6eb4cdfe4fe98a8c2d98913faba6)](https://www.codacy.com/app/ryanteo96/ionic-json-file-browser?utm_source=github.com&utm_medium=referral&utm_content=ryanteo96/ionic-json-file-browser&utm_campaign=Badge_Grade) [![npm version](https://badge.fury.io/js/ionic-json-file-browser.svg)](https://badge.fury.io/js/ionic-json-file-browser)
![Imgur](https://i.imgur.com/FI66rjs.png)
Ionic JSON File Browser is a custom Ionic module that can render a file browser.

## Features

-   [x] List view
-   [x] Tree View
-   [x] Navigation
-   [x] History
-   [x] Select/Multi Select
-   [x] Sorting
-   [x] Context Menu/Action Sheet
-   [x] Icons
-   [x] Mobile Support

## Installation

```sh
$ npm install ionic-json-file-browser
```

## Setup

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

Generating File Browser in page:

```typescript
import { FileBrowser } from "ionic-json-file-browser";

export class HomePage implements OnInit {
	constructor(public fileBrowser: FileBrowser) {}

	ngOnInit() {
		this.fileBrowser.generateFileBrowser(node, entity, 0);
	}
}
```

Note: This is just a simple look at the installation and setup of Ionic JSON File Browser. Further documentation of the API can be found in the [wiki](https://github.com/ryanteo96/ionic-json-file-browser/wiki) on the Github page.
