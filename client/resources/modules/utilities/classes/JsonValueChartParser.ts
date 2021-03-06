/*
* @Author: aaronpmishkin
* @Date:   2016-07-26 20:48:02
* @Last Modified by:   aaronpmishkin
* @Last Modified time: 2016-08-30 15:37:50
*/

// Import Model Classes:
import { ValueChart } 														from '../../../model/ValueChart';
import { User }																from '../../../model/User';
import { WeightMap }														from '../../../model/WeightMap';
import { Objective } 														from '../../../model/Objective';
import { PrimitiveObjective } 												from '../../../model/PrimitiveObjective';
import { AbstractObjective } 												from '../../../model/AbstractObjective';
import { Alternative } 														from '../../../model/Alternative';
import { ScoreFunctionMap }													from '../../../model/ScoreFunctionMap';
import { ScoreFunction } 													from '../../../model/ScoreFunction';
import { ContinuousScoreFunction } 											from '../../../model/ContinuousScoreFunction';
import { DiscreteScoreFunction } 											from '../../../model/DiscreteScoreFunction';
import { Domain } 															from '../../../model/Domain';
import { IntervalDomain }													from '../../../model/IntervalDomain';
import { ContinuousDomain } 												from '../../../model/ContinuousDomain';
import { CategoricalDomain } 												from '../../../model/CategoricalDomain';

/*
	This class parses ValueChart's that have been formatted as JSON objects into ValueChart objects. JSON ValueCharts are ValueCharts that have been formatted
	into JavaScript object literals, and are no longer proper instances of the ValueChart class. They have all of the data of a ValueChart
	object, but lack the class' methods, (because the prototype is no longer correct). Additionally, all the objects that are a part of a ValueChart
	(Objectives, Alternatives, Users, etc) are also object literals and not proper class instances in a JSON ValueChart. This converts these 
	object literals into proper class instances so that they can be used by the application.

	JSON is markup language that is used by WebValueCharts to communicate between the client and server. This means that JsonValueChartParser is 
	required to convert ValueChart and User literals sent by the server into ValueChart and user Objects that can be used by the client. Because
	the resources communicated between the client and server may not be complete, this class is capable of parsing incomplete ValueCharts and Users.
*/


export class JsonValueChartParser {

	// ========================================================================================
	// 									Constructor
	// ========================================================================================

	constructor() { }

	// ========================================================================================
	// 									Methods
	// ========================================================================================


	/*
		@param JsonValueChart - A JSON representation of a ValueChart. This representation does not have to be complete. This means it can be missing fields like users, alternatives, etc. Missing fields will be parsed.
		@returns {ValueChart}	- A ValueChart object parsed from the JSON representation provided. 
		@description	Parses a ValueChart from a JSON representation and into the proper class instances so that it can be used by the 
						application.
	*/
	public parseValueChart(JsonValueChart: any): ValueChart {

		var valueChart: ValueChart = new ValueChart(JsonValueChart.name, JsonValueChart.description, JsonValueChart.creator);
		// Copy over all the properties from the WeightMap that is being saved.
		valueChart._id = JsonValueChart._id;
		// Parse Users if they are defined.
		if (JsonValueChart.users !== undefined) {
			for (var i = 0; i < JsonValueChart.users.length; i++) {
				JsonValueChart.users[i] = this.parseUser(JsonValueChart.users[i]);
			}
		} else {
			JsonValueChart.users = [];
		}

		if (JsonValueChart.rootObjectives !== undefined) {
			// Parse Root Objectives
			for (var i = 0; i < JsonValueChart.rootObjectives.length; i++) {
				JsonValueChart.rootObjectives[i] = this.parseObjective(JsonValueChart.rootObjectives[i]);
			}
		}
		if (JsonValueChart.alternatives !== undefined) {
			// Parse Alternatives
			for (var i = 0; i < JsonValueChart.alternatives.length; i++) {
				JsonValueChart.alternatives[i] = this.parseAlternative(JsonValueChart.alternatives[i]);
			}	
		}

		// Copy over all properties from the json object the new ValueChart. This includes all the 
		// users, objectives, and alternatives that are parsed above.
		Object.assign(valueChart, JsonValueChart);


		return valueChart;
	}

