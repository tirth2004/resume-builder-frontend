import { create } from 'zustand';
import DEFAULT_RESUME_JSON from '@/helpers/constants/resume-data.json';

interface ICurrentResumeStore {
  curResume: typeof DEFAULT_RESUME_JSON | null;
  setCurResume: (resume: typeof DEFAULT_RESUME_JSON) => void;
}

export const useCurrentResume = create<ICurrentResumeStore>((set) => ({
  curResume: null,
  setCurResume: (resume) => set({ curResume: resume }),
}));
