import { NgModule, ModuleWithProviders, APP_INITIALIZER } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

const noopFactory = () => {
	return (): Promise<void> => {
		return Promise.resolve();
	};
};

@NgModule({
	imports: [NgxsModule]
})
export class HandlerModule {
	static forRoot(handlers: any[] = []): ModuleWithProviders {
		return {
			ngModule: HandlerModule,
			providers: [
				...handlers,
				{
					provide: APP_INITIALIZER,
					multi: true,
					useFactory: noopFactory,
					deps: handlers
				}
			]
		};
	}
}
