import Perceptor, { SpectatorResult } from 'perceptible';

// Get Telemetry UI Elements
const attentionStatus = document.getElementById('attention-status');

const target1Visibility = document.getElementById('target1-visibility');
const target1Surface = document.getElementById('target1-surface');
const target1Progress = document.getElementById('target1-progress');
const target1Duration = document.getElementById('target1-duration');
const target1Clicks = document.getElementById('target1-clicks');

const target2Visibility = document.getElementById('target2-visibility');
const target2Surface = document.getElementById('target2-surface');
const target2Progress = document.getElementById('target2-progress');
const target2Duration = document.getElementById('target2-duration');

let clickCount = 0;

// Initialize Perceptor for Target 1 (50% threshold ad banner)
const target1Elem = document.getElementById('ad-banner-card');
if (target1Elem) {
  const perceptorTarget1 = new Perceptor(target1Elem, {
    threshold: 50,
    defaultSubscriber: 'none',
    clickHandler: () => {
      clickCount++;
      if (target1Clicks) {
        target1Clicks.textContent = String(clickCount);
      }
    },
    subscribers: [
      (_instance: Perceptor, data: SpectatorResult) => {
        const surface = Math.round(data.subView ? data.subView.surface || 0 : 0);
        const isVisible = data.isVisible;
        const durationSec = ((data.duration || 0) / 1000).toFixed(1);

        if (target1Visibility) {
          target1Visibility.textContent = isVisible ? 'Visible' : 'Hidden';
          target1Visibility.className = `pill ${isVisible ? 'pill-online' : 'pill-offline'}`;
        }

        if (target1Surface) {
          target1Surface.textContent = `${surface}%`;
        }

        if (target1Progress) {
          target1Progress.style.width = `${Math.min(surface, 100)}%`;
        }

        if (target1Duration) {
          target1Duration.textContent = `${durationSec}s`;
        }
      }
    ]
  });

  // Start watching
  perceptorTarget1.watch();
}

// Initialize Perceptor for Target 2 (100% threshold engagement card)
const target2Elem = document.getElementById('engagement-card');
if (target2Elem) {
  const perceptorTarget2 = new Perceptor(target2Elem, {
    threshold: 100,
    defaultSubscriber: 'none',
    subscribers: [
      (_instance: Perceptor, data: SpectatorResult) => {
        const surface = Math.round(data.subView ? data.subView.surface || 0 : 0);
        const isVisible = data.isVisible;
        const durationSec = ((data.duration || 0) / 1000).toFixed(1);

        if (target2Visibility) {
          target2Visibility.textContent = isVisible ? 'Visible' : 'Hidden';
          target2Visibility.className = `pill ${isVisible ? 'pill-online' : 'pill-offline'}`;
        }

        if (target2Surface) {
          target2Surface.textContent = `${surface}%`;
        }

        if (target2Progress) {
          target2Progress.style.width = `${Math.min(surface, 100)}%`;
        }

        if (target2Duration) {
          target2Duration.textContent = `${durationSec}s`;
        }
      }
    ]
  });

  // Start watching
  perceptorTarget2.watch();
}

// Page Focus / Blur Listeners
window.addEventListener('focus', () => {
  if (attentionStatus) {
    attentionStatus.textContent = 'Window Focused';
    attentionStatus.className = 'status-badge active';
  }
});

window.addEventListener('blur', () => {
  if (attentionStatus) {
    attentionStatus.textContent = 'Window Blurred';
    attentionStatus.className = 'status-badge inactive';
  }
});
