

import useCommunity from "../../Hook/useCommunity";
import LatestCommunityPost from "./LatestCommunityPost";


const LatestCommunity = () => {
	const { posts, isLoading, error, refetch} = useCommunity()
   
    return (
        <>
         <div className="text-center">
                <h1 className="text-4xl font-Prata font-bold mt-24" > Community Insights</h1>
                <p className="mt-2 mb-10 text-slate-500 ">Discover What's New: Stay informed with our Latest Community Posts section. Engage with diverse <br /> perspectives, updates, and discussions shaping our shared space..</p>
            </div>
        <div className="lg:grid mt-20 grid-cols-3  container mx-auto gap-5">
			{
				posts?.slice(0,6).map(post=><LatestCommunityPost key={post._id} post={post} refetch={refetch}></LatestCommunityPost>)
			}
        </div>
        </>
    );
};

export default LatestCommunity;