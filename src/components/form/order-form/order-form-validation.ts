import { object, string } from 'zod';

const useOrderFormValidation = () => {
    return object({
        email: string().email('Invalid email'),
        firstName: string().min(2, 'First name must be at least 2 characters long'),
        lastName: string().min(2, 'Last name must be at least 2 characters long'),
    });
};

export default useOrderFormValidation;
