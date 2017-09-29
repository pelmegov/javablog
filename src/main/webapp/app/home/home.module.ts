import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JavablogSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { TagComponent } from '../entities/tag/tag.component';
import { FrontPostComponent } from '../entities/post/front/front-post.component';

@NgModule({
    imports: [
        JavablogSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
        FrontPostComponent,
    ],
    entryComponents: [
    ],
    providers: [
        TagComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JavablogHomeModule {}
