import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JavablogSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { TagComponent } from '../entities/tag/tag.component';
import { PostComponent } from '../entities/post/post.component';

@NgModule({
    imports: [
        JavablogSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent
    ],
    entryComponents: [
    ],
    providers: [
        TagComponent,
        PostComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JavablogHomeModule {}
