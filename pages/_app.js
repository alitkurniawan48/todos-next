
import React, { useState } from "react";
// ensure all pages have Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          TODOS
        </a>
      </nav>
      <Component {...pageProps} />
    </div>
  )

}

export default MyApp;