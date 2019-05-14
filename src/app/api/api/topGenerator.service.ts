/**
 * orbisapi
 * Polls is a simple API allowing consumers to view polls and vote in them.
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Problem } from '../model/problem';
import { Top } from '../model/top';
import { TopRequest } from '../model/topRequest';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class TopGeneratorService {

    protected basePath = 'https://api.test.51st.de';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

        if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;

        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Get Top
     * 
     * @param sex the sex id of the top
     * @param undershirtId unique id of an undershirt
     * @param topId unique id of a shirt
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTop(sex: number, undershirtId: number, topId: number, observe?: 'body', reportProgress?: boolean): Observable<Top>;
    public getTop(sex: number, undershirtId: number, topId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Top>>;
    public getTop(sex: number, undershirtId: number, topId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Top>>;
    public getTop(sex: number, undershirtId: number, topId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (sex === null || sex === undefined) {
            throw new Error('Required parameter sex was null or undefined when calling getTop.');
        }
        if (undershirtId === null || undershirtId === undefined) {
            throw new Error('Required parameter undershirtId was null or undefined when calling getTop.');
        }
        if (topId === null || topId === undefined) {
            throw new Error('Required parameter topId was null or undefined when calling getTop.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Top>(`${this.configuration.basePath}/character/top-generator/tops/${encodeURIComponent(String(sex))}/${encodeURIComponent(String(undershirtId))}/${encodeURIComponent(String(topId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Set Top
     * 
     * @param sex the sex id of the top
     * @param undershirtId unique id of an undershirt
     * @param topId unique id of a shirt
     * @param TopRequest 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setTop(sex: number, undershirtId: number, topId: number, TopRequest: TopRequest, observe?: 'body', reportProgress?: boolean): Observable<Top>;
    public setTop(sex: number, undershirtId: number, topId: number, TopRequest: TopRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Top>>;
    public setTop(sex: number, undershirtId: number, topId: number, TopRequest: TopRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Top>>;
    public setTop(sex: number, undershirtId: number, topId: number, TopRequest: TopRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (sex === null || sex === undefined) {
            throw new Error('Required parameter sex was null or undefined when calling setTop.');
        }
        if (undershirtId === null || undershirtId === undefined) {
            throw new Error('Required parameter undershirtId was null or undefined when calling setTop.');
        }
        if (topId === null || topId === undefined) {
            throw new Error('Required parameter topId was null or undefined when calling setTop.');
        }
        if (TopRequest === null || TopRequest === undefined) {
            throw new Error('Required parameter TopRequest was null or undefined when calling setTop.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.patch<Top>(`${this.configuration.basePath}/character/top-generator/tops/${encodeURIComponent(String(sex))}/${encodeURIComponent(String(undershirtId))}/${encodeURIComponent(String(topId))}`,
            TopRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
