import React from 'react';

// Components
import MobileMainContent from '@/components/community/communityId/MobileMainContent';
import DesktopMainContent from '@/components/community/communityId/DesktopMainContent';

import { IPageData } from '@/pages/community/[communityId]';
import Header from './Header';

const CreatedCommunity = ({ pageData }: { pageData: IPageData }) => {
  return (
    <>
      <Header pageData={pageData} />
      <MobileMainContent pageData={pageData} />
      <DesktopMainContent pageData={pageData} />
    </>
  );
};

export default CreatedCommunity;
