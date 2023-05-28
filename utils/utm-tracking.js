function appendUtmParameters() {
  if (typeof window !== 'undefined') {
    // Retrieve the UTM parameters from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    // Append the UTM parameters to the URLs of links or forms
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      const updatedHref = new URL(href, window.location.origin);

      if (utmSource !== null) {
        updatedHref.searchParams.set('utm_source', utmSource);
      }
      if (utmMedium !== null) {
        updatedHref.searchParams.set('utm_medium', utmMedium);
      }
      if (utmCampaign !== null) {
        updatedHref.searchParams.set('utm_campaign', utmCampaign);
      }

      link.setAttribute('href', updatedHref.toString());

      // Check if the link is leaving the website
      if (!link.href.startsWith(window.location.origin)) {
        updatedHref.searchParams.set('utm_source', 'blockchainedu.org');
        updatedHref.searchParams.delete('utm_medium');
        updatedHref.searchParams.delete('utm_campaign');
        link.setAttribute('href', updatedHref.toString());
      }
    });

    // Similarly, update form actions if necessary
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      const action = form.getAttribute('action');
      const updatedAction = new URL(action, window.location.origin);

      if (utmSource !== null) {
        updatedAction.searchParams.set('utm_source', utmSource);
      }
      if (utmMedium !== null) {
        updatedAction.searchParams.set('utm_medium', utmMedium);
      }
      if (utmCampaign !== null) {
        updatedAction.searchParams.set('utm_campaign', utmCampaign);
      }

      form.setAttribute('action', updatedAction.toString());

      // Check if the form action is leaving the website
      if (!updatedAction.href.startsWith(window.location.origin)) {
        updatedAction.searchParams.set('utm_source', 'blockchainedu.org');
        updatedAction.searchParams.delete('utm_medium');
        updatedAction.searchParams.delete('utm_campaign');
        form.setAttribute('action', updatedAction.toString());
      }
    });
  }
}

// Execute the appendUtmParameters function on each page load
appendUtmParameters();
