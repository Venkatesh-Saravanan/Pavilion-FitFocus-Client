
import CommunityPost from "./CommunityPost";
import useCommunity from "../../Hook/useCommunity";


const Community = () => {
	const { posts, isLoading, error, refetch} = useCommunity()
   
    return (
        <div className="lg:grid mt-20 grid-cols-3 container mx-auto gap-5">
			{
				posts?.map(post=><CommunityPost key={post._id} post={post} refetch={refetch}></CommunityPost>)
			}
        </div>
    );
};

export default Community;