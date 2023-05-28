if (typeof window !== 'undefined') {
  // Retrieve the UTM parameters from session storage
  const utmSource = sessionStorage.getItem('utm_source');
  const utmMedium = sessionStorage.getItem('utm_medium');
  const utmCampaign = sessionStorage.getItem('utm_campaign');

  // Append the UTM parameters to the URLs of links or forms
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    const updatedHref = new URL(href, window.location.origin);

    if (utmSource !== null && utmSource !== 'null') {
      updatedHref.searchParams.set('utm_source', utmSource);
    }
    if (utmMedium !== null && utmMedium !== 'null') {
      updatedHref.searchParams.set('utm_medium', utmMedium);
    }
    if (utmCampaign !== null && utmCampaign !== 'null') {
      updatedHref.searchParams.set('utm_campaign', utmCampaign);
    }

    link.setAttribute('href', updatedHref.toString());
  });

  // Similarly, update form actions if necessary
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    const action = form.getAttribute('action');
    const updatedAction = new URL(action, window.location.origin);

    if (utmSource !== null && utmSource !== 'null') {
      updatedAction.searchParams.set('utm_source', utmSource);
    }
    if (utmMedium !== null && utmMedium !== 'null') {
      updatedAction.searchParams.set('utm_medium', utmMedium);
    }
    if (utmCampaign !== null && utmCampaign !== 'null') {
      updatedAction.searchParams.set('utm_campaign', utmCampaign);
    }

    form.setAttribute('action', updatedAction.toString());
  });
}