import React from 'react';
import { Box } from '@mui/material';
// import LoadingProgress from '../components/LoadingProgress';
import { useNavigate } from 'react-router-dom';
// import { getLoggedSessionStatus } from '../login/services';
// import { SITE_LOGO } from '../constant';

export default function InitLoadingPage() {
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   // if authenticated / login then push to Home page
  //   if (getLoggedSessionStatus()) {
  //     navigate('/Home', { replace: true });
  //   } else {
  //     navigate('/login', { replace: true });
  //   }
  // }, []);
  return (
    <Box className="w-full h-screen flex flex-col justify-center items-center">
      <Box className="w-[200px] mb-3">
        {/* <img src={SITE_LOGO} width="100%" /> */}
      </Box>
      {/* <LoadingProgress color="info" size="small" /> */}
    </Box>
  );
}
