import PathDefinition from '@/routes/path-definition.ts';

const emptyPath = new PathDefinition('', () => '');
const home = new PathDefinition('/', () => '/');
const event = new PathDefinition('/event', () => '/event');
const eventInfo = new PathDefinition(
    `${event.path}/:eventId`,
    ({ eventId }: { eventId: string }) => `${event.path}/${eventId}`
);
const login = new PathDefinition('/login', () => '/login');
const register = new PathDefinition('/register', () => '/register');
const checkout = new PathDefinition('/checkout/:eventId', ({ eventId }: { eventId: string }) => `/checkout/${eventId}`);
const notFound = new PathDefinition('/not-found', () => '/not-found');

const paths = {
    emptyPath,
    event,
    eventInfo,
    checkout,
    home,
    login,
    register,
    notFound,
};

export default paths;
