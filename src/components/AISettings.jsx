import { useState } from 'react';
import { AI_MODELS } from '../ai/generate.js';

/**
 * Modal for configuring optional AI Mode. The API key is the user's own
 * Anthropic key; it is held in memory and (optionally) localStorage on this
 * device, and is sent directly from the browser to the Anthropic API.
 */
export default function AISettings({ config, onClose, onSave }) {
  const [apiKey, setApiKey] = useState(config.apiKey || '');
  const [model, setModel] = useState(config.model || 'claude-opus-4-8');
  const [enabled, setEnabled] = useState(config.enabled || false);

  const canEnable = apiKey.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>AI Mode — Live Question Generation</h3>
          <button className="btn-mini" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="modal-intro">
          AI Mode lets the simulator generate fresh, exam-standard items on demand using the Claude
          API. It is fully optional — the built-in question bank works with no key. Your key is
          stored only on this device and sent directly from your browser to Anthropic.
        </p>

        <label className="field">
          <span>Anthropic API key</span>
          <input
            type="password"
            value={apiKey}
            placeholder="sk-ant-…"
            onChange={(e) => setApiKey(e.target.value)}
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span>Model</span>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            {AI_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field-check">
          <input
            type="checkbox"
            checked={enabled}
            disabled={!canEnable}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <span>
            Enable AI Mode {canEnable ? '' : '(enter a key first)'}
          </span>
        </label>

        <div className="modal-note">
          Note: browser-based API calls require the Anthropic{' '}
          <code>anthropic-dangerous-direct-browser-access</code> header (already handled). For
          shared or production deployments, route generation through a backend instead of exposing
          a key in the browser.
        </div>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={() => onSave({ apiKey: apiKey.trim(), model, enabled: enabled && canEnable })}
          >
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
}
