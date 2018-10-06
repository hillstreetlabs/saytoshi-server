import Document, { Head, Main, NextScript } from "next/document";
import styled, { injectGlobal } from "react-emotion";
import { extractCritical } from "emotion-server";

injectGlobal`
  html, body {
    margin: 0;
    background-color: white;
    min-height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";
  }

  * {
    box-sizing: border-box;
  }

  p, h1, h2, h3, h4, h5 {
    margin: 0;
    padding: 0;
  }

  input:focus, button:focus, textarea:focus {
    outline: none;
  }
`;

export default class TheDocument extends Document {
  static getInitialProps({ pathname, res, renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          <title>SayToshi</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Rubik:300,400,500"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
