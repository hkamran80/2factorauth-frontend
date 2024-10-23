import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { API_URL } from '../constants.js';

import "/assets/css/navbar.scss";
import "/node_modules/flag-icons/css/flag-icons.min.css";

function Navbar() {
  const [regions, setRegions] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/regions.json`, { cache: 'force-cache' }).
      then(res => res.json()).
      then(data => setRegions(data)).
      catch(err => console.error('Error fetching regions:', err));  // Add error handling
  }, []);

  return (
    <nav className="navbar navbar-expand-lg" role="navigation">
      <div className="container">
        {/* TODO: Conditionally handle href */}
        <a className="nav-link" id="branding" href="/about">
          <ul className="icon">
            <li>2FA Directory</li>
          </ul>
        </a>

        <a class="nav-link dropdown-toggle" id="regionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true" aria-label="Choose region" tabindex={0}>
          <span aria-hidden={true} className={window.location.pathname == "/int/" ? "bi bi-globe" : `fi fi-${window.location.pathname.replace(/\//g, "")}`}></span>
        </a>

        <div aria-labelledby="regionDropdown" className="dropdown-menu dropdwon-menu-end">
          <a class="dropdown-item" href="/int/">
            <span class="fi fi-un"></span>
            <b>Global</b>
          </a>

          {Object.keys(regions).sort((a, b) => regions[a].name.localeCompare(regions[b].name)).map((region) =>
            <a class="dropdown-item" href={`/${region}/`}>
              <span class={`fi fi-${region} ${regions[region].squareFlag && "fis"}`}></span>
              {regions[region].name}
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}

render(<Navbar />, document.getElementById('nav'));