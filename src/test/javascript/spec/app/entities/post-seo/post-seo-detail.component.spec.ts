/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JavablogTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PostSeoDetailComponent } from '../../../../../../main/webapp/app/entities/post-seo/post-seo-detail.component';
import { PostSeoService } from '../../../../../../main/webapp/app/entities/post-seo/post-seo.service';
import { PostSeo } from '../../../../../../main/webapp/app/entities/post-seo/post-seo.model';

describe('Component Tests', () => {

    describe('PostSeo Management Detail Component', () => {
        let comp: PostSeoDetailComponent;
        let fixture: ComponentFixture<PostSeoDetailComponent>;
        let service: PostSeoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JavablogTestModule],
                declarations: [PostSeoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PostSeoService,
                    JhiEventManager
                ]
            }).overrideTemplate(PostSeoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PostSeoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostSeoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PostSeo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.postSeo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
