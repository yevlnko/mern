import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { localeActions } from 'redux/locale/actions';

const mapDispatchToProps = {
  changeLocale: localeActions.changeLocale,
};

const mapStateToProps = state => ({
  lang: state.get('lang'),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Main extends Component {
  static propTypes = {
    changeLocale: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
  };

  onChange = e => {
    const { value } = e.target;
    const { changeLocale } = this.props;
    changeLocale(value);
  };

  render() {
    const { lang } = this.props;
    return (
      <div>
        <p>Main</p>

        <select onChange={this.onChange} value={lang}>
          <option value="ru">ru</option>
          <option value="en">en</option>
        </select>
        <p>
          <FormattedMessage id="nav.button" />
        </p>
      </div>
    );
  }
}

export default Main;
