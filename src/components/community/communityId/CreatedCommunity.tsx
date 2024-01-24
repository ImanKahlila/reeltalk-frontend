import React from 'react';

// Components
import MobileView from '@/components/community/communityId/MobileView';
import DesktopView from '@/components/community/communityId/DesktopView';

import { ICommunityObject, ValidJoinRequestsData } from '@/pages/community/[communityId]';
import Header from './Header';

const CreatedCommunity = ({
  pageData,
  joinRequestsData,
}: {
  pageData: ICommunityObject;
  joinRequestsData: ValidJoinRequestsData | null;
}) => {
  return (
    <>
      <Header pageData={pageData} />
      <MobileView pageData={pageData} joinRequestsData={joinRequestsData} />
      <DesktopView pageData={pageData} joinRequestsData={joinRequestsData} />
    </>
  );
};

export default CreatedCommunity;
