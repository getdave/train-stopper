/**
 * POLLER
 *
 * uses Redux store to check for any expired Trackers 
 * (ie: trackers which have passed their expected arrival time)
 * and dispatches appropriate archive action to disable them
 */


class Poller {

	constructor(funcToPoll) {
		this.funcToPoll = funcToPoll;
	}

	start() {
		this.funcToPoll();	
		setInterval(() => {
			this.funcToPoll();			
		}, 10000);
	}

}


export default Poller;