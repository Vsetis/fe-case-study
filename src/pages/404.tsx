import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths.ts';

function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-max m-auto">
            <h1 className="text-4xl font-medium text-center mb-12">404 - Page not found</h1>
            <Button size="lg" onClick={() => navigate(paths.home.path)}>
                Back to the Home
            </Button>
        </div>
    );
}

export default PageNotFound;
