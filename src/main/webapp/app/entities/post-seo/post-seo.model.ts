import { BaseEntity } from './../../shared';

export class PostSeo implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public keywords?: string,
    ) {
    }
}
