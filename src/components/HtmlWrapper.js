import React, { PropTypes } from 'react';

const HtmlWrapper = ({ children, state, head, scripts, stylesheets }) => {
  // eslint-disable-next-line react/no-danger
  const content = (<div id="root" dangerouslySetInnerHTML={{ __html: children }} />);
  const htmlAttributes = head.htmlAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {head.title.toComponent()}
      {head.meta.toComponent()}
      {head.link.toComponent()}
      {
        stylesheets.map(path => (
          <link href={`/${path}`} rel="stylesheet" />
        ))
      }
    </head>
    <body>
    { content }
    <script
      dangerouslySetInnerHTML={{__html: `window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};`}}
    />
    {
      scripts.map(path => (
        <script src={`/${path}`} type="text/javascript"></script>
      ))
    }
    </body>
    </html>
  );
};

HtmlWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  state: PropTypes.object.isRequired,
  head: PropTypes.object.isRequired,
  scripts: PropTypes.arrayOf(PropTypes.string),
  stylesheets: PropTypes.arrayOf(PropTypes.string),
};

export default HtmlWrapper;