export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
}

const N8N_WEBHOOK_URL = 'https://energetic.app.n8n.cloud/webhook/c247b46e-148e-49d3-b1cf-04b63765dc3c/chat';
const N8N_INSTANCE_ID = '2f0c15313d44a080c1e914712c45616d5586de2f3198c5f3e19b4b41195ee69f';

export const getOrCreateChatSessionId = (): string => {
  try {
    let sid = localStorage.getItem('w2w_n8n_session_id');
    if (!sid) {
      sid = 'w2w_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('w2w_n8n_session_id', sid);
    }
    return sid;
  } catch {
    return 'w2w_session_' + Date.now();
  }
};

export async function sendN8nChatMessage(message: string, sessionId?: string): Promise<string> {
  const activeSessionId = sessionId || getOrCreateChatSessionId();
  const payload = {
    action: 'sendMessage',
    chatInput: message,
    sessionId: activeSessionId,
    metadata: {
      source: 'Waste2Worth Platform',
      clientTime: new Date().toISOString()
    }
  };

  // Attempt 1: Direct client request to n8n webhook
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Instance-Id': N8N_INSTANCE_ID
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.output === 'string') return data.output;
      if (data && typeof data.text === 'string') return data.text;
      if (data && typeof data.message === 'string' && data.message !== 'Error in workflow') return data.message;
      if (typeof data === 'string') return data;
    }
  } catch (directErr) {
    console.warn('Direct n8n webhook call failed, falling back to server proxy:', directErr);
  }

  // Attempt 2: Server-side proxy endpoint fallback
  try {
    const proxyRes = await fetch('/api/n8n/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data && typeof data.output === 'string') return data.output;
      if (data && typeof data.text === 'string') return data.text;
      if (data && typeof data.message === 'string') return data.message;
      if (typeof data === 'string') return data;
    }
  } catch (proxyErr) {
    console.error('Proxy call to n8n webhook also failed:', proxyErr);
  }

  throw new Error('Could not connect to the n8n assistant. Please verify network connectivity.');
}
