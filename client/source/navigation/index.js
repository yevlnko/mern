import React, { Component } from 'react';
import { Switch, withRouter, Route } from 'react-router';

// Instruments
import { connect } from 'react-redux';
import { addLocaleData } from 'react-intl';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';

import { LoadableWrapper } from './utils';
import LanguageProvider from 'components/LanguageProvider';
import { book } from './book';

addLocaleData([...en, ...ru]);

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Main extends Component {
  state = {
    routes: [],
  };

  componentDidMount() {
    this.setState(() => ({
      routes: book.map(page => {
        const { name, path, componentPath, exact } = page;
        return (
          <Route
            key={name}
            component={LoadableWrapper(componentPath)}
            exact={exact}
            path={path}
          />
        );
      }),
    }));
  }

  render() {
    const { routes } = this.state;
    return (
      <LanguageProvider>
        <Switch>{routes}</Switch>
      </LanguageProvider>
    );
  }
}

export default Main;
