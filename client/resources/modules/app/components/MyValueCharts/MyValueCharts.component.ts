/*
* @Author: aaronpmishkin
* @Date:   2016-08-04 13:09:50
* @Last Modified by:   aaronpmishkin
* @Last Modified time: 2016-09-24 15:16:40
*/

// Import Angular Classes:
import { Component }									from '@angular/core';
import { Router }										from '@angular/router';
import { OnInit }										from '@angular/core';

// Import Application Classes:
import { CurrentUserService }							from '../../services/CurrentUser.service';
import { ValueChartService }							from '../../services/ValueChart.service';
import { UserHttpService }								from '../../services/UserHttp.service';
import { ValueChartHttpService }						from '../../services/ValueChartHttp.service';
import { ExportValueChartComponent }					from '../ExportValueChart/ExportValueChart.component';
import { ValueChartXMLEncoder }							from '../../../utilities/classes/ValueChartXMLEncoder';

// Import Model Classes:
import { ValueChart }									from '../../../../model/ValueChart';

/*
	This component implements the My ValueChart's page. The my ValueChart page is where an authenticated user can view and manage the 
	ValueCHarts that they have created. MyValueChartsComponent allows users to view summaries of their ValueCharts that include
	the charts name, and password, the number of user preferences it contains, and its completion status. An incomplete ValueChart is a 
	ValueChart that is missing something because its creator did not complete the creation workflow. Incomplete ValueCharts can only be
	delete or completed by clicking the edit button, while complete ValueCharts can be edited, deleted, exported or viewed. Exporting a ValueChart
	as an XML string is handled by the ExportValueChartComponent, while exporting ONLY the user weights from a ValueChart is handled by this component.

	The MyValueChartsComponent can only be navigated to by users logged into a permanent account. Temporary users cannot have their ValueCharts
	saved to their account because their usernames may not be unique. 
*/

@Component({
	selector: 'myValueCharts',
	templateUrl: 'client/resources/modules/app/components/MyValueCharts/MyValueCharts.template.html',
})
export class MyValueChartsComponent implements OnInit {

	// ========================================================================================
	// 									Fields
	// ========================================================================================

	private valueChartSummaries: any[];	// The array of ValueChart summary objects belonging to the current user. These are retrieved from the server
										// Belonging is defined as having the creator field of the ValueChart match the user's username.
	
	private downloadLink: any;			// The <a> element for exporting a ValueChart as an XML file. Downloading an XML ValueChart is done entirely
										// on the client side using object URLs.	


	// ========================================================================================
	// 									Constructor
	// ========================================================================================

	/*
		@returns {void}
		@description 	Used for Angular's dependency injection ONLY. It should not be used to do any initialization of the class.
						This constructor will be called automatically when Angular constructs an instance of this class prior to dependency injection.
	*/
	constructor(
		private router: Router,
		private valueChartXMLEncoder: ValueChartXMLEncoder,
		private currentUserService: CurrentUserService,
		private valueChartService: ValueChartService,
		private userHttpService: UserHttpService,
		private valueChartHttpService: ValueChartHttpService) { }

	// ========================================================================================
	// 									Methods
	// ========================================================================================

	/* 	
		@returns {void}
		@description 	Initializes the ValueChartViewer. ngOnInit is only called ONCE by Angular. This function is thus used for one-time initialized only. 
						Calling ngOnInit should be left to Angular. Do not call it manually. All initialization logic for the component should be put in this
						method rather than in the constructor.
	*/
	ngOnInit() {
		//	Retrieve summary objects for all of the ValueCharts created by the current user.
		this.userHttpService.getUserValueCharts(this.currentUserService.getUsername())
			.subscribe(
			valueChartSummaries => {
				this.valueChartSummaries = valueChartSummaries;
			});

		this.downloadLink = $('#download-user-weights');
	}

	openValueChart(chartId: string, password: string): void {
		password = password || '';
		
		this.valueChartHttpService.getValueChart(chartId, password)
			.subscribe(valueChart => {
				this.valueChartService.setValueChart(valueChart);
				this.currentUserService.setJoiningChart(false);
				this.router.navigate(['/view/', valueChart.getName()]);
			});
	}

	editValueChart(chartId: string, password: string): void {
		password = password || '';

		this.valueChartHttpService.getValueChart(chartId, password)
			.subscribe(valueChart => {
				this.valueChartService.setValueChart(valueChart);
				this.currentUserService.setJoiningChart(false);
				this.router.navigate(['/createValueChart/editChart/BasicInfo']);
			});
	}

	deleteValueChart(chartId: string): void {
		this.valueChartHttpService.deleteValueChart(chartId)
			.subscribe(status => {
				var index: number = this.valueChartSummaries.findIndex((valueChartSummary: any) => {
					return valueChartSummary._id === chartId;
				});
				this.valueChartSummaries.splice(index, 1);
			});
	}

	openExportChartModal(chartId: string, password: string): void {
		this.valueChartHttpService.getValueChart(chartId, password)
			.subscribe(valueChart => {
				this.valueChartService.setValueChart(valueChart);
			});
	}

	getValueChartName(): string {
		var valueChart: ValueChart = this.valueChartService.getValueChart();

		if (valueChart) {
			return valueChart.getId() + 'UserWeights.csv';
		} else {
			return '';
		}
	}

	exportUserWeights() {
		var valueChart: ValueChart = this.valueChartService.getValueChart();
		var weightsObjectUrl: string = this.convertUserWeightsIntoObjectURL(valueChart);

		this.downloadLink.attr('href', weightsObjectUrl);	// Set the download link on the <a> element to be the URL created for the CSV string.
		this.downloadLink.click();							// Click the <a> element to programmatically begin the download.
	}

	convertUserWeightsIntoObjectURL(valueChart: ValueChart): string {
		if (valueChart === undefined)
			return;
		
		// Obtain a CSV string for the user defined weights in the given ValueChart. 
		var weightString: string = this.valueChartXMLEncoder.encodeUserWeights(valueChart);
		// Convert the string into a blob. We must do this before we can create a download URL for the CSV string.
		var weightsBlob: Blob = new Blob([weightString], { type: 'text/xml' });

		// Create and return a unique download URL for the CSV string.
		return URL.createObjectURL(weightsBlob);
	}

	getStatusText(valueChartSummary: any): string {
		if (valueChartSummary.incomplete) {
			return 'Incomplete';
		} else {
			return 'Complete';
		}
	}

}
