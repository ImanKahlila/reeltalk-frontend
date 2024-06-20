import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/context';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TopUserMovies from '@/components/profile/TopUserMovies';
import TopUserShows from '@/components/profile/TopUserShows';
import CheckIconSVG from '@/components/Icons/CheckIcon';
import axios from 'axios';

export const AboutMe = ({ userId }: any) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, idToken } = useUserContext();
  const AchievementCriteria = [
    { level: "Reel Apprentice", icon: "🎒", requirements: ["Select top genres", "Select top 5 movies","Select top 5 shows"] , reward: 0 },
    { level: "Reel Enthusiast", icon: "🍿", requirements: ["Add a Profile Pic"], reward: 0  },
    { level: "Reel Buff", icon: "🎞️", requirements: ["Add a Bio"], reward: 10 },
    { level: "Reel Addict", icon: "🔥", requirements: ["Join a discussion", "Review a movie / TV Show"], reward: 25 },
    { level: "Reel Fanatic", icon: "❤️‍🔥", requirements: ["Rate 10" +
      " Movies/Shows"], reward: 40 },
    { level: "Reel Fiend", icon: "📽️", requirements: ["Review 10 Movies/Shows"], reward: 50 },
    { level: "Reel Aficionado", icon: "🎥", requirements: ["Join 10 Communities"], reward: 75 },
    { level: "Reel Cinephile", icon: "🎬", requirements: ["Start 10 Discussions"], reward: 125 },
    { level: "Reel Connoisseur", icon: "🎖️", requirements: ["Rate 50 Movies/Shows"], reward: 175 },
    { level: "Reel Virtuoso", icon: "🏅", requirements: ["Review 50 Movies/Shows"], reward: 250 },
    { level: "Reel Savant", icon: "🏆", requirements: ["Start 20 Discussions", "Amass 100 Ratings"], reward: 1000 },
  ];


  const ProfileAchievements = () => {
    const [userAchievements, setUserAchievements] = useState<any>([]);
    const [profileStrength, setProfileStrength] = useState("Novice");
    const [nextLevel, setNextLevel] = useState<any>();
    const [strengthPercentage, setStrengthPercentage] = useState(0);
    const [currentRequirementIndex, setCurrentRequirementIndex] = useState(0);
    const [isAllRequirementMet, setIsAllRequirementMet] = useState(false);
    useEffect(() => {
      if (!userInfo) return;

      const achieved: any[] = [];
      let strength = "Novice";
      let percentage = 0;
      let nextReqIndex = 0;

      for (let i = 0; i < AchievementCriteria.length; i++) {
        const criteria = AchievementCriteria[i];
        if (userInfo.profileLevel === criteria.level) {
          for (let j = 0; j <= i; j++) {
            achieved.push(AchievementCriteria[j]);
          }
          strength = criteria.level;
          percentage = ((i + 1) / AchievementCriteria.length) * 100;
          nextReqIndex = achieved.length === AchievementCriteria.length?i: i + 1;
          break;
        }
      }
      setUserAchievements(achieved);
      setProfileStrength(strength);
      setStrengthPercentage(percentage);
      setCurrentRequirementIndex(nextReqIndex);

      if (nextReqIndex < AchievementCriteria.length) {
        setNextLevel(AchievementCriteria[nextReqIndex]);
      }
      setIsAllRequirementMet(AchievementCriteria.every(criteria =>
        criteria.requirements.every(requirement => checkRequirement(userInfo, requirement))));
    }, [userInfo]);

    const nextRequirement = () => {
      if (currentRequirementIndex < AchievementCriteria.length-1 ) {
        setCurrentRequirementIndex(currentRequirementIndex + 1);
        setNextLevel(AchievementCriteria[currentRequirementIndex + 1]);
      }
    };

    const prevRequirement = () => {
      if (currentRequirementIndex > 0) {
        setCurrentRequirementIndex(currentRequirementIndex - 1);
        setNextLevel(AchievementCriteria[currentRequirementIndex - 1]);
      }
    };

    return (
      <div className="mx-10 p-4 flex flex-col h-full">
        <div className="flex-grow">
          <h2 className="mt-2 text-xl text-high-emphasis">
            My Achievements ({userAchievements.length}/{AchievementCriteria.length})
          </h2>
          <div className="mt-2 flex tracking-eight text-sm">
            <div className="text-neutral-400 mr-2 text-disabled">Profile Strength:</div>
            <div className="text-pure-white">
              {profileStrength} <span className="ml-1"> {AchievementCriteria.find(ac => ac.level === profileStrength)?.icon}</span>
            </div>
          </div>
          {nextLevel && (
            <>
              <div className="next-level text-medium-emphasis">
                <div className="mt-2 mb-2 profile-strength-bar">
                  <div className="profile-strength-fill" style={{ width: `${strengthPercentage}%` }}></div>
                  {AchievementCriteria.map((criteria, index) => (
                    <div key={index} className={`profile-strength-divider ${index < userAchievements.length ? 'filled' : ''}`}></div>
                  ))}
                </div>
                <div className="profile-strength-diamonds">
                  {userAchievements.length==AchievementCriteria.length ? (
                    <div className="relative">🎉</div>
                  ) : (
                    AchievementCriteria.map((criteria, index) => (
                      <p key={index} className={`diamond justify-items-end ${criteria.reward > 0 && index >= userAchievements.length ? 'show' : 'hidden'}`}>
                        {criteria.reward > 0 && index >= userAchievements.length && (
                          <>
                            <span role="img" aria-label="diamond">💎</span>
                            <span className="reward">+{criteria.reward}</span>
                          </>
                        )}
                      </p>
                    ))
                  )}
                </div>
                {isAllRequirementMet? (
                  <div className="next-level-text">
                    <p>Congrats! you did it.</p>
                  </div>
                ) : (
                  <div className="flex items-center text-sm">
                  <span className="mt-2 font-thin">
                    Level up to <span className="pl-1 font-semibold">{nextLevel.level}</span>
                    <span className="pl-1">{nextLevel.icon}</span>
                  </span>
                  </div>
                )}
                <ul className="text-medium-emphasis mt-3 list-disc list-inside">
                  {nextLevel.requirements.map((req: string, index: number) => (
                    <li key={index} className="mt-2 flex items-center text-left">
                      <CheckIconSVG className="mr-2" checked={isRequirementMet(req)} />
                      <span className={isRequirementMet(req) ? 'line-through text-disabled' : ''}>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center text-sm text-high-emphasis mt-3">
        <span onClick={prevRequirement}>
          <ChevronLeft className={`cursor-pointer ${currentRequirementIndex === 0 ? 'text-disabled' : ''}`} />
        </span>
          <span className="mx-2">
          {currentRequirementIndex+1}/{AchievementCriteria.length}
        </span>
          <span onClick={nextRequirement}>
          <ChevronRight className={`cursor-pointer ${currentRequirementIndex === AchievementCriteria.length - 1 ? 'text-disabled' : ''}`} />
        </span>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
          // `http://localhost:8080/api/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        const userData = response.data.data;
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, idToken]);
  const isRequirementMet = (requirement: string) => {
    return checkRequirement(userInfo, requirement);
  };
  const checkRequirement = (userInfo: any, requirement: string) => {
    if (!userInfo) {
      return false;
    }
    switch (requirement) {
      case "Select top genres":
        return userInfo.favoriteGenres && userInfo.favoriteGenres.length > 0;
      case "Select top 5 movies":
        return userInfo.favoriteMovies && userInfo.favoriteMovies.length >= 5;
      case "Select top 5 shows":
      return userInfo.favoriteShows && userInfo.favoriteShows.length >= 5;
      case "Add a Profile Pic":
        return Boolean(userInfo?.imageUrl);
      case "Add a Bio":
        return Boolean(userInfo.bio);
      case "Join a discussion":
        return userInfo.createdDiscussions && userInfo.createdDiscussions.length > 0;
      case "Review a movie / TV Show":
        return userInfo.reviews && userInfo.reviews.length > 0;
      case "Rate 10 Movies/Shows":
        return userInfo.ratings && userInfo.ratings.length >= 10;
      case "Review 10 Movies/Shows":
        return userInfo.reviews && userInfo.reviews.length >= 10;
      case "Join 10 Communities":
        return userInfo.joinedCommunities && Object.keys(userInfo.joinedCommunities).length >= 10;
      case "Start 10 Discussions":
        return userInfo.createdDiscussions && userInfo.createdDiscussions.length >= 10;
      case "Rate 50 Movies/Shows":
        return userInfo.ratings && userInfo.ratings.length >= 50;
      case "Review 50 Movies/Shows":
        return userInfo.reviews && userInfo.reviews.length >= 50;
      case "Start 20 Discussions":
        return userInfo.createdDiscussions && userInfo.createdDiscussions.length >= 20;
      case "Amass 100 Ratings":
        return userInfo.ratings && userInfo.ratings.length >= 100;

      default:
        return false;
    }
  };
  return (
    <div className='mx-auto flex max-w-[343px] flex-col gap-6 md:max-w-none md:flex-row md:gap-[20px] lg:gap-[40px]'>
      {isLoading ? (
        <Skeleton className='w-full' />
      ) : (
        <>
          <div className='flex w-full flex-col gap-4 rounded-[8px]'>
            <div className='flex w-full flex-col rounded-[8px] bg-first-surface'>
                <ProfileAchievements/>
            </div>

            <div
              className="flex text-medium-emphasis w-full justify-between gap-4 rounded-[8px] bg-first-surface px-4 py-4">
              <p className="mx-10 ">Your Screen Gems <span
                className="ml-2 text-primary">ⓘ</span></p>
              <p className="pr-24 font-medium">{userInfo?.gems || 10}💎</p>
            </div>
          </div>

          <div className='w-full max-w-[372px]'>
            <div className='mb-8'>
              <div className='mb-8'>
                <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>
                  Favorite genres
                </h2>
                <p className='mb-2 tracking-eight text-medium-emphasis'>
                  {userInfo?.favoriteGenres?.[0]?.name}, {userInfo?.favoriteGenres?.[1]?.name}, and{' '}
                  {userInfo?.favoriteGenres?.[2]?.name}
                </p>
              </div>

              <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>Top 5 Movies</h2>
              <div className='flex space-x-2'>
                {userInfo?.favoriteMovies?.map((movie: any) => (
                  <TopUserMovies key={movie?.id} poster={movie?.primaryImage?.url} />
                ))}
              </div>

              <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>Top 5 TV shows</h2>
              <div className='flex space-x-2'>
                {userInfo?.favoriteShows?.map((show: any) => (
                  <TopUserShows key={show?.id} poster={show?.primaryImage?.url} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};