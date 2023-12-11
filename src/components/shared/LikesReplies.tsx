import LikeIcon from '@/components/Icons/likeIcon';
import MessageBubbleIcon from '@/components/Icons/messageBubbleIcon';

interface LikesReplies {
  likes: number;
  replies: number;
}

export default function LikesReplies({ likes, replies }: LikesReplies) {
  return (
    <div className='flex h-4 items-center gap-3 text-xs text-white/[0.6]'>
      <div className='flex items-center gap-1'>
        <LikeIcon />
        {likes} likes
      </div>
      <div className='flex items-center gap-1'>
        <MessageBubbleIcon />
        <div>{replies} replies</div>
      </div>
    </div>
  );
}
