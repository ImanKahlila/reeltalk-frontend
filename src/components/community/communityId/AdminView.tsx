import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { ITabsMobileProps } from './MobileView';
import { useRouter } from 'next/router';
import axios from 'axios';
import Spinner from '@/components/shared/Spinner';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ValidJoinRequestsData } from '@/pages/community/[communityId]';

import { useUserContext } from '@/lib/context';

const AdminView = ({
  pageData,
  joinRequestsData,
  className,
}: {
  pageData: ITabsMobileProps['pageData'];
  joinRequestsData: ValidJoinRequestsData | null;
  className?: string;
}) => {
  const [joinRequestState, setJoinRequestState] = useState<any>(joinRequestsData);
  function removeRequest(userId: string) {
    setJoinRequestState((prev: any) => {
      if (!prev) return;
      let newState = [...prev].filter(value => value.userId !== userId);
      return newState;
    });
  }

  return (
    <Tabs
      defaultValue='posts'
      className={cn('mx-auto mt-4 w-full max-w-lg md:max-w-none', className)}
    >
      <TabsList className='relative bg-transparent font-normal text-disabled'>
        <TabsTrigger value='posts'>Activity</TabsTrigger>
        <TabsTrigger value='about'>About</TabsTrigger>
        <TabsTrigger className='relative' value='members'>
          <div>Members</div>
          <div
            className={cn(
              'absolute right-1 top-3 h-2 w-2 rounded-full bg-primary transition-all duration-300',
              joinRequestState?.length || 0 > 0 ? '' : 'opacity-0',
            )}
          />
        </TabsTrigger>
      </TabsList>
      <TabsContent className='mt-4' value='posts'>
        activity
      </TabsContent>
      <TabsContent value='about' className='mt-4'>
        about
      </TabsContent>
      <TabsContent value='members' className='mt-4'>
        {pageData.isPublic ? null : (
          <Accordian joinRequests={joinRequestState} removeRequestHandler={removeRequest} />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AdminView;

function Accordian({
  joinRequests,
  removeRequestHandler,
}: {
  joinRequests: ValidJoinRequestsData | null;
  removeRequestHandler: (userId: string) => void;
}) {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1' className='border-second-surface'>
        <AccordionTrigger className='text-pure-white md:text-xl'>
          <div className='flex gap-2'>
            <span>Requests {joinRequests?.length}</span>
            <div
              className={cn(
                'h-2 w-2 rounded-full bg-primary transition-all duration-300',
                joinRequests?.length || 0 > 0 ? '' : 'opacity-0',
              )}
            />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-col gap-4'>
            {joinRequests?.map((request: any) => (
              <Request
                key={request.userId}
                requestedUserId={request.userId}
                displayName={request.displayName}
                removeRequestHandler={removeRequestHandler}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function Request({
  displayName,
  requestedUserId,
  removeRequestHandler,
}: {
  displayName: string;
  requestedUserId: string;
  removeRequestHandler: (userId: string) => void;
}) {
  const { query } = useRouter();
  const { communityId } = query;
  const { idToken } = useUserContext();

  const [acceptLoaderState, setAcceptLoaderState] = useState(false);
  const [declineLoaderState, setDeclineLoaderState] = useState(false);

  async function requestActionHandler(request: string, action: boolean) {
    if (action) {
      setAcceptLoaderState(true);
    } else {
      setDeclineLoaderState(true);
    }

    try {
      await axios.post(
        `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityId}/pendingRequest`,
        // `http://localhost:8080/communities/${communityId}/pendingRequest`,
        { action: action, requestedUserId: request },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        },
      );
    } catch (error: any) {
      console.log(error.message);
    } finally {
      if (action) {
        setAcceptLoaderState(false);
      } else {
        setDeclineLoaderState(false);
      }
      removeRequestHandler(request);
    }
  }
  return (
    <div className='flex flex-col gap-3 md:max-w-[376px] md:gap-4'>
      <div className='flex gap-2 md:gap-4'>
        <div className='h-6 w-6 rounded-full border md:h-[30px] md:w-[30px]'></div>
        <p className='md:text-base'>
          <span className='font-semibold text-high-emphasis'>{displayName}</span>
          <span className='text-medium-emphasis'> is asking to join</span>
        </p>
      </div>
      <div className='flex gap-2 text-sm font-medium text-secondary md:gap-10 md:text-base'>
        <button
          disabled={declineLoaderState}
          onClick={() => requestActionHandler(requestedUserId, true)}
          className='flex w-full items-center justify-center rounded-[8px] bg-primary px-4 py-2 disabled:opacity-10 md:h-12'
        >
          {acceptLoaderState ? <Spinner /> : 'Accept'}
        </button>
        <button
          disabled={acceptLoaderState}
          onClick={() => requestActionHandler(requestedUserId, false)}
          className='flex w-full items-center justify-center rounded-[8px] bg-high-emphasis px-4 py-2 disabled:opacity-10 md:h-12'
        >
          {declineLoaderState ? <Spinner /> : 'Decline'}
        </button>
      </div>
    </div>
  );
}
