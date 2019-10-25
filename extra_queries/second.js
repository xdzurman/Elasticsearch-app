const query2 = {
    "size": 0,
    "aggs": {
        "deathcount_over_centuries": {
            "histogram": {
                "field": "year",
                "interval": 100,
                "min_doc_count": 1
            },
            "aggs": {
                "deaths": {
                    "sum": {
                        "script": {
                            "source": "doc.losses1.value + doc.losses2.value"
                        }
                    }
                }
            }
        },
        "overall_deaths_stats": {
            "stats_bucket": {
                "buckets_path": "deathcount_over_centuries>deaths"
            }
        }
    }
}