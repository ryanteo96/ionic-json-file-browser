import { Component } from "@angular/core";
import { ModalController } from "ionic-angular";
import { FileBrowserPropertiesComponent } from "../file-browser-properties/file-browser-properties.component";

@Component({
  selector: "file-browser-modal",
  templateUrl: "file-browser-modal.html"
})
export class FileBrowserModalComponent {
  constructor(public modalCtrl: ModalController) {}

  presentModal() {
    const modal = this.modalCtrl.create(FileBrowserPropertiesComponent);
    modal.present();
  }
}
