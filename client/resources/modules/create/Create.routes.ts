/*
* @Author: aaronpmishkin
* @Date:   2016-08-18 10:02:59
* @Last Modified by:   aaronpmishkin
* @Last Modified time: 2016-08-23 12:49:05
*/

// Import Angular Classes:
import { Routes, RouterModule }  from '@angular/router';

// Import Application Classes: 
import { CreateValueChartComponent }			from './components/CreateValueChart/CreateValueChart.component';
import { CreateAlternativesComponent }			from './components/CreateAlternatives/CreateAlternatives.component';
import { CreateBasicInfoComponent }				from './components/CreateBasicInfo/CreateBasicInfo.component';
import { CreateObjectivesComponent }			from './components/CreateObjectives/CreateObjectives.component';
import { CreateScoreFunctionsComponent }		from './components/CreateScoreFunctions/CreateScoreFunctions.component';
import { CreateWeightsComponent }				from './components/CreateWeights/CreateWeights.component';

import { AuthGuardService }						from '../app/services/AuthGuard.service';
import { CreationGuardService }					from './services/CreationGuard.service';


const creationRoutes: Routes = [
	{
		path: 'createValueChart/:purpose',
		component: CreateValueChartComponent,
		canActivate: [AuthGuardService],
		canDeactivate: [CreationGuardService],
		children: [
			{ path: 'BasicInfo', component: CreateBasicInfoComponent },
			{ path: 'Objectives', component: CreateObjectivesComponent },
			{ path: 'Alternatives', component: CreateAlternativesComponent },
			{ path: 'ScoreFunctions', component: CreateScoreFunctionsComponent },
			{ path: 'Weights', component: CreateWeightsComponent }
		]
	}
];

export const CREATION_ROUTER = RouterModule.forChild(creationRoutes);