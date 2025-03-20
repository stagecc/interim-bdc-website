/**
 * Tracks a custom event using Google Tag Manager's dataLayer.
 *
 * @param {string} eventName - The name of the event to track.
 * @param {Object} [eventData={}] - Additional event data to send (optional).
 * @param {string} [eventData.category] - The event category (e.g., 'button').
 * @param {string} [eventData.action] - The event action (e.g., 'click').
 * @param {string} [eventData.label] - A label describing the event (e.g., 'Subscribe Button').
 * @param {number} [eventData.value] - A numerical value associated with the event.
 */
export const trackCustomEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};
