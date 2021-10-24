import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class Document extends NextDocument {
  render() {
    return (
      <Html >
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>RedWar</title>
          <meta
            name="description"
            content="An NFT turn-based multiplayer wargame expanding the metaverse to Redwall! "
          />
          <meta name="author" content="Andreas Bigger <andreas@nascent.xyz>" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode='dark' />
          <Main />
          <NextScript />
          <style jsx global>{`
            html, body {
              min-height: 100%;
              height: 100%;
            }

            #__next {
              height: 100%;
              min-height: 100%;
            }

            @keyframes shake {
              10%,
              90% {
                transform: translate3d(-1px, 0, 0);
              }

              20%,
              80% {
                transform: translate3d(2px, 0, 0);
              }

              30%,
              50%,
              70% {
                transform: translate3d(-4px, 0, 0);
              }

              40%,
              60% {
                transform: translate3d(4px, 0, 0);
              }
            }

            @keyframes hit-bounce {
              0% {
                transform: scale(1) translateY(0);
              }
              10% {
                transform: scale(1.2, 0.6);
              }
              30% {
                transform: scale(0.8, 1.1) translateY(-10px);
              }
              50% {
                transform: scale(1) translateY(0);
              }
              100% {
                transform: translateY(0);
              }
            }

            .healthBar progress[value] {
              -webkit-appearance: none;
              appearance: none;
              width: 100%;
              height: 100%;
            }

            .healthBar progress[value]::-webkit-progress-bar {
              background-color: #e5652e;
              border-bottom-left-radius: 15px;
              border-bottom-right-radius: 15px;
              overflow: hidden;
            }

            .healthBar progress[value]::-webkit-progress-value {
              background-color: #70cb1b;
            }
          `}</style>
        </body>
      </Html>
    )
  }
}
