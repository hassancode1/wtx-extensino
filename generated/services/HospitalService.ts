/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HospitalCreate } from '../models/HospitalCreate';
import type { HospitalResponse } from '../models/HospitalResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HospitalService {
    /**
     * Get Hospitals
     * @returns HospitalResponse Successful Response
     * @throws ApiError
     */
    public static getHospitalsHospitalsGet({
        page = 1,
        limit = 10,
        search,
    }: {
        page?: number,
        limit?: number,
        search?: string,
    }): CancelablePromise<Array<HospitalResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hospitals/',
            query: {
                'page': page,
                'limit': limit,
                'search': search,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Hospital
     * @returns HospitalResponse Successful Response
     * @throws ApiError
     */
    public static createHospitalHospitalsPost({
        requestBody,
    }: {
        requestBody: HospitalCreate,
    }): CancelablePromise<HospitalResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hospitals/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Hospital
     * @returns HospitalResponse Successful Response
     * @throws ApiError
     */
    public static getHospitalHospitalsHospitalIdGet({
        hospitalId,
    }: {
        /**
         * The ID of the hospital to get
         */
        hospitalId: string,
    }): CancelablePromise<HospitalResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hospitals/{hospital_id}',
            path: {
                'hospital_id': hospitalId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Hospital
     * @returns HospitalResponse Successful Response
     * @throws ApiError
     */
    public static updateHospitalHospitalsHospitalIdPut({
        hospitalId,
        name,
        address,
        contactEmail,
    }: {
        /**
         * The ID of the hospital to update
         */
        hospitalId: string,
        name?: string,
        address?: string,
        contactEmail?: string,
    }): CancelablePromise<HospitalResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/hospitals/{hospital_id}',
            path: {
                'hospital_id': hospitalId,
            },
            query: {
                'name': name,
                'address': address,
                'contact_email': contactEmail,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Hospital
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteHospitalHospitalsHospitalIdDelete({
        hospitalId,
    }: {
        /**
         * The ID of the hospital to delete
         */
        hospitalId: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/hospitals/{hospital_id}',
            path: {
                'hospital_id': hospitalId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
