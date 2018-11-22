import React from 'react';
import Loadable from 'react-loadable';

export const LoadableWrapper = path =>
  Loadable({
    loader: () =>
      import(/* webpackChunkName: "[request]" */ `navigation/pages/${path}`).catch(err =>
        console.log(err),
      ),
    render(loaded, props) {
      const C = loaded.default;

      return <C {...props} />;
    },
    loading: () => <div />,
  });
