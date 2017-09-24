import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';

/**
 * Creates a mock store whilst also configuring
 * Redux Thunk to accept a fake version of the
 * API as an extra argument. This fake API is 
 * then what gets used in the real action creator
 * thunk
 */
export function createStoreWithFakeAPI(fakeAPI={}) {
	const middlewares = [ reduxThunk.withExtraArgument(fakeAPI) ]
	return configureMockStore(middlewares)
}


/**
 * Curried factory to abstract away repeated test logic
 */
export const makeDispatchWithStore = (actions, action, ...rest) => store => {
	return store.dispatch(actions[action](rest));
}



export function rejectedPromise() {
	return Promise.reject()
}