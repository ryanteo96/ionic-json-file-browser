import { Node, Entity } from './file-browser.model';

export class GenerateFileBrowser {
    static readonly type = '[Browser] Set';

    constructor(public nodes: Node[], public entities: Entity[]) {}
}

export class GetNode {
    static readonly type = '[Node] Get';

    constructor(public node: number) {}
}

export class GenerateHistory {
    static readonly type = '[Browser] History';

    constructor(public node: number) {}
}

export class NodeSelect {
    static readonly type = '[Tree] Select';

    constructor(public node: Node) {}
}

export class GenerateTreeFirstLevel {
    static readonly type = '[Tree] Generate First Level';

    constructor() {}
}

export class GenerateTreeLevels {
    static readonly type = '[Tree] Generate Other Levels';

    constructor(public level: number) {}
}

export class ToggleFolder {
    static readonly type = '[Tree] ToggleFolder';

    constructor(public node: number) {}
}

export class SortNodes {
    static readonly type = '[Node] Sort';

    constructor(public sort: string) {}
}

export class ShowTree {
    static readonly type = '[Browser] Show Tree';

    constructor() {};
}