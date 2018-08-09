export interface ServerResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: {[key: string]: T};
    errors?: { [key: string]: T };
}