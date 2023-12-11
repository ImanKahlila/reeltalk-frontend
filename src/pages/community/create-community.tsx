import React from 'react';
import CreateCommunity from '@/components/community/create-community/CreateCommunity';

// util
import { useUserContext } from '@/lib/context';

// Hooks
import { useAuthRequired } from '@/hooks/routeProtection';

const CreateCommunityPage = () => {
  const { user } = useUserContext();
  useAuthRequired();
  if (!user) return;
  return (
    <section className='mx-auto max-w-[904px] p-4 md:pt-[40px] lg:px-0'>
      <CreateCommunity user={user} />
    </section>
  );
};

export default CreateCommunityPage;
