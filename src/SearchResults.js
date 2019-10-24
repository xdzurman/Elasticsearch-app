import React from 'react'

const formatYear = yearStr => {
    return yearStr && yearStr[0] === '-' ? `${yearStr.substring(1)} BC` : yearStr
}

function SearchResults (props) {
    const results = props.results && 
        props.results.map(result => {
            return <div className="result-row" key={result._id}>
                <p className="result-title">Title: {result._source.title}</p>
                <p>Result: {result._source.result}</p>
                <p>Date: {result._source.date}</p>
                <p>Location: {result._source.location}</p>
                <p>Belligerents: {result._source.belligerents1} : {result._source.belligerents2}</p>
                <p>Leaders: {result._source.leaders1} : {result._source.leaders2}</p>
                <p>Strengths: {result._source.strength1} : {result._source.strength2}</p>
                <p>Losses: {result._source.losses1} : {result._source.losses2}</p>
                <p>Year: {formatYear(result._source.year)}</p>
                <p>{JSON.stringify(result.highlight)}</p>
            </div>
        });
    return (
        <div className="results">{results}</div>
    )
}

export default SearchResults
