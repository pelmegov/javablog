import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JavablogSharedModule } from '../shared';

import { ABOUT_ROUTE, AboutComponent } from './';

@NgModule({
    imports: [
        JavablogSharedModule,
        RouterModule.forRoot([ ABOUT_ROUTE ], { useHash: true })
    ],
    declarations: [
        AboutComponent
    ],
    entryComponents: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JavablogHomeModule {}
