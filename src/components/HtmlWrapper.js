import React, { PropTypes } from 'react';

const HtmlWrapper = ({
  children,
  state,
  head,
  scripts,
  stylesheets,
  aphroditeCSS,
}) => {
  // eslint-disable-next-line react/no-danger
  const content = (
    <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
  );
  const htmlAttributes = head.htmlAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        <style data-aphrodite>{aphroditeCSS.content}</style>
        {stylesheets.map(path => <link href={`/${path}`} rel="stylesheet" />)}
      </head>
      <body>
        {content}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};` +
              `window.__PRELOADED_STYLES__ = ${JSON.stringify(aphroditeCSS.renderedClassNames)};`,
          }}
        />
        {scripts.map(path => (
          <script src={`/${path}`} type="text/javascript" />
        ))}
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
  aphroditeCSS: PropTypes.shape({
    content: PropTypes.string,
    renderedClassNames: PropTypes.object,
  }),
};

export default HtmlWrapper;
