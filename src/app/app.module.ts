import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';
import { FileBrowserModule } from "../../dist";

import { MyApp } from "./app.component";
import { TestPage } from "../pages/testing/testing";

import { HandlerModule } from "./handler.module";
import { OpenHandler } from "./open.handler";

@NgModule({
	declarations: [MyApp, TestPage],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		FileBrowserModule.forRoot(),
		HandlerModule.forRoot([OpenHandler])
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp, TestPage],
	providers: [
		// StatusBar,
		// SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {}
