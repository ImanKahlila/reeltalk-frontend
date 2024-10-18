import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ListContent from '@/components/lists/ListContent';
import { getPopularSearches } from '@/services/api';
import { useUserContext } from '@/lib/context';
import MovieTile from '@/components/lists/MovieTile';
import { selectRecommendedLists } from '@/redux/selectors';
import { useSelector } from 'react-redux';

export interface Media {
  id: string;
  title: string;
  primaryImage:{
    url: string
  }
}

export default function RecommendedPage() {
  const recommendedLists  = useSelector(selectRecommendedLists);
  const { idToken } = useUserContext();
  const [popularSearches, setPopularSearches] = useState<Media[]>([]);

  useEffect(() => {
    const fetchPopularSearches = async () => {
        const data = await getPopularSearches(idToken);
        setPopularSearches(data);

    };
    fetchPopularSearches();
  }, [idToken]);

  return (
    <section className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col space-y-2 gap-4 lg:w-[1100px]">
        <div className="flex flex-row justify-start gap-4 text-high-emphasis text-3xl">
          <Link href={`/lists`}>
            <ChevronLeft className="mt-1" />
          </Link>
          <div>Recommended for you</div>
        </div>
        {/* Wraps recommended list and popular section */}
        <div className="flex flex-row gap-10">
          <div className="ml-10 flex flex-col w-2/3">
            <div className="text-high-emphasis text-2xl">
              <h1 className="mb-2">Today</h1>
            </div>
            <div className="gap-2">
              {recommendedLists.map((list, index) => (
                <ListContent key={index} list={list} index={index} />
              ))}
            </div>
          </div>
          <div className="bg-first-surface rounded-lg p-4 w-[320px] h-fit">
            <h1 className="text-high-emphasis text-lg mt-3">Popular movies / TV shows</h1>
              <div className="grid grid-cols-3 mb-3 text-medium-emphasis">
                {popularSearches
                  .filter((media) => media?.primaryImage?.url)
                  .slice(0, 6)
                  .map((media) => (
                    <div
                      className="p-1 flex flex-col items-center gap-1 m-1"
                      key={media.id}
                    >
                      <div className="rounded-lg overflow-hidden">
                        <MovieTile
                          imageUrl={media?.primaryImage?.url}
                          title={media.title}
                        />
                      </div>
                      <div
                        className="text-center justify-center w-3/4 text-pure-white text-sm">
                        <p className="line-clamp-3">{media.title}</p>
                      </div>
                    </div>
                  ))}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
