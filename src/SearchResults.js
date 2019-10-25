import React from 'react'

const formatYear = yearStr => {
    return yearStr && yearStr[0] === '-' ? `${yearStr.substring(1)} BC` : yearStr
}

const formatHighlight = highlight => {
    return {__html: `Text: ${highlight.text}`}; 
}

function SearchResults (props) {
    const results = props.results && 
        props.results.map(result => {
            return <div className="result-row" key={result._id}>
                <p className="result-title">Title: {result._source.title}</p>
                {result.highlight && <p dangerouslySetInnerHTML={formatHighlight(result.highlight)} />}
                {result._source.result && <p>Result: {result._source.result}</p>}
                {result._source.date && <p>Date: {result._source.date}</p>}
                {result._source.location && <p>Location: {result._source.location}</p>}
                {(result._source.belligerents1 || result._source.belligerents2)
                    && <p>Belligerents: {result._source.belligerents1} : {result._source.belligerents2}</p>}
                {(result._source.leaders1 || result._source.leaders2)
                    && <p>Leaders: {result._source.leaders1} : {result._source.leaders2}</p>}
                {(result._source.strength1 || result._source.strength2)
                    && <p>Strengths: {result._source.strength1} : {result._source.strength2}</p>}
                {(result._source.losses1 || result._source.losses2)
                    && <p>Losses: {result._source.losses1} : {result._source.losses2}</p>}
                {result._source.year && <p>Year: {formatYear(result._source.year)}</p>}
            </div>
        });
    return (
        <div className="results">{results}</div>
    )
}

export default SearchResults
