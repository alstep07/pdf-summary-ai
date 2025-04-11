import { create } from "zustand";
import Cookies from "js-cookie";

interface HistoryItem {
  fileName: string;
  summary: string;
  timestamp: number;
}

interface HistoryState {
  history: HistoryItem[];
  addToHistory: (fileName: string, summary: string) => void;
  clearHistory: () => void;
}

const HISTORY_COOKIE_NAME = "pdf_summary_history";
const MAX_HISTORY_ITEMS = 5;

const loadHistory = (): HistoryItem[] => {
  const cookie = Cookies.get(HISTORY_COOKIE_NAME);
  return cookie ? JSON.parse(cookie) : [];
};

const saveHistory = (history: HistoryItem[]) => {
  Cookies.set(HISTORY_COOKIE_NAME, JSON.stringify(history), { expires: 30 }); // Expires in 30 days
};

export const useHistoryStore = create<HistoryState>((set) => ({
  history: loadHistory(),
  addToHistory: (fileName: string, summary: string) => {
    set((state) => {
      const newHistory = [
        { fileName, summary, timestamp: Date.now() },
        ...state.history,
      ].slice(0, MAX_HISTORY_ITEMS);
      saveHistory(newHistory);
      return { history: newHistory };
    });
  },
  clearHistory: () => {
    set({ history: [] });
    Cookies.remove(HISTORY_COOKIE_NAME);
  },
}));
