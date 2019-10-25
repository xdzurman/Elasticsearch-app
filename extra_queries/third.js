const query3 = {
    "query": {
        "bool": {
            "must": [
                {
                    "multi_match": {
                        "query": "battle",
                        "fields": [
                            "title",
                            "text"
                        ]
                    }
                },
                {
                    "multi_match": {
                        "query": "Slovakia",
                        "fields": [
                            "belligerents1",
                            "belligerents2"
                        ]
                    }
                },
                {
                    "range": {
                        "year": {
                            "gte": "1939",
                            "lte": "1945"
                        }
                    }
                }
            ]
        }
    },
    "size": 0,
    "aggs": {
        "avg_strength_in_battles_with_slovaks": {
            "avg": {
                "script": {
                    "source": "doc.strength1.value + doc.strength2.value"
                }
            }
        }
    }
}