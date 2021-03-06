/*
* @Author: aaronpmishkin
* @Date:   2016-06-03 10:00:29
* @Last Modified by:   aaronpmishkin
* @Last Modified time: 2017-01-06 21:24:45
*/

// Import Angular Classes:
import { Component, Output, Input }												from '@angular/core';
import { OnInit }																from '@angular/core';
import { EventEmitter }															from '@angular/core';


// Import Types:
import { ViewConfig }															from '../../../../../types/Config.types';

@Component({
	selector: 'ViewOptions',
	templateUrl: 'client/resources/modules/app/components/widgets/ViewOptions/ViewOptions.template.html',
	providers: []
})
export class ViewOptionsComponent implements OnInit {


	@Output() viewConfig = new EventEmitter<ViewConfig>();
	private config: ViewConfig;

	@Input() chartType: string;

	constructor() { }

	ngOnInit() {
		this.config = {
			viewOrientation: 'vertical',
			displayScoreFunctions: false,
			displayTotalScores: true,
			displayScales: false,
			displayDomainValues: false,
			displayScoreFunctionValueLabels: false,
			displayAverageScoreLines: false
		}
		this.updateViewConfig(this.config);
	}

	updateViewConfig(configObject: ViewConfig) {
		this.viewConfig.emit(configObject);
	}

	setOrientation(viewOrientation: string): void {
		this.config.viewOrientation = viewOrientation;
		this.updateViewConfig(this.config);
	}

	setDisplayScoreFunctions(newVal: boolean): void {
		this.config.displayScoreFunctions = newVal;
		this.updateViewConfig(this.config);
	}

	setDisplayDomainValues(newVal: boolean): void {
		this.config.displayDomainValues = newVal;
		this.updateViewConfig(this.config);
	}

	setDisplayScales(newVal: boolean): void {
		this.config.displayScales = newVal;
		this.updateViewConfig(this.config);
	}

	setDisplayTotalScores(newVal: boolean): void {
		this.config.displayTotalScores = newVal;
		this.updateViewConfig(this.config);
	}
	setDisplayScoreFunctionValueLabels(newVal: boolean): void {
		this.config.displayScoreFunctionValueLabels = newVal;
		this.updateViewConfig(this.config);
	}
	setDisplayAverageScoreLines(newVal: boolean): void {
		this.config.displayAverageScoreLines = newVal;
		this.updateViewConfig;
	}

}

