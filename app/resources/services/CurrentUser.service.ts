/*
* @Author: aaronpmishkin
* @Date:   2016-06-15 18:28:22
* @Last Modified by:   aaronpmishkin
* @Last Modified time: 2016-08-03 16:23:26
*/

import { Injectable } 												from '@angular/core';

// Model Classes
import { ValueChart }												from '../model/ValueChart';
import { User }														from '../model/User';


// This class is used to expose application-wide state to components that require it. This includes the current user's username, and the current ValueChart.

@Injectable()
export class CurrentUserService {

	private username: string; 				// The username of the current user.
	private host: boolean;
	private valueChart: ValueChart;
	
	constructor() { }

	getUsername(): string {
		return this.username;
	}

	setUsername(username: string): void {
		this.username = username;
	}

	getValueChart(): ValueChart {
		return this.valueChart;
	}

	setValueChart(valueChart: ValueChart): void {
		this.valueChart = valueChart;
	}

	setHost(host: boolean): void {
		this.host = host;
	}

	isHost(): boolean {
		return this.host;
	}

}
