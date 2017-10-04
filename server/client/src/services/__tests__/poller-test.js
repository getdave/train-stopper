import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';

import Poller from '../poller';

describe('poller service', () => {

	const middlewares = [ reduxThunk ]
	const store = configureMockStore(middlewares)

	jest.useFakeTimers();

	it('should call handleTrackerNotifications() repeatedly', () => {
		
		const funcToPoll = jest.fn();
		
		const poller 	= new Poller(funcToPoll);

		expect(funcToPoll).not.toBeCalled();

		// Start polling 
		poller.start();

		// Should poll immediately after .start() is called
		expect(funcToPoll.mock.calls.length).toBe(1);

		// // Fast-forward by 10 seconds
    	jest.runTimersToTime(10000);

    	// First interval test
		expect(funcToPoll.mock.calls.length).toBe(2);

		// Fast-forward by another 10 seconds
    	jest.runTimersToTime(10000);

    	// Second interval test
    	expect(funcToPoll.mock.calls.length).toBe(3);

    	// Try and catch things out...just in case
    	jest.runTimersToTime(9000);

    	expect(funcToPoll.mock.calls.length).toBe(3); // yes this is intentional

	})

})

	