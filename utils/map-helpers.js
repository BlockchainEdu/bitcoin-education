/**
 * This function allows you to change the viewport but always remain in specific bounds.
 *
 * @param viewport the viewport that you would like to update the map to.
 * @param bounds bounds to clamp to.
 */
const clampViewportToBounds = (viewport, bounds) => {
  /** Get the variables we need for calculation */
  let { latitude, longitude, ...rest } = viewport;
  const [[minLongitude, minLatitude], [maxLongitude, maxLatitude]] = bounds;

  /** Clamp latitude */
  if (latitude < minLatitude) {
    latitude = minLatitude;
  } else if (latitude > maxLatitude) {
    latitude = maxLatitude;
  }

  /** Clamp longitude */
  if (longitude < minLongitude) {
    longitude = minLongitude;
  } else if (longitude > maxLongitude) {
    longitude = maxLongitude;
  }

  /** Return clamped viewport */
  return {
    ...viewport,
    ...rest,
    latitude,
    longitude,
  };
};

export default clampViewportToBounds;
