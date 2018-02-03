import { __ } from 'ramda';
import makeJsonRequest from './_jsonRequests';

export const getJson = makeJsonRequest('GET', __, false);
export const postJson = makeJsonRequest('POST');
