import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PostComponent } from './post.component';
import { PostDetailComponent } from './post-detail.component';
import { PostPopupComponent } from './post-dialog.component';
import { PostDeletePopupComponent } from './post-delete-dialog.component';
import { FrontPostDetailComponent} from './front/front-post-detail.component';
import { FrontPostComponent } from './front/front-post.component';

@Injectable()
export class PostResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const postRoute: Routes = [
    {
        path: 'post',
        component: PostComponent,
        resolve: {
            'pagingParams': PostResolvePagingParams
        },
        data: {
            authorities: [],
            pageTitle: 'javablogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: '',
        component: FrontPostComponent,
        resolve: {
            'pagingParams': PostResolvePagingParams
        },
        data: {
            authorities: [],
            pageTitle: 'javablogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'post/:id',
        component: PostDetailComponent,
        data: {
            authorities: [],
            pageTitle: 'javablogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'front/post/:id',
        component: FrontPostDetailComponent,
        data: {
            authorities: [],
            pageTitle: 'javablogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const postPopupRoute: Routes = [
    {
        path: 'post-new',
        component: PostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'javablogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post/:id/edit',
        component: PostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'javablogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post/:id/delete',
        component: PostDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'javablogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
