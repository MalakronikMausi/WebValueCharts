/*
* @Author: aaronpmishkin
* @Date:   2016-07-28 13:01:49
* @Last Modified by:   aaronpmishkin
* @Last Modified time: 2016-07-28 17:07:02
*/

export var JsonGroupHotel: any = {
    "name": "Hotel",
    "description": "Description Information Goes Here\n\t                    ",
    "creator": "Aaron Mishkin",
    "rootObjectives": [
        {
            "name": "Hotel",
            "description": "Description Information Goes Here\n\t                    ",
            "objectiveType": "abstract",
            "subObjectives": [
                {
                    "name": "location",
                    "description": "Description Information Goes Here\n\t                    ",
                    "objectiveType": "abstract",
                    "subObjectives": [
                        {
                            "name": "area",
                            "description": "Description Information Goes Here\n\t                    ",
                            "objectiveType": "primitive",
                            "id": "area",
                            "color": "#C0392B",
                            "domain": {
                                "type": "categorical",
                                "ordered": false,
                                "elements": [
                                    "nightlife",
                                    "beach",
                                    "airport"
                                ]
                            }
                        },
                        {
                            "name": "skytrain-distance",
                            "description": "Description Information Goes Here\n\t                    ",
                            "objectiveType": "primitive",
                            "id": "skytrain-distance",
                            "color": "#7D3C98",
                            "domain": {
                                "minValue": 2,
                                "maxValue": 9,
                                "unit": "blocks",
                                "type": "continuous"
                            }
                        }
                    ],
                    "id": "location"
                },
                {
                    "name": "room",
                    "description": "Description Information Goes Here\n\t                    ",
                    "objectiveType": "abstract",
                    "subObjectives": [
                        {
                            "name": "size",
                            "description": "Description Information Goes Here\n\t                    ",
                            "objectiveType": "primitive",
                            "id": "size",
                            "color": "#2980B9",
                            "domain": {
                                "minValue": 200,
                                "maxValue": 350,
                                "unit": "sq-ft",
                                "type": "continuous"
                            }
                        },
                        {
                            "name": "internet-access",
                            "description": "Description Information Goes Here\n\t                    ",
                            "objectiveType": "primitive",
                            "id": "internet-access",
                            "color": "#27AE60",
                            "domain": {
                                "type": "categorical",
                                "ordered": false,
                                "elements": [
                                    "highspeed",
                                    "lowspeed",
                                    "none"
                                ]
                            }
                        }
                    ],
                    "id": "room"
                },
                {
                    "name": "rate",
                    "description": "Description Information Goes Here\n\t                ",
                    "objectiveType": "primitive",
                    "id": "rate",
                    "color": "#F1C40F",
                    "domain": {
                        "minValue": 100,
                        "maxValue": 200,
                        "unit": "CAD",
                        "type": "continuous"
                    }
                }
            ],
            "id": "Hotel"
        }
    ],
    "alternatives": [
        {
            "name": "Sheraton",
            "description": "Get a good night's sleep with premium bedding, a down duvet, and blackout drapes/curtains. The 32-inch TV offers pay movies. Request an in-room massage. A coffee/tea maker is provided. You will have a shower/tub combination, as well as complimentary toiletries and a hair dryer. Climate control, air conditioning, and a safe are among the conveniences offered. This room is Non-Smoking.",
            "objectiveValues": [
                [
                    "area",
                    "nightlife"
                ],
                [
                    "internet-access",
                    "highspeed"
                ],
                [
                    "rate",
                    150
                ],
                [
                    "skytrain-distance",
                    7
                ],
                [
                    "size",
                    350
                ]
            ]
        },
        {
            "name": "BestWestern",
            "description": "Balcony with city views. Complimentary wireless Internet access. 42-inch LCD TV. Pay movies. Coffee/tea maker. Fridge and microwave. Private bathroom. Shower/tub combination. Complimentary toiletries. Hair dryer. Safe. Desk. Complimentary newspapers. This room is Non-Smoking.",
            "objectiveValues": [
                [
                    "area",
                    "nightlife"
                ],
                [
                    "internet-access",
                    "highspeed"
                ],
                [
                    "rate",
                    100
                ],
                [
                    "skytrain-distance",
                    2
                ],
                [
                    "size",
                    200
                ]
            ]
        },
        {
            "name": "Hyatt",
            "description": "Wide, floor-to-ceiling windows. Desk. 42-inch flat-screen TV with cable, pay movies, and video games (surcharge). Voice mail. Upholstered armchair with ottoman. Bathrobes. Hairdryer. Designer toiletries. Shower/tub combination. Refrigerator. Video account review and check-out. Rollaway beds available.",
            "objectiveValues": [
                [
                    "area",
                    "beach"
                ],
                [
                    "internet-access",
                    "lowspeed"
                ],
                [
                    "rate",
                    200
                ],
                [
                    "skytrain-distance",
                    2
                ],
                [
                    "size",
                    275
                ]
            ]
        },
        {
            "name": "Marriott",
            "description": "The video-game console and TV with satellite channels are offered for your entertainment. A coffee/tea maker is provided. The private bathroom has designer toiletries. Climate control, air conditioning, and a safe are among the conveniences offered. This room is Non-Smoking.",
            "objectiveValues": [
                [
                    "area",
                    "airport"
                ],
                [
                    "internet-access",
                    "lowspeed"
                ],
                [
                    "rate",
                    175
                ],
                [
                    "skytrain-distance",
                    9
                ],
                [
                    "size",
                    200
                ]
            ]
        },
        {
            "name": "HolidayInn",
            "description": "The 42-inch flat-screen TV offers cable channels. A coffee/tea maker is provided. The private bathroom has a hair dryer. Air conditioning, a desk, and a wake-up call service are among the conveniences offered. This room is Non-Smoking.",
            "objectiveValues": [
                [
                    "area",
                    "airport"
                ],
                [
                    "internet-access",
                    "none"
                ],
                [
                    "rate",
                    100
                ],
                [
                    "skytrain-distance",
                    1
                ],
                [
                    "size",
                    237.5
                ]
            ]
        },
        {
            "name": "Ramada",
            "description": "1 double bed. Desk. 37-inch LCD high-definition TV. Pay movies. Phone. Voice mail. Clock radio. Coffee/tea maker. Hair dryer. Iron/ironing board. Complimentary weekday newspaper. Bathroom with granite-topped vanity. Blackout drapes/curtains. Air conditioning. Climate control",
            "objectiveValues": [
                [
                    "area",
                    "beach"
                ],
                [
                    "internet-access",
                    "none"
                ],
                [
                    "rate",
                    125
                ],
                [
                    "skytrain-distance",
                    1
                ],
                [
                    "size",
                    312.5
                ]
            ]
        }
    ],
    "users": [
        {
            "username": "Aaron Mishkin",
            "color": null,
            "weightMap": {
                "weights": [
                    [
                        "area",
                        0.2
                    ],
                    [
                        "internet-access",
                        0.1
                    ],
                    [
                        "rate",
                        0.3
                    ],
                    [
                        "skytrain-distance",
                        0.2
                    ],
                    [
                        "size",
                        0.2
                    ]
                ],
                "weightTotal": 1
            },
            "scoreFunctionMap": {
                "scoreFunctions": [
                    [
                        "area",
                        {
                            "elementScoreMap": [
                                [
                                    "nightlife",
                                    0.25
                                ],
                                [
                                    "beach",
                                    0.5
                                ],
                                [
                                    "airport",
                                    1
                                ]
                            ],
                            "type": "discrete"
                        }
                    ],
                    [
                        "skytrain-distance",
                        {
                            "elementScoreMap": [
                                [
                                    1,
                                    1
                                ],
                                [
                                    3,
                                    0.5
                                ],
                                [
                                    5,
                                    0.2
                                ],
                                [
                                    7,
                                    0.1
                                ],
                                [
                                    9,
                                    0
                                ]
                            ],
                            "type": "continuous",
                            "minDomainValue": 1,
                            "maxDomainValue": 9
                        }
                    ],
                    [
                        "size",
                        {
                            "elementScoreMap": [
                                [
                                    200,
                                    1
                                ],
                                [
                                    237.5,
                                    0.8
                                ],
                                [
                                    275,
                                    0.6
                                ],
                                [
                                    312.5,
                                    0.4
                                ],
                                [
                                    350,
                                    0.2
                                ]
                            ],
                            "type": "continuous",
                            "minDomainValue": 200,
                            "maxDomainValue": 350
                        }
                    ],
                    [
                        "internet-access",
                        {
                            "elementScoreMap": [
                                [
                                    "none",
                                    0
                                ],
                                [
                                    "highspeed",
                                    1
                                ],
                                [
                                    "lowspeed",
                                    0.5
                                ]
                            ],
                            "type": "discrete"
                        }
                    ],
                    [
                        "rate",
                        {
                            "elementScoreMap": [
                                [
                                    100,
                                    1
                                ],
                                [
                                    125,
                                    0.75
                                ],
                                [
                                    150,
                                    0.5
                                ],
                                [
                                    175,
                                    0.25
                                ],
                                [
                                    200,
                                    0
                                ]
                            ],
                            "type": "continuous",
                            "minDomainValue": 100,
                            "maxDomainValue": 200
                        }
                    ]
                ]
            }
        }
    ],
    "password": "ThisIsATestPassword"
};