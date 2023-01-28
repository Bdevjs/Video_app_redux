import { useEffect } from "react";
import VideoGridItem from "./VideoGridItem";
import { useDispatch, useSelector } from "react-redux";
import { fatchVideos } from "../../features/videos/videosSlice";
import Loading from "../ui/Loading";

export default function VideGrid() {

const dispatch = useDispatch();

    const { videos,isLoading,isError,error } = useSelector(
        (state) => state.videos
    );

    useEffect(()=>{
        dispatch(fatchVideos());
    }, [dispatch]);


let contents;

if(isLoading) contents = <Loading/>
if(!isLoading && isError) {
    contents = <div className="col-span-12">{error}</div>}

if(!isError && !isLoading && videos?.length > 0){
    contents = videos.map((video) => (
        <VideoGridItem key={video.id} video={video}/>

    ));
}

    return (
        <section className="pt-12">
            <section className="pt-12">
                <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
                    {contents}
                </div>
            </section>
        </section>
    );
}
