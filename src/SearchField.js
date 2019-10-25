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
      yearHigh: '',
      sort: 'score',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.appendRangePairQuery = this.appendRangePairQuery.bind(this);
    this.appendRangeSingleQuery = this.appendRangeSingleQuery.bind(this);
    this.getSortQuery = this.getSortQuery.bind(this);
  }

  handleCheckbox(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  handleInputChange(e) {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  }

  getSortQuery(type) {
    if (type === 'score') {
      return '_score'
    } else if (type === 'year') {
      return { year: 'desc' }
    }
  }

  appendRangeSingleQuery(low, high, property) {
    return low !== '' && high !== '' ? {
      range: {
        [property]: {
          gte: low,
          lte: high
        }
      }
    } : {}
  }

  appendRangePairQuery(low, high, property1, property2) {
    return low !== '' && high !== '' ? {
      bool: {
        should: [
          this.appendRangeSingleQuery(low, high, property1),
          this.appendRangeSingleQuery(low, high, property2)
        ]
      }
    } : {}
  }

  async handleSubmit(e) {
    e.preventDefault()

    const queryBody = {
      bool: {
        must: [
          {
            multi_match: {
              query: this.state.query,
              fields: [
                "title^5",
                "text",
                "belligerents1^3",
                "belligerents2^3",
                "leaders1^3",
                "leaders2^3"
              ],
              fuzziness : this.state.fuzzy ? "AUTO" : undefined
            }
          },
          this.appendRangePairQuery(this.state.strengthLow, this.state.strengthHigh,
            'strength1', 'strength2'),
          this.appendRangePairQuery(this.state.lossesLow, this.state.lossesHigh,
            'losses1', 'losses2'),
          this.appendRangeSingleQuery(this.state.yearLow, this.state.yearHigh,
            'year'),
        ]
      }
    }

    const req = {
      sort: this.getSortQuery(this.state.sort),
      query: queryBody,
      highlight: {
        fields: {
          text: {
            pre_tags: ['<b>'],
            post_tags: ['</b>']
          }
        }
      }
    }

    const cleanedReq = JSON.stringify(req).replace(/,{}/g, '')
    console.log(JSON.stringify(req).replace(/,{}/g, ''))

    const data = await fetch('/battles/_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: cleanedReq
    }).then(res => res.json()).catch(e => console.log(e))
    this.props.fillResults(data)
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
              value={this.state.strengthLow}
              onChange={this.handleInputChange}
              placeholder="Low"
            />
            -
                        <input
              className="range"
              name="strengthHigh"
              type="number"
              value={this.state.strengthHigh}
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
              value={this.state.lossesLow}
              onChange={this.handleInputChange}
              placeholder="Low"
            />
            -
                        <input
              className="range"
              name="lossesHigh"
              type="number"
              value={this.state.lossesHigh}
              onChange={this.handleInputChange}
              placeholder="High"
            />
          </label>

          <label>
            <span className="describe"> Year </span>
            <input
              className="range"
              name="yearLow"
              type="number"
              value={this.state.yearLow}
              onChange={this.handleInputChange}
              placeholder="Low (can be negative)"
            />
            -
                        <input
              className="range"
              name="yearHigh"
              type="number"
              value={this.state.yearHigh}
              onChange={this.handleInputChange}
              placeholder="High (can be negative)"
            />
          </label>

          <label>
            <input
              type="radio"
              name="sort"
              value="score"
              checked={this.state.sort === 'score'}
              onChange={this.handleInputChange}
            />
            <span > Sort by score </span>
          </label>

          <label>
            <input
              type="radio"
              name="sort"
              value="year"
              checked={this.state.sort === 'year'}
              onChange={this.handleInputChange}
            />
            <span > Sort by year </span>
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default SearchField;