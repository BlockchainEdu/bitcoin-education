function appendUtmParameters() {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    // Validate UTM values: alphanumeric, hyphens, underscores, dots only. Max 100 chars.
    const UTM_PATTERN = /^[a-zA-Z0-9._-]{1,100}$/;
    function isValidUtm(value) {
      return value !== null && UTM_PATTERN.test(value);
    }

    const safeSource = isValidUtm(utmSource) ? utmSource : null;
    const safeMedium = isValidUtm(utmMedium) ? utmMedium : null;
    const safeCampaign = isValidUtm(utmCampaign) ? utmCampaign : null;

    // No valid UTM params — skip all DOM manipulation
    if (!safeSource && !safeMedium && !safeCampaign) return;

    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      try {
        const updatedHref = new URL(href, window.location.origin);

        // Only modify same-origin links with UTM params
        if (updatedHref.origin === window.location.origin) {
          if (safeSource) updatedHref.searchParams.set('utm_source', safeSource);
          if (safeMedium) updatedHref.searchParams.set('utm_medium', safeMedium);
          if (safeCampaign) updatedHref.searchParams.set('utm_campaign', safeCampaign);
        } else {
          // External links: only set source attribution
          updatedHref.searchParams.set('utm_source', 'blockchainedu.org');
        }

        link.setAttribute('href', updatedHref.toString());
      } catch {
        // Invalid URL — skip this link
      }
    });

    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      const action = form.getAttribute('action');
      if (!action) return;

      try {
        const updatedAction = new URL(action, window.location.origin);

        if (updatedAction.origin === window.location.origin) {
          if (safeSource) updatedAction.searchParams.set('utm_source', safeSource);
          if (safeMedium) updatedAction.searchParams.set('utm_medium', safeMedium);
          if (safeCampaign) updatedAction.searchParams.set('utm_campaign', safeCampaign);
        } else {
          updatedAction.searchParams.set('utm_source', 'blockchainedu.org');
        }

        form.setAttribute('action', updatedAction.toString());
      } catch {
        // Invalid action URL — skip
      }
    });
  }
}

appendUtmParameters();
