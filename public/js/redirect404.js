// Single Page Apps for GitHub Pages
// MIT License
// https://github.com/rafgraph/spa-github-pages
// This script checks to see if a redirect is present in the query string,
// converts it back into the correct url and adds it to the
// browser's history using window.history.replaceState(...),
// which won't cause the browser to attempt to load the new url.
// When the single page app is loaded further down in this file,
// the correct url will be waiting in the browser's history for
// the single page app to route accordingly.
function onFound() {
    const l = window.location;
    if (l.search[1] === "/") {
        const decoded = l.search
            .slice(1)
            .split("&")
            .map((s) => s.replace(/~and~/g, "&"))
            .join("?");
        const location = l.pathname.slice(0, -1) + decoded + l.hash;
        window.history.replaceState(null, null, location);
    }
}

function onNotFound() {
    const pathSegmentsToKeep = 0;

    const l = window.location;
    l.replace(
        l.protocol +
            "//" +
            l.hostname +
            (l.port ? ":" + l.port : "") +
            l.pathname
                .split("/")
                .slice(0, 1 + pathSegmentsToKeep)
                .join("/") +
            "/?/" +
            l.pathname
                .slice(1)
                .split("/")
                .slice(pathSegmentsToKeep)
                .join("/")
                .replace(/&/g, "~and~") +
            (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
            l.hash
    );
}
