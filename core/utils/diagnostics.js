// core/utils/diagnostics.js

let routeCount = 0;

/**
 * Set the number of routes registered on the app.
 */
function setRouteCount(count) {
  routeCount = count;
}

/**
 * Get current route count.
 */
function getRouteCount() {
  return routeCount;
}

module.exports = {
  routeCount,
  setRouteCount,
  getRouteCount,
};
