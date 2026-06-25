import Spinner from "../components/General/Spinner";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Navbar from "../components/General/Navbar";
import SideBar from "../components/General/SideBar";
import ChatBar from "../components/General/ChatBar";
import { toast } from 'react-toastify';
import { getFeedPosts } from "../api/feed.api";
import type { FeedPostType } from "../types/feed";
import FeedPost from "../components/FeedPageComponent/FeedPost";

const FeedPage = () => {
  const { loading } = useSelector((state: RootState) => state.auth);
  const [ serverError, setServerError ] = useState<string | null>(null);
  const [ feedPosts, setFeedPosts ] = useState<FeedPostType[]>([]);
  const [ loadingPosts, setLoadingPosts ] = useState(true)

  useEffect(() => { 
    const getPosts = async() => {
      try {
        const response = await getFeedPosts();
        console.log("posts", response);
        
        setFeedPosts(response.data);
      } catch (error:any) {
        setServerError(error.message);
        toast.error(error.message ||  "Failed to load feed")
      } finally {
        setLoadingPosts(false);
      }
    }
    getPosts();
  }, []);
  

  if(loading) {
    return (
      <Spinner/>
    )
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto px-4">
          {loadingPosts ? (
            <Spinner />
          ) : feedPosts.length === 0 ? (
            <p className="text-white">No posts found</p>
          ) : (
            feedPosts.map((feedPost) => (
              <FeedPost key={feedPost._id} post={feedPost}/>
            ))
          )}
        </div>
        <ChatBar />
      </div>
    </div>
  )
}

export default FeedPage
