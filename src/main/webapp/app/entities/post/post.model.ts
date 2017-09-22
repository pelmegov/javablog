import { BaseEntity, User } from './../../shared';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public message?: string,
        public postSeo?: BaseEntity,
        public image?: BaseEntity,
        public comments?: BaseEntity[],
        public author?: User,
        public resources?: BaseEntity[],
        public tags?: BaseEntity[],
    ) {
    }
}
