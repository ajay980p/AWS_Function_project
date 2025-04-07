import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "shunyity_tech_solutions_db";

export const handler = async (event: any) => {
    try {
        // ✅ Get path param from API Gateway
        const id = event.pathParameters?.id;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Task ID is required" }),
            };
        }

        const params = {
            TableName: TABLE_NAME,
            Key: { id },
        };

        await dynamo.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ id }),
        };
    } catch (error) {
        console.error("Error deleting task:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete task" }),
        };
    }
};