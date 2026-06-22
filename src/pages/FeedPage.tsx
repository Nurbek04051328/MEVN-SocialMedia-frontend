import Spinner from "../components/General/Spinner";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Navbar from "../components/General/Navbar";
import SideBar from "../components/General/SideBar";
import ChatBar from "../components/General/ChatBar";
import FeedSection from "../components/FeedPageComponent/FeedSection";
import { toast } from 'react-toastify';
import { getFeedPosts } from "../api/feed.api";
import type { FeedPost } from "../types/feed";

const FeedPage = () => {
  const { loading } = useSelector((state: RootState) => state.auth);
  const [ serverError, setServerError ] = useState<string | null>(null);
  const [ feedPosts, setFeedPosts ] = useState<FeedPost[]>([]);
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
    <div className="min-h-screen">
      <Navbar />
      <div className="container flex">
        <SideBar />
          {loadingPosts ? (
            <Spinner />
          ) : feedPosts.length === 0 ? (
            <p className="text-white">No posts found</p>
          ) : (
            feedPosts.map((feedPost) => (
              <FeedSection key={feedPost._id} post={feedPost}/>
            ))
          )}
        <ChatBar />
      </div>
    </div>
  )
}

export default FeedPage
