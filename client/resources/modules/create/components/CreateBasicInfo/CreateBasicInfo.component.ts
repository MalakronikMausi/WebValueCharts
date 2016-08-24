import { Component, OnInit }												from '@angular/core';
import { Observable }     													from 'rxjs/Observable';
import { Subscriber }     													from 'rxjs/Subscriber';
import '../../../utilities/rxjs-operators';

// Import Application Classes:
import { ValueChartService }												from '../../../app/services/ValueChart.service';
import { CreationStepsService }												from '../../services/CreationSteps.service';

// Model Classes
import { ValueChart } 														from '../../../../model/ValueChart';

@Component({
	selector: 'CreateBasicInfo',
	templateUrl: 'client/resources/modules/create/components/CreateBasicInfo/CreateBasicInfo.template.html',
})
export class CreateBasicInfoComponent implements OnInit {
	valueChartName: string;
	valueChartDescription: string;
	valueChartPassword: string;

	// Validation fields:
	validationTriggered: boolean = false;
	nameAvailable: boolean = true;

	constructor(private valueChartService: ValueChartService, private creationStepsService: CreationStepsService) { }

	ngOnInit() {
		this.creationStepsService.observables[this.creationStepsService.BASICS] = new Observable<boolean>((subscriber: Subscriber<boolean>) => {
            subscriber.next(this.validate());
            subscriber.complete();
        });
		this.valueChartName = this.valueChartService.getValueChartName();
		this.valueChartDescription = this.valueChartService.getValueChart().getDescription();
		this.valueChartPassword = this.valueChartService.getValueChart().password ? this.valueChartService.getValueChart().password : "";
	}

	updateValueChart():void {
		this.valueChartService.getValueChart().setName(this.valueChartName);
		this.valueChartService.getValueChart().setDescription(this.valueChartDescription);
		this.valueChartService.getValueChart().password = this.valueChartPassword;
	}

	// Validation methods

	validate(): boolean {
		this.validationTriggered = true;
		return this.nameValid() && this.passwordValid();
	}	

	nameValid(): boolean {
		let regex = new RegExp("^[\\s\\w-]+$");
		return (this.valueChartName.search(regex) !== -1) && this.nameUnique();
	}

	nameUnique(): boolean {
		this.nameAvailable = true; 
		// TODO: Look up chart names in database
		return this.nameAvailable;
	}	

	passwordValid() {
		let regex = new RegExp("^[^\\s]+$");
		return (this.valueChartPassword.search(regex) !== -1);
	}
}
