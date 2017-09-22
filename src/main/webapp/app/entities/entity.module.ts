import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JavablogPostModule } from './post/post.module';
import { JavablogPostSeoModule } from './post-seo/post-seo.module';
import { JavablogCommentModule } from './comment/comment.module';
import { JavablogTagModule } from './tag/tag.module';
import { JavablogResourceModule } from './resource/resource.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JavablogPostModule,
        JavablogPostSeoModule,
        JavablogCommentModule,
        JavablogTagModule,
        JavablogResourceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JavablogEntityModule {}
