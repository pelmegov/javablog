import { BaseEntity } from './../../shared';

export const enum ResourceType {
    'IMAGE',
    'VIDEO',
    'FILE'
}

export class Resource implements BaseEntity {
    constructor(
        public id?: number,
        public link?: string,
        public type?: ResourceType,
        public comment?: BaseEntity,
        public post?: BaseEntity,
    ) {
    }
}
