/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_audio_jcit_upload_audio_post } from '../models/Body_upload_audio_jcit_upload_audio_post';
import type { DoctorCreateJCIT } from '../models/DoctorCreateJCIT';
import type { DoctorResponse } from '../models/DoctorResponse';
import type { HospitalCreate } from '../models/HospitalCreate';
import type { HospitalResponse } from '../models/HospitalResponse';
import type { VisitResponse } from '../models/VisitResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class JcitApIsService {
    /**
     * Create Hospital
     * @returns HospitalResponse Successful Response
     * @throws ApiError
     */
    public static createHospitalJcitCreateHospitalPost({
        requestBody,
    }: {
        requestBody: HospitalCreate,
    }): CancelablePromise<HospitalResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/jcit/create-hospital',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Register Doctor
     * @returns DoctorResponse Successful Response
     * @throws ApiError
     */
    public static registerDoctorJcitCreateDoctorPost({
        requestBody,
    }: {
        requestBody: DoctorCreateJCIT,
    }): CancelablePromise<DoctorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/jcit/create-doctor',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Upload Audio
     * @returns VisitResponse Successful Response
     * @throws ApiError
     */
    public static uploadAudioJcitUploadAudioPost({
        formData,
    }: {
        formData: Body_upload_audio_jcit_upload_audio_post,
    }): CancelablePromise<VisitResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/jcit/upload-audio',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Doctor
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getDoctorJcitVisitVisitIdGet({
        visitId,
        doctorId,
    }: {
        /**
         * The ID of the visit to get
         */
        visitId: string,
        doctorId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jcit/visit/{visit_id}',
            path: {
                'visit_id': visitId,
            },
            query: {
                'doctor_id': doctorId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Doctors
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getDoctorsJcitVisitsGet({
        targetDate,
        doctorId,
    }: {
        targetDate: string,
        doctorId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jcit/visits',
            query: {
                'target_date': targetDate,
                'doctor_id': doctorId,
            },
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
    public static getHospitalJcitHospitalHospitalIdGet({
        hospitalId,
    }: {
        /**
         * The ID of the hospital to get
         */
        hospitalId: string,
    }): CancelablePromise<HospitalResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jcit/hospital/{hospital_id}',
            path: {
                'hospital_id': hospitalId,
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
    public static deleteHospitalJcitHospitalHospitalIdDelete({
        hospitalId,
    }: {
        /**
         * The ID of the hospital to delete
         */
        hospitalId: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/jcit/hospital/{hospital_id}',
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
    public static updateHospitalJcitHospitalHHHospitalIdPut({
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
            url: '/jcit/hospital/h/h/{hospital_id}',
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
     * Get Hospitals
     * @returns HospitalResponse Successful Response
     * @throws ApiError
     */
    public static getHospitalsJcitHospitalsGet({
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
            url: '/jcit/hospitals',
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
     * Delete Doctor
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteDoctorJcitDeleteDoctorDoctorIdDelete({
        doctorId,
    }: {
        /**
         * The ID of the doctor to delete
         */
        doctorId: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/jcit/delete-doctor/{doctor_id}',
            path: {
                'doctor_id': doctorId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Doctor
     * @returns DoctorResponse Successful Response
     * @throws ApiError
     */
    public static getDoctorJcitDoctorIdGet({
        doctorId,
    }: {
        /**
         * The ID of the doctor to get
         */
        doctorId: string,
    }): CancelablePromise<DoctorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jcit/{doctor_id}',
            path: {
                'doctor_id': doctorId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Doctor
     * @returns DoctorResponse Successful Response
     * @throws ApiError
     */
    public static updateDoctorJcitDoctorIdPut({
        doctorId,
        firstName,
        lastName,
        specialty,
        email,
    }: {
        /**
         * The ID of the doctor to update
         */
        doctorId: string,
        firstName?: string,
        lastName?: string,
        specialty?: string,
        email?: string,
    }): CancelablePromise<DoctorResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/jcit/{doctor_id}',
            path: {
                'doctor_id': doctorId,
            },
            query: {
                'first_name': firstName,
                'last_name': lastName,
                'specialty': specialty,
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Doctors
     * @returns DoctorResponse Successful Response
     * @throws ApiError
     */
    public static getDoctorsJcitAllDoctorsGet({
        page = 1,
        limit = 10,
    }: {
        page?: number,
        limit?: number,
    }): CancelablePromise<Array<DoctorResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jcit/all/doctors',
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
