function isFieldInObject<T, K extends keyof T>(obj: T, fields: K[] | K): obj is T {
    if (Array.isArray(fields)) {
        return obj && typeof obj === 'object' && fields.every((field) => field in obj);
    }
    return obj && typeof obj === 'object' && fields in obj;
}

export default isFieldInObject;
