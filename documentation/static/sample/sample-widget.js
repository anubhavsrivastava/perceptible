(function() {
  // Create Widget DOM Container
  let widgetContainer = document.getElementById('perceptible-widget');
  if (!widgetContainer) {
    widgetContainer = document.createElement('div');
    widgetContainer.id = 'perceptible-widget';
    document.body.appendChild(widgetContainer);
  }

  // Create JSON Widget DOM Container
  let jsonWidgetContainer = document.getElementById('perceptible-json-widget');
  if (!jsonWidgetContainer) {
    jsonWidgetContainer = document.createElement('div');
    jsonWidgetContainer.id = 'perceptible-json-widget';
    document.body.appendChild(jsonWidgetContainer);
  }

  widgetContainer.innerHTML = `
    <div class="widget-header">
      <div class="widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        Telemetry Widget
      </div>
      <span id="pw-focus-badge" class="status-badge focused">Window Focused</span>
    </div>
    <div id="pw-elements-container"></div>
  `;

  jsonWidgetContainer.innerHTML = `
    <div class="widget-header">
      <div class="widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 21V9h12"/><path d="M9 15h12"/><path d="M9 9h12"/></svg>
        JSON Payload Monitor
      </div>
    </div>
    <div id="pw-json-container"></div>
  `;

  const focusBadge = document.getElementById('pw-focus-badge');
  const elementsContainer = document.getElementById('pw-elements-container');
  const jsonContainer = document.getElementById('pw-json-container');

  // Handle Focus / Blur Status
  window.addEventListener('focus', function() {
    if (focusBadge) {
      focusBadge.textContent = 'Window Focused';
      focusBadge.className = 'status-badge focused';
    }
  });

  window.addEventListener('blur', function() {
    if (focusBadge) {
      focusBadge.textContent = 'Window Blurred';
      focusBadge.className = 'status-badge blurred';
    }
  });

  const activeStores = {};

  // Global Widget Telemetry Updater function
  window.updatePerceptibleWidget = function(id, data) {
    if (!id) id = (data.element && data.element.id) || 'unknown';
    activeStores[id] = data;
    renderWidget();
  };

  function renderWidget() {
    if (!elementsContainer) return;
    let html = '';
    let jsonHtml = '';

    Object.keys(activeStores).forEach(id => {
      const data = activeStores[id] || {};
      const surface = Math.round(data.subView ? data.subView.surface || 0 : 0);
      const isVisible = !!data.isVisible;
      const durationSec = ((data.duration || 0) / 1000).toFixed(1);

      html += `
        <div class="element-card">
          <div class="element-id">
            <span>#${id}</span>
            <span class="pill ${isVisible ? 'pill-online' : 'pill-offline'}">${isVisible ? 'Visible' : 'Hidden'}</span>
          </div>
          <div class="metric-row">
            <span>Surface Area:</span>
            <span class="metric-val">${surface}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${Math.min(surface, 100)}%"></div>
          </div>
          <div class="metric-row">
            <span>Visible Duration:</span>
            <span class="metric-val">${durationSec}s</span>
          </div>
        </div>
      `;

      jsonHtml += `
        <div class="payload-card">
          <div class="element-id">#${id}</div>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    });

    elementsContainer.innerHTML = html;
    if (jsonContainer) {
      jsonContainer.innerHTML = jsonHtml;
    }
  }

  // Intercept domSubscriber calls to feed telemetry widget automatically
  setInterval(function() {
    const dreporter = document.getElementById('dreporter');
    if (dreporter && dreporter.children.length > 0) {
      Array.from(dreporter.children).forEach(child => {
        try {
          const pre = child.querySelector('pre');
          if (pre && pre.innerText) {
            const data = JSON.parse(pre.innerText);
            const id = (data.element && data.element.id) || 'target';
            window.updatePerceptibleWidget(id, data);
          }
        } catch (e) {
          // ignore parsing error
        }
      });
    }
  }, 250);
})();
