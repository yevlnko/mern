import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from '../../redux/locale/selectors';

import messages from '../../translations';


const mapStateToProps = createSelector(makeSelectLocale(), lang => ({
  lang,
}));

@connect(mapStateToProps)
class LanguageProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    lang: PropTypes.string.isRequired,
  };

  render() {
    const { children, lang } = this.props;
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

export default LanguageProvider;
