const query1 = {
    "sort": [
        {
            "losses1": "desc"
        },
        {
            "losses2": "desc"
        }
    ],
    "query": {
        "bool": {
            "must": [
                {
                    "multi_match": {
                        "query": "battlw",
                        "fields": [
                            "title^5",
                            "text",
                            "belligerents1^3",
                            "belligerents2^3",
                            "leaders1^3",
                            "leaders2^3"
                        ],
                        "fuzziness": "AUTO"
                    }
                },
                {
                    "bool": {
                        "should": [
                            {
                                "range": {
                                    "strength1": {
                                        "gte": "0",
                                        "lte": "10000"
                                    }
                                }
                            },
                            {
                                "range": {
                                    "strength2": {
                                        "gte": "0",
                                        "lte": "10000"
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    "bool": {
                        "should": [
                            {
                                "range": {
                                    "losses1": {
                                        "gte": "5000",
                                        "lte": "800000"
                                    }
                                }
                            },
                            {
                                "range": {
                                    "losses2": {
                                        "gte": "5000",
                                        "lte": "800000"
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    "range": {
                        "year": {
                            "gte": "-2500",
                            "lte": "1000"
                        }
                    }
                }
            ]
        }
    },
    "highlight": {
        "fields": {
            "text": {
                "pre_tags": [
                    "<b>"
                ],
                "post_tags": [
                    "</b>"
                ]
            }
        }
    }
}