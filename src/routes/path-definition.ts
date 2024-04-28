import { PathRouteProps } from 'react-router-dom';

type GenerateFn<T> = T extends void ? () => string : (params: T) => string;

export default class PathDefinition<T = void> {
    public readonly generate: GenerateFn<T>;

    public readonly path: Exclude<PathRouteProps['path'], undefined>;

    public readonly fullPath: GenerateFn<void>;

    constructor(path: Exclude<PathRouteProps['path'], undefined>, generate: GenerateFn<T>, fullPath = () => path) {
        this.path = path;
        this.generate = generate;
        this.fullPath = fullPath;
    }
}
