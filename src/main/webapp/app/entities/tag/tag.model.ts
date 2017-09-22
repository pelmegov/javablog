import { BaseEntity } from './../../shared';

export class Tag implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public posts?: BaseEntity[],
    ) {
    }
}
