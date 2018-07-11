module.exports = {
    copyScssFiles: {
        src: [
        "{{SRC}}/components/file-browser-container/file-browser-container-core.scss",
        "{{SRC}}/components/file-browser-container/file-browser-container-mobile.scss",
        "{{SRC}}/components/file-browser-header/file-browser-header.scss",
        "{{SRC}}/components/file-browser-history/file-browser-history.scss",
        "{{SRC}}/components/file-browser-list/file-browser-list.scss",
        "{{SRC}}/components/file-browser-list/file-browser-list-mobile.scss",
        "{{SRC}}/components/file-browser-tree/file-browser-tree.scss",
        "{{SRC}}/components/file-browser-icon/file-browser-icon.scss",
        "{{SRC}}/components/file-browser-action-sheet/file-browser-action-sheet.scss",
        "{{SRC}}/components/file-browser-action-sheet/file-browser-action-sheet-mobile.scss",
        "{{SRC}}/components/file-browser-alert/file-browser-alert.scss",
        "{{SRC}}/components/file-browser-modal/file-browser-modal.scss",
        "{{SRC}}/components/file-browser-properties/file-browser-properties.scss",
        ],
        dest: "{{WWW}}"
    }
};