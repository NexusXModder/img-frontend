import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="antialiased selection:bg-blue-500/30 selection:text-blue-200">
      <Component {...pageProps} />
    </div>
  );
}
