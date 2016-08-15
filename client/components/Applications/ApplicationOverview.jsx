import React from 'react';
import { findDOMNode } from 'react-dom';

import { SearchBar, ApplicationsTable } from './';
import { Error, LoadingPanel } from '../Dashboard';
import { Link } from 'react-router';

export default class ApplicationOverview extends React.Component {
  static propTypes = {
    onReset: React.PropTypes.func.isRequired,
    onChangeSearch: React.PropTypes.func.isRequired,
    deleteApplication: React.PropTypes.func.isRequired,
    error: React.PropTypes.object,
    applications: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ]).isRequired,
    loading: React.PropTypes.bool.isRequired
  }

  onChangeSearch = (e) => {
      this.props.onChangeSearch(findDOMNode(this.refs.search).value);
  }

  render() {
    const { loading, error, applications } = this.props;

    return (
      <div>
        <LoadingPanel show={ loading }>
          <div className="row">
            <div className="col-xs-12 wrapper">
              <Error message={ error } />
            </div>
          </div>
          <SearchBar onReset={this.props.onReset} onChangeSearch={this.props.onChangeSearch} enabled={ () => !loading } />
          <div className="row">
            <div className="col-xs-12">
                <ApplicationsTable loading={loading} applications={applications} deleteApplication={this.props.deleteApplication} />
            </div>
          </div>
        </LoadingPanel>
      </div>
    );
  }
}