	private parseObjective(jsonObjective: any): Objective {
		var objective: Objective;
		if (jsonObjective.objectiveType === 'abstract') {
			objective = new AbstractObjective(jsonObjective.name, jsonObjective.description);
			for (var i = 0; i < jsonObjective.subObjectives.length; i++) {
				jsonObjective.subObjectives[i] = this.parseObjective(jsonObjective.subObjectives[i]);
			}

			Object.assign(objective, jsonObjective);
		} else {
			objective = new PrimitiveObjective(jsonObjective.name, jsonObjective.description);

			jsonObjective.domain = this.parseDomain(jsonObjective.domain);

			Object.assign(objective, jsonObjective);
		}

		return objective;
	}

	private parseDomain(jsonDomain: any): Domain {
		var domain: Domain;

		if (jsonDomain.type === 'continuous') {
			domain = new ContinuousDomain();
		} else if (jsonDomain.type === 'categorical') {
			domain = new CategoricalDomain(jsonDomain.ordered);
		} else {
			domain = new IntervalDomain(jsonDomain.min, jsonDomain.max, jsonDomain.interval);
		}

		Object.assign(domain, jsonDomain);

		return domain;
	}

	private parseAlternative(jsonAlternative: any): Alternative {
		var alternative: Alternative = new Alternative(jsonAlternative.name, jsonAlternative.description);

		for (var i = 0; i < jsonAlternative.objectiveValues.length; i++) {
			alternative.setObjectiveValue(jsonAlternative.objectiveValues[i][0], jsonAlternative.objectiveValues[i][1]);
		}

		return alternative;
	}

	/*
		@param jsonUser - A JSON representation of a ValueChart User. 
		@returns {User}	- A User object parsed from the JSON representation provided. 
		@description	Parses a User from a JSON representation and into the proper class instances so that it can be used by the 
						application. This method can be used to parse Users sent in responses from the WebValueCharts server.
	*/
	public parseUser(jsonUser: any): User {
		var user: User = new User(jsonUser.username);

		// Parse the weight map if it is defined.
		if (jsonUser.weightMap !== undefined) {
			jsonUser.weightMap = this.parseWeightMap(jsonUser.weightMap);
		}

		// Parse the score function map if it is defined.
		if (jsonUser.scoreFunctionMap !== undefined) {
			jsonUser.scoreFunctionMap = this.parseScoreFunctionMap(jsonUser.scoreFunctionMap);
		}

		Object.assign(user, jsonUser);

		return user;
	}

	private parseWeightMap(jsonWeightMap: any): WeightMap {
		var weightMap: WeightMap = new WeightMap();

		for (var i = 0; i < jsonWeightMap.weights.length; i++) {
			weightMap.setObjectiveWeight(jsonWeightMap.weights[i][0], jsonWeightMap.weights[i][1]);
		}

		return weightMap;
	}

	private parseScoreFunctionMap(jsonScoreFunctionMap: any): ScoreFunctionMap {
		var scoreFunctionMap: ScoreFunctionMap = new ScoreFunctionMap();

		for (var i = 0; i < jsonScoreFunctionMap.scoreFunctions.length; i++) {
			scoreFunctionMap.setObjectiveScoreFunction(jsonScoreFunctionMap.scoreFunctions[i][0], this.parseScoreFunction(jsonScoreFunctionMap.scoreFunctions[i][1]));
		}
		return scoreFunctionMap;
	}

	private parseScoreFunction(jsonScoreFunction: any): ScoreFunction {
		var scoreFunction: ScoreFunction;

		if (jsonScoreFunction.type === 'continuous') {
			scoreFunction = new ContinuousScoreFunction(jsonScoreFunction.minDomainValue, jsonScoreFunction.maxDomainValue);
		} else {
			scoreFunction = new DiscreteScoreFunction();
		}

		for (var i = 0; i < jsonScoreFunction.elementScoreMap.length; i++) {
			scoreFunction.setElementScore(jsonScoreFunction.elementScoreMap[i][0], jsonScoreFunction.elementScoreMap[i][1]);
		}

		return scoreFunction;
	}



}