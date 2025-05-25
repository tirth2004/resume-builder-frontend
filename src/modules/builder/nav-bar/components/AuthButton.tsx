import { useEffect, useState } from 'react';
import { StyledButton } from '@/modules/builder/nav-bar/atoms/StyledButton';
import { NavMenuPopover } from './NavMenuPopover';
import { useCurrentResume } from '@/stores/useCurrentResume';
import DEFAULT_RESUME_JSON from '@/helpers/constants/resume-data.json';
import tirth1 from '@/test_json/Tirth_1.json';
import tirth2 from '@/test_json/Tirth_2.json';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';
import { useActivity } from '@/stores/activity';
import { useAwards } from '@/stores/awards';
import { useBasicDetails } from '@/stores/basic';
import { useEducations } from '@/stores/education';
import { useExperiences } from '@/stores/experience';
import { useVoluteeringStore } from '@/stores/volunteering';

type ResumeData = typeof DEFAULT_RESUME_JSON;

const updateAllStores = (resume: ResumeData) => {
  // Update basic details
  useBasicDetails.getState().reset(resume.basics);

  // Update skills
  useLanguages.getState().reset(resume.skills.languages);
  useFrameworks.getState().reset(resume.skills.frameworks);
  useLibraries.getState().reset(resume.skills.libraries);
  useDatabases.getState().reset(resume.skills.databases);
  useTechnologies.getState().reset(resume.skills.technologies);
  usePractices.getState().reset(resume.skills.practices);
  useTools.getState().reset(resume.skills.tools);

  // Update other sections
  useExperiences.getState().reset(resume.work);
  useEducations.getState().reset(resume.education);
  useVoluteeringStore.getState().reset(resume.volunteer);
  useAwards.getState().reset(resume.awards);
  useActivity.getState().reset(resume.activities);
};

export const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { setCurResume } = useCurrentResume();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      // Set default resume on login
      updateAllStores(DEFAULT_RESUME_JSON);
      setCurResume(DEFAULT_RESUME_JSON);
    }
  }, [setCurResume]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      console.log('Login clicked - to be implemented');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResumeSelect = (resume: ResumeData) => {
    console.log('Loading resume:', resume.basics.name);
    updateAllStores(resume);
    setCurResume(resume);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken(null);
    updateAllStores(DEFAULT_RESUME_JSON);
    setCurResume(DEFAULT_RESUME_JSON);
    handleClose();
  };

  return (
    <>
      <StyledButton
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {isLoggedIn ? token : 'Login'}
        {isLoggedIn && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </StyledButton>
      <NavMenuPopover
        isOpen={Boolean(anchorEl)}
        anchorElement={anchorEl}
        onClose={handleClose}
        id="auth-menu"
      >
        <div style={{ padding: '8px' }}>
          <StyledButton
            onClick={() => handleResumeSelect(tirth1 as ResumeData)}
            sx={{ width: '100%', justifyContent: 'flex-start', mb: 1 }}
          >
            {tirth1.basics.name}
          </StyledButton>
          <StyledButton
            onClick={() => handleResumeSelect(tirth2 as ResumeData)}
            sx={{ width: '100%', justifyContent: 'flex-start', mb: 1 }}
          >
            {tirth2.basics.name}
          </StyledButton>
          <StyledButton onClick={handleLogout} sx={{ width: '100%', justifyContent: 'flex-start' }}>
            Logout
          </StyledButton>
        </div>
      </NavMenuPopover>
    </>
  );
};
