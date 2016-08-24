/*
* @Author: aaronpmishkin
* @Date:   2016-06-24 09:46:28
* @Last Modified by:   aaronpmishkin
* @Last Modified time: 2016-08-23 11:44:56
*/

import { Routes, RouterModule } 									from '@angular/router';

// Application Classes
	// Components:
import { RegisterComponent }										from './components/Register/Register.component';
import { HomeComponent }											from './components/Home/Home.component';
import { MyValueChartsComponent }									from './components/MyValueCharts/MyValueCharts.component';
import { AccountComponent }											from './components/Account/Account.component';
import { ValueChartViewerComponent }								from './components/ValueChartViewer/ValueChartViewer.component';
import { ScoreFunctionViewerComponent }								from './components/ScoreFunctionViewer/ScoreFunctionViewer.component';
	// Services:
import { ValueChartHttpService }									from './services/ValueChartHttp.service';
import { CurrentUserService }										from './services/CurrentUser.service';
import { ChartUndoRedoService }										from './services/ChartUndoRedo.service';
import { ValueChartService }										from './services/ValueChart.service';
import { AuthGuardService }											from './services/AuthGuard.service';
import { JoinGuardService }											from './services/JoinGuard.service';


/*
	This is the route configuration for the application. This is where components are assigned to url paths. 
	Angular will use these assignments to determine what component to display when the application is loaded, 
	or when it detects a change the client's url. The canActivate field on each path allows us to register a 
	class that will be responsible for determining if the application is allowed to navigate to the path.
	The AuthGuardService class is used to prevent users from navigating away from the register path without
	signing in (i.e authenticating themselves). The JoinGuardService is used to load a ValueChart for a user that
	is joining an existing ValueChart via a url. It will only block navigation if the invitation url used is not valid.
	Note that the path '/register' is the default path that the client will redirect users to if no path match is found.

	It is important to realize that Angular's routing is font-end only, and is begins after a client has been sent
	the application's index.html file. This is why the back-end is set up to redirect all requests resulting in a 404 status
	to send the index.html instead of an error. A user's request may not be a 404 at all; it may be intended for the front-end router.
*/

const routes: Routes = [
	{ path: 'register', component: RegisterComponent },
	{ path: 'join/ValueCharts/:ValueChart', component: RegisterComponent, canActivate: [JoinGuardService] },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
	{ path: 'myValueCharts', component: MyValueChartsComponent, canActivate: [AuthGuardService] },
	{ path: 'myAccount', component: AccountComponent, canActivate: [AuthGuardService] },
	{ path: 'view/:ValueChart', component: ValueChartViewerComponent, canActivate: [AuthGuardService] },
	{ path: 'scoreFunction/:viewType', component: ScoreFunctionViewerComponent },
	// Setup default URL as /register.
	{ path: '**', redirectTo: '/register'}
];

// Export the providers necessary for bootstrapping in main.ts. Any class that must be provided for the routes to work should 
// be included here. Note that this does not include components, which do not require providers.
export const APP_ROUTER_PROVIDERS = [
	[AuthGuardService, JoinGuardService, CurrentUserService, ValueChartHttpService, ValueChartService, ChartUndoRedoService]
];

export const ROUTER = RouterModule.forRoot(routes);