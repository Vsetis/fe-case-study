import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths.ts';
import video from '@/assets/event-video.mp4';
function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
            <div className="flex flex-col mt-12 items-center w-max m-auto">
                <h1 className="text-5xl font-medium max-w-md text-center text-transparent bg-gradient-to-b from-black/80 to-black/40 bg-clip-text mb-6">
                    Experience countless experiences with Event Portal!
                </h1>
                <p className="mb-8 text-2xl font-medium text-black/60">Explore our events!</p>
                <Button onClick={() => navigate(paths.event.path)} className="mb-16 flex gap-2" size="lg">
                    Explore
                </Button>
                <video
                    className="mix-blend-overlay rounded-md brightness-50"
                    width="500"
                    loop={true}
                    muted={true}
                    autoPlay={true}
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support HTML video.
                </video>
            </div>
        </div>
    );
}

export default HomePage;
