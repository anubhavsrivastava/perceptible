(function() {
  // Create Telemetry Widget DOM Container
  let widgetContainer = document.getElementById('perceptible-widget');
  if (!widgetContainer) {
    widgetContainer = document.createElement('div');
    widgetContainer.id = 'perceptible-widget';
    document.body.appendChild(widgetContainer);
  }

  // Remove the old JSON widget container if it exists
  let oldJsonWidget = document.getElementById('perceptible-json-widget');
  if (oldJsonWidget) {
    oldJsonWidget.parentNode.removeChild(oldJsonWidget);
  }

  widgetContainer.innerHTML = `
    <div class="widget-header">
      <div class="widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 21V9h12"/><path d="M9 15h12"/><path d="M9 9h12"/></svg>
        Telemetry Widget (JSON Payload)
      </div>
      <span id="pw-focus-badge" class="status-badge focused">Window Focused</span>
    </div>
    <div id="pw-elements-container"></div>
  `;

  const focusBadge = document.getElementById('pw-focus-badge');
  const elementsContainer = document.getElementById('pw-elements-container');

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

    Object.keys(activeStores).forEach(id => {
      const data = activeStores[id] || {};
      
      html += `
        <div class="element-card" style="padding: 12px; margin-bottom: 12px; background: rgba(30, 41, 59, 0.6); border: 1px solid var(--border-color); border-radius: 10px;">
          <div class="element-id" style="font-weight: 600; color: #818cf8; font-family: var(--font-mono); margin-bottom: 6px;">#${id}</div>
          <pre style="font-family: var(--font-mono); font-size: 0.7rem; color: #a5f3fc; margin: 0; white-space: pre-wrap; word-break: break-all; max-height: 250px; overflow-y: auto;">${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    });

    elementsContainer.innerHTML = html;
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
