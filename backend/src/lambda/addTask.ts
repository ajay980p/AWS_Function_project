import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamo = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "shunyity_tech_solutions_db";

export const handler = async (event: any) => {
    try {
        const id = uuidv4();

        // ✅ Fix: parse the incoming body from API Gateway
        const body = JSON.parse(event.body);
        const title = body.title;

        const params = {
            TableName: TABLE_NAME,
            Item: { id, title }
        };

        await dynamo.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ id, title }),
        };
    } catch (error) {
        console.error("Error adding task:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to add task' }),
        };
    }
};