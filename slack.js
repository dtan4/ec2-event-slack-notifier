'use strict';

exports.constructAttachments = (statuses, locale) => {
  let now = new Date();

  return statuses.map(status => {
    return status.Events.map(event => {
      let color = event.NotBefore > now ? 'warning' : 'danger';
      let eventFrom = event.NotBefore == undefined ? '' : event.NotBefore.toLocaleString(locale, { hour12: false });
      let eventTo = event.NotAfter == undefined ? '' : event.NotAfter.toLocaleString(locale, { hour12: false });

      return {
        fallback: `${status.InstanceId} / ${event.Code} / ${eventFrom} - ${eventTo} / ${event.Description}`,
        color: color,
        fields: [
          {
            title: 'Instance',
            value: status.InstanceId,
            short: true,
          },
          {
            title: 'Event Type',
            value: event.Code,
            short: true,
          },
          {
            title: 'Duration',
            value: `${eventFrom} - ${eventTo}`,
            short: false,
          },
          {
            title: 'Description',
            value: event.Description,
            short: false,
          },
        ],
      };
    });
  }).filter(a => a.length > 0).reduce((r, v) => r.concat(v), []);
};
