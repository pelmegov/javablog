import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JavablogSharedModule } from '../../shared';
import { JavablogAdminModule } from '../../admin/admin.module';
import {
    PostService,
    PostPopupService,
    PostComponent,
    PostDetailComponent,
    PostDialogComponent,
    PostPopupComponent,
    PostDeletePopupComponent,
    PostDeleteDialogComponent,
    postRoute,
    postPopupRoute,
    PostResolvePagingParams,
    FrontPostDetailComponent,
} from './';
import { FormsModule } from '@angular/forms';
import { CommentsService } from './comments.service';

const ENTITY_STATES = [
    ...postRoute,
    ...postPopupRoute,
];

@NgModule({
    imports: [
        JavablogSharedModule,
        JavablogAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        FormsModule
    ],
    declarations: [
        PostComponent,
        PostDetailComponent,
        PostDialogComponent,
        PostDeleteDialogComponent,
        PostPopupComponent,
        PostDeletePopupComponent,
        FrontPostDetailComponent,
    ],
    entryComponents: [
        PostComponent,
        PostDialogComponent,
        PostPopupComponent,
        PostDeleteDialogComponent,
        PostDeletePopupComponent,
    ],
    providers: [
        PostService,
        CommentsService,
        PostPopupService,
        PostResolvePagingParams,
    ],
    exports: [
        FrontPostDetailComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JavablogPostModule {}
