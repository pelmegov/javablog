import { BaseEntity, User } from './../../shared';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public message?: string,
        public resources?: BaseEntity[],
        public author?: User,
        public post?: BaseEntity,
    ) {
    }
}
