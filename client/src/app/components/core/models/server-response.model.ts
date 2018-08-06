export interface ServerResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data?: object;
    errors?: { string };
}