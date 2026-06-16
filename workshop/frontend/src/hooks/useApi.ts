const API_BASE = '/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export interface Participant {
  id: number;
  name: string;
  team: string;
  score: number;
  completedExercises: number;
}

export const api = {
  async register(name: string, team: string): Promise<Participant> {
    return fetchJson('/participants', {
      method: 'POST',
      body: JSON.stringify({ name, team }),
    });
  },

  async getParticipants(): Promise<Participant[]> {
    return fetchJson('/participants');
  },

  async completeExercise(participantId: number, moduleId: string, exerciseIndex: number): Promise<void> {
    await fetchJson('/progress', {
      method: 'POST',
      body: JSON.stringify({ participantId, moduleId, exerciseIndex }),
    });
  },

  async getLeaderboard(): Promise<Participant[]> {
    return fetchJson('/leaderboard');
  },

  async addScore(participantId: number, points: number): Promise<void> {
    await fetchJson('/score', {
      method: 'POST',
      body: JSON.stringify({ participantId, points }),
    });
  },
};
