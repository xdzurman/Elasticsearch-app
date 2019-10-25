import React from 'react'
import SearchField from './SearchField'
import SearchResults from './SearchResults'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
        }
        this.fillResults = this.fillResults.bind(this)
    }

    fillResults(data) {
        let results = []
        if(data && data.hits && data.hits.hits) {
            results = data.hits.hits
        }
        this.setState({results: results})
    }

    render() {
        return (
            <>
                <SearchField fillResults={this.fillResults}/>
                <SearchResults results={this.state.results}/>
            </>
        )
    }
}

export default Search