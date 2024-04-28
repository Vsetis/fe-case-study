import { object, string } from 'zod';

const useLoginFormValidation = () => {
    return object({
        email: string().email('Invalid email'),
        password: string().min(6, 'Password must be at least 6 characters long'),
    });
};

export default useLoginFormValidation;
