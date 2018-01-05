import { NgModule} from '@angular/core';
import { DynamicTypeBuilderService } from './dynamic.service';

import { WidgetOneComponent } from './widget/widgetone.component';

import { PartsModule } from './widget/parts.module';
import { Compiler, COMPILER_OPTIONS, CompilerFactory} from '@angular/core';
import { ɵa } from '@angular/platform-browser-dynamic';

export function createCompiler(compilerFactory: CompilerFactory) {
    return compilerFactory.createCompiler();
}

@NgModule( {
    imports: [PartsModule],
    exports: [],
    declarations: [],
    entryComponents:[WidgetOneComponent],   
    providers:[
        DynamicTypeBuilderService,
        {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
        {provide: CompilerFactory, useClass: ɵa, deps: [COMPILER_OPTIONS]},
        {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
    ]
}
)
export class DynamicModule{ 
}

@NgModule(  { 
})


import { Component } from '@angular/core';

const met = {
    selector: 'widget-one,[widget-one]',
    templateUrl: './widgetone.component.html'
};

@Component(met)
export class WidgetOneComponent {
    constructor(){

    }   
}


/**
 * Created by mlingolu on 9/28/16.
 */

import { Injectable }           from '@angular/core';
import { RequestMethod }  from '../../shared/requestmethod';
import {HttpClient} from '@angular/common/http';
import { Observable }           from 'rxjs/Observable';

import { ApiService } from '../../shared/api.service';

@Injectable()

export class CommentsService extends ApiService {

    constructor(public http:HttpClient){
        super(http);
    }

    public getComments(id :string, appName :string): Observable<any> {

        let urlPath = this.config().sites.comments.list;
        let data = {
            id: id,
            appName: appName
        };

        return this.makeObservableRequest(urlPath, RequestMethod.Post, data);
    }

    public addComment(id :string, appName :string, payload :any): Observable<any> {

        let urlPath = this.config().sites.comments.create;
        let data = {
            id: id,
            appName: appName,
            payload: payload
        };

        return this.makeObservableRequest(urlPath, RequestMethod.Post, data);
    }

    public updateComment(id :string, appName :string, commentId, payload :any): Observable<any> {

        let template = this.config().sites.comments.update;

        let urlPath = this.getESCompiledTemplate(template, {
            commentId : commentId
        });

        let data = {
            id: id,
            appName: appName,
            payload: payload
        };

        return this.makeObservableRequest(urlPath, RequestMethod.Put, data);
    }

    public deleteComment(id :string, appName :string, commentId): Observable<any> {
        let template = this.config().sites.comments.delete;

        let urlPath = this.getESCompiledTemplate(template, {
            commentId : commentId
        });

        let data = {
            id: id,
            appName: appName
        };

        return this.makeObservableRequest(urlPath, RequestMethod.Post, data);
    }

}

import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

declare var _paq: any;

@Directive({
    selector: '[analyticsTrackevent]'
})

export class TrackEventsDirective {

    private _eventCategory : string;
    private _eventAction   : string;
    private _eventName     : string;
    private _eventValue     : string = null;
    private _eventCustomDimensin_Id : any  = null;
    private _eventCustomDimensin_Value : any  = null;
    private _analyticsObj : any;
    private _analyticsName : any;
    private _analyticsValue : any;


    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @Input() set analyticsEventCategory(eventCategory: string){
        this._eventCategory = eventCategory;
    }

    @Input() set analyticsEventAction(eventAction: string){
        this._eventAction = eventAction;
    }

    @Input() set analyticsEventName(eventName: string){
        this._eventName = eventName;
    }

    @Input() set analyticsEventValue(eventName: string){
        this._eventName = eventName;
    }

    @Input() set analyticsEventCustomDimension_Id(eventCustomDimensin_id: string){
        this._eventCustomDimensin_Id = eventCustomDimensin_id;
    }

    @Input() set analyticsEventCustomDimension_Value(eventCustomDimensin_value: string){
        this._eventCustomDimensin_Value = eventCustomDimensin_value;
    }

    @Input() set analyticsObj(analyticsObj: any) {

        if (analyticsObj) {
            this._analyticsObj = JSON.parse(analyticsObj);
        } else {
            this._analyticsObj = null;
        }
    }

    @Input() set analyticsName(analyticsName: string){
        this._analyticsName = analyticsName;
    }

    @Input() set analyticsValue(analyticsValue: string){
        this._analyticsValue = analyticsValue;
    }

    @HostListener('click') onClick() {
        this.trackEvent();
    }

    @HostListener('btnClickEvent') btnClick() {
        this.trackEvent();
    }


    private trackEvent() {

        if (this._analyticsObj) {

            this._eventCategory = this._analyticsObj.eventCategory;
            this._eventAction = `${this._analyticsObj.eventAction_pre}_${this._analyticsName}`;
            this._eventName = this._analyticsValue ? `${this._analyticsObj.eventName_pre}_${this._analyticsName.replace('_', '')}/${this._analyticsValue}/${this._analyticsObj.eventName_post}` : `${this._analyticsObj.eventName_pre}_${this._analyticsName.replace('_', '')}/${this._analyticsObj.eventName_post}`;

        }

        if(this._eventCategory && this._eventAction && this._eventName) {

            if (this._eventCustomDimensin_Id && this._eventCustomDimensin_Value) {
                _paq.push(['trackEvent', this._eventCategory, this._eventAction, this._eventName, this._eventValue, {[`dimension${this._eventCustomDimensin_Id}`]: encodeURIComponent(`${this._eventCustomDimensin_Value}`)}]);
            } else {
                _paq.push(['trackEvent', this._eventCategory, this._eventAction, this._eventName]);
            }
        }
    }
}

