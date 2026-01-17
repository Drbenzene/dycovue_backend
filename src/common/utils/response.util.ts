/**
 * Helper function to create a response with custom message
 * Useful when you want to override the default success message
 */
export function createResponse<T>(data: T, message?: string) {
    return {
        data,
        message,
    };
}

/**
 * Type for service responses that can optionally include a custom message
 */
export type ServiceResponse<T> = T | { data: T; message?: string };
