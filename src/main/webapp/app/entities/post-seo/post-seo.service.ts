import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PostSeo } from './post-seo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PostSeoService {

    private resourceUrl = SERVER_API_URL + 'api/post-seos';

    constructor(private http: Http) { }

    create(postSeo: PostSeo): Observable<PostSeo> {
        const copy = this.convert(postSeo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(postSeo: PostSeo): Observable<PostSeo> {
        const copy = this.convert(postSeo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PostSeo> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to PostSeo.
     */
    private convertItemFromServer(json: any): PostSeo {
        const entity: PostSeo = Object.assign(new PostSeo(), json);
        return entity;
    }

    /**
     * Convert a PostSeo to a JSON which can be sent to the server.
     */
    private convert(postSeo: PostSeo): PostSeo {
        const copy: PostSeo = Object.assign({}, postSeo);
        return copy;
    }
}
