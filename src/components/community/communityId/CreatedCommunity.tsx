// import React from 'react';

// // Components
// import MobileView from '@/components/community/communityId/MobileView';
// import DesktopView from '@/components/community/communityId/DesktopView';

// import { ICommunityObject, ValidJoinRequestsData } from '@/pages/community/[communityId]';
// import Header from './Header';

// interface CreatedCommunityProps {
//   pageData: ICommunityObject;
//   joinRequestsData: ValidJoinRequestsData | null;
//   discussions: any[]; // Update this line with the correct type for discussions
// }

// interface Discussion {
//   discussionId: string;
//   //   content: string;
//   userId: string;
//   createAt: any; // Use 'any' for now; replace it with your specific type if needed
//   likes: string[];
//   comments: string[];
//   communityBelonged: string;
//   tagged: string[];
// }

// const CreatedCommunity: React.FC<CreatedCommunityProps> = ({
//   pageData,
//   joinRequestsData,
//   discussions,
// }) => {
//   return (
//     <>
//       <Header pageData={pageData} />
//       <MobileView
//         pageData={pageData}
//         joinRequestsData={joinRequestsData}
//         discussions={discussions}
//       />
//       <DesktopView
//         pageData={pageData}
//         joinRequestsData={joinRequestsData}
//         discussions={discussions}
//       />
//     </>
//   );
// };

// export default CreatedCommunity;

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
