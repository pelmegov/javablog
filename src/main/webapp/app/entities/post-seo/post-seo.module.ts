import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JavablogSharedModule } from '../../shared';
import {
    PostSeoService,
    PostSeoPopupService,
    PostSeoComponent,
    PostSeoDetailComponent,
    PostSeoDialogComponent,
    PostSeoPopupComponent,
    PostSeoDeletePopupComponent,
    PostSeoDeleteDialogComponent,
    postSeoRoute,
    postSeoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...postSeoRoute,
    ...postSeoPopupRoute,
];

@NgModule({
    imports: [
        JavablogSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PostSeoComponent,
        PostSeoDetailComponent,
        PostSeoDialogComponent,
        PostSeoDeleteDialogComponent,
        PostSeoPopupComponent,
        PostSeoDeletePopupComponent,
    ],
    entryComponents: [
        PostSeoComponent,
        PostSeoDialogComponent,
        PostSeoPopupComponent,
        PostSeoDeleteDialogComponent,
        PostSeoDeletePopupComponent,
    ],
    providers: [
        PostSeoService,
        PostSeoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JavablogPostSeoModule {}
