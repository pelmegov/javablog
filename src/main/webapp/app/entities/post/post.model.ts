import { BaseEntity, User } from './../../shared';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public message?: string,
        public image?: string,
        public postSeo?: BaseEntity,
        public comments?: BaseEntity[],
        public author?: User,
        public tags?: BaseEntity[],
    ) {
    }
}
