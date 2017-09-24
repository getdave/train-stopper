/**
 * API
 *
 * root api definitions
 * abstration layer over API calls
 */

import * as journey from './journey/api';
import * as stations from './stations/api';


export default {
	...journey,
	...stations
}