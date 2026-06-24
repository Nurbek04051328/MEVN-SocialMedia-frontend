import { useSelector } from "react-redux";
import type { FeedPostType } from "../../types/feed";
import type { RootState } from "../../store/store";
import  { useState } from "react";
import { toast } from "react-toastify";
import { toggleLikePost } from "../../api/like.api";
import { User } from "lucide-react"

interface FeedPostProps {
  post: FeedPostType;
}


const FeedPost = ({ post }: FeedPostProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [likes, setLikes] = useState<string[]>(post.likes);
  const [likesCount, setLikesCount] = useState<number>(post.likeCount);
  const [loading, setLoading] = useState(false);

  const isLikesByMe = user ? likes.includes(user._id) : false;

  const handleToggleLike = async () => {
    if(!user) {
      toast.error("Please login to like the post");
    }

    try {
      setLoading(true);
      if(isLikesByMe) {
        setLikes((prev) => prev.filter((id) => id  !== user._id));
        setLikesCount((prev) => prev - 1)
      } else {
        setLikes((prev) => [...prev, user._id]);
        setLikesCount((prev) => prev + 1);
      }

      await toggleLikePost(post._id)
    } catch (error: any) {
      toast.error(error.message);
      if(isLikesByMe) {
        setLikes((prev) => [...prev, user._id]);
        setLikesCount((prev) => prev + 1)
      } else {
        setLikes((prev) => prev.filter((id) => id  !== user._id));
        setLikesCount((prev) => prev - 1);
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <section className='min-w-[60vw] md:px:32 md:py-8'>
      <div className="post-container flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          {user?.profileImage? (
            <img 
              className="w-8 aspect-square rounded-full object-cover" 
              src={post.owner.profileImage} 
              alt="post-owner-image" 
            />
          ) : (
            <User className="text-white"/>
          )}
          <span className="text-white">{post.owner.username}</span>
        </div>
        <span className="text-xs text-white/60">
          {new Date(post.createdAt).toLocaleString()}
        </span>
        {post.image && (
          <div className="mg:my-2">
            <img 
              className="aspect-auto"
              src={post.image.url} 
              alt="post-image" 
            />
          </div>
        )}
        <div className="post-content text-white">
          <p>{post.content}</p>
        </div>
      </div>
    </section>
  )
}

export default FeedPost
