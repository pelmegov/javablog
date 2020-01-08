import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Post } from './post.model';

@Injectable()
export class CommentService {

    private resourceUrl = SERVER_API_URL + 'api/comments';

    constructor(private http: Http) { }

    public addCommentToPost(comment: string, post: Post) {
        return this.http.post(this.resourceUrl, {
            message: comment,
            post: {
                id: post.id
            }
        });
    }
}
