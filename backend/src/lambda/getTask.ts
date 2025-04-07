import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "shunyity_tech_solutions_db";

export const handler = async () => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };

        const data = await dynamo.scan(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ data: data.Items }),
        };
    } catch (error) {
        console.error("Error fetching tasks:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch tasks" }),
        };
    }
};