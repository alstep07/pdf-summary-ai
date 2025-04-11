import { create } from "zustand";

interface PDFState {
  file: File | null;
  isLoading: boolean;
  metadata: {
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    version: string;
  } | null;
  text: string | null;
  summary: string | null;
  setFile: (file: File | null) => void;
  setLoading: (isLoading: boolean) => void;
  setPDFData: (data: {
    metadata?: PDFState["metadata"] | null;
    text?: string | null;
    summary: string;
  }) => void;
  reset: () => void;
}

const initialState = {
  file: null,
  isLoading: false,
  metadata: null,
  text: null,
  summary: null,
};

export const usePDFStore = create<PDFState>((set) => ({
  ...initialState,
  setFile: (file) => set({ file }),
  setLoading: (isLoading) => set({ isLoading }),
  setPDFData: (data) =>
    set({
      metadata: data.metadata ?? null,
      text: data.text ?? null,
      summary: data.summary,
    }),
  reset: () => set(initialState),
}));
