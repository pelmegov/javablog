import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JavablogSharedModule } from '../../shared';
import { JavablogAdminModule } from '../../admin/admin.module';
import {
    CommentService,
    CommentPopupService,
    CommentComponent,
    CommentDetailComponent,
    CommentDialogComponent,
    CommentPopupComponent,
    CommentDeletePopupComponent,
    CommentDeleteDialogComponent,
    commentRoute,
    commentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commentRoute,
    ...commentPopupRoute,
];

@NgModule({
    imports: [
        JavablogSharedModule,
        JavablogAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CommentComponent,
        CommentDetailComponent,
        CommentDialogComponent,
        CommentDeleteDialogComponent,
        CommentPopupComponent,
        CommentDeletePopupComponent,
    ],
    entryComponents: [
        CommentComponent,
        CommentDialogComponent,
        CommentPopupComponent,
        CommentDeleteDialogComponent,
        CommentDeletePopupComponent,
    ],
    providers: [
        CommentService,
        CommentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JavablogCommentModule {}
