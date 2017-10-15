import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JavablogSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { TagComponent } from '../entities/tag/tag.component';
import { FrontPostComponent } from '../entities/post/front/front-post.component';
import { SideBarComponent } from '../home/side-bar/side-bar.component';
import {JavaBlogSideBarModule} from "./side-bar/side-bar.module";

@NgModule({
    imports: [
        JavablogSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true }),
        JavaBlogSideBarModule,
    ],
    declarations: [
        HomeComponent,
        FrontPostComponent,
        SideBarComponent,
    ],
    entryComponents: [
    ],
    providers: [
        TagComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JavablogHomeModule {}
