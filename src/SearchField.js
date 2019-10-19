import React from 'react';

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            fuzzy: false,
            strengthLow: '',
            strengthHigh: '',
            lossesLow: '',
            lossesHigh: '',
            yearLow: '',
            yearLowBC: false,
            yearHigh: '',
            yearHighBC: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleCheckbox(e) {
        this.setState({[e.target.name]: e.target.checked})
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit() {
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span className="describe"> Search Query </span>
                        <input 
                            name="query"
                            type="text"
                            value={this.state.query}
                            onChange={this.handleInputChange} 
                            placeholder="Query text..."
                        />
                    </label>

                    <label>
                        <span className="describe"> Allow fuzzy search </span>
                        <input
                            name="fuzzy"
                            type="checkbox"
                            checked={this.state.fuzzy}
                            onChange={this.handleCheckbox} 
                        />
                    </label>

                    <label>
                        <span className="describe"> Strength </span>
                        <input
                            className="range"
                            name="strengthLow"
                            type="number"
                            checked={this.state.fuzzy}
                            onChange={this.handleInputChange} 
                            placeholder="Low"
                        />
                        -
                        <input
                            className="range"
                            name="strengthHigh"
                            type="number"
                            checked={this.state.fuzzy}
                            onChange={this.handleInputChange} 
                            placeholder="High"
                        />
                    </label>

                    <label>
                        <span className="describe"> Casualties </span>
                        <input
                            className="range"
                            name="lossesLow"
                            type="number"
                            checked={this.state.fuzzy}
                            onChange={this.handleInputChange}
                            placeholder="Low"
                        />
                        -
                        <input
                            className="range"
                            name="lossesHigh"
                            type="number"
                            checked={this.state.fuzzy}
                            onChange={this.handleInputChange} 
                            placeholder="High"
                        />
                    </label>

                    <label>
                        <span className="describe"> Year (checked = BC) </span>

                        <input
                            name="yearLowBC"
                            type="checkbox"
                            checked={this.state.yearLowBC}
                            onChange={this.handleCheckbox} 
                        />
                        <input
                            className="range"
                            name="yearLow"
                            type="number"
                            checked={this.state.yearLow}
                            onChange={this.handleInputChange} 
                            placeholder="Low"
                        />
                        -
                        <input
                            name="yearHighBC"
                            type="checkbox"
                            checked={this.state.yearHighBC}
                            onChange={this.handleCheckbox} 
                        />
                        <input
                            className="range"
                            name="yearHigh"
                            type="number"
                            checked={this.state.yearHigh}
                            onChange={this.handleInputChange} 
                            placeholder="High"
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default SearchField;