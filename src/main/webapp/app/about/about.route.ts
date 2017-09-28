import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { AboutComponent } from './';

export const ABOUT_ROUTE: Route = {
    path: '',
    component: AboutComponent,
    data: {
        authorities: [],
        pageTitle: 'about.title'
    }
};
