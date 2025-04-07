# Full-Stack Application with React, Node.js, and AWS Lambda 🚀

### 🔗 Hosted URL: [https://loquacious-wisp-7687af.netlify.app/](https://loquacious-wisp-7687af.netlify.app/) ✅  
### 📦 GitHub Repository: [https://github.com/ajay980p/AWS_Function_project.git](https://github.com/ajay980p/AWS_Function_project.git)

This is a full-stack task management application built with **React (TypeScript)** for the frontend and **Node.js (TypeScript)** for the backend. It uses **Auth0** for user authentication and integrates **AWS Lambda**, **API Gateway**, and **DynamoDB** for serverless backend functionality.

---

## 🔧 Features

### ✅ Frontend (React + TypeScript)
- **Authentication:** Auth0 is used to securely log in users.
- **Add Task:** Authenticated users can add a new task by entering a title.
- **View Tasks:** Tasks are displayed in a tabular format.
- **Delete Task:** Users can delete any task from the list.

### ⚙️ Backend (Node.js + TypeScript)
- Built using **Express.js**
- Defines API endpoints:
  - `GET /tasks` – Get all tasks
  - `POST /tasks` – Add a task
  - `DELETE /tasks/:id` – Delete a task by ID
- Each endpoint invokes AWS Lambda functions:
  - `addTaskFunction`
  - `getTaskFunction`
  - `deleteTaskFunction`
- **Functional Testing:** Backend uses **Jest** for testing Lambda services and route handlers.

---

## ☁️ AWS Integration

- **Lambda Functions**:
  - `addTaskFunction`: Adds a new task to DynamoDB.
  - `getTaskFunction`: Retrieves all tasks from DynamoDB.
  - `deleteTaskFunction`: Deletes a task from DynamoDB by ID.
- **API Gateway**:
  - Routes HTTP requests to the corresponding Lambda functions.
- **DynamoDB**:
  - Stores tasks with attributes like `id` and `title`.

---

## 🔁 Application Workflow

### On the Tasks Listing page:

1. A `GET /tasks` request is triggered from the frontend.
2. This request hits the **backend Express route**, which is responsible for fetching tasks.
3. The **Node.js backend** sends the request to the **AWS API Gateway**.
4. **API Gateway** routes the request to the **`getTaskFunction`** Lambda function.
5. The Lambda function fetches all task records from **DynamoDB**.
6. The data is returned to the client and displayed in a table.

> The same flow applies to `POST /tasks` and `DELETE /tasks/:id` routes using their respective Lambda functions (`addTaskFunction`, `deleteTaskFunction`).

---

## 📁 Project Structure

### 📦 Backend (`/backend`)
```
backend/
├── dist/
├── node_modules/
├── src/
│   ├── lambda/
│   │   ├── addTask.ts
│   │   ├── deleteTask.ts
│   │   └── getTask.ts
│   ├── routes/
│   │   └── taskRoutes.ts
│   ├── services/
│   │   └── lambdaService.ts
│   ├── tests/
│   ├── types/
│   └── server.ts
├── .env
├── jest.config.js
├── package.json
├── tsconfig.json
└── Readme.md
```

### 🎨 Frontend (`/frontend`)
```
frontend/
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddTaskForm.tsx
│   │   ├── TaskList.tsx
│   │   └── TaskListPage.tsx
│   ├── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── newTestingFile.tsx
│   └── vite-env.d.ts
├── .env
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── README.md
```

---

## ⚙️ Environment Variable Setup

### 🔐 Frontend `.env`
```env
VITE_API_BASE_URL=            # Backend URL exposed through API Gateway
VITE_API_ALLOWED_DOMAIN=      # Auth0 Domain from app setup
VITE_AUTH_CLIENT_ID=          # Auth0 Client ID from app setup
```

### 🛠 Backend `.env`
```env
TABLE_NAME=                   # DynamoDB table name
FRONTEND_URL=                 # Frontend domain (CORS allowed origin)

API_GATEWAY_ADD=              # API Gateway URL for addTaskFunction
API_GATEWAY_GET=              # API Gateway URL for getTaskFunction
API_GATEWAY_DELETE=           # API Gateway URL for deleteTaskFunction
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- AWS CLI configured
- Auth0 account (for frontend auth)
- AWS account with:
  - API Gateway
  - Lambda
  - DynamoDB

---

### 🔧 Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/ajay980p/AWS_Function_project.git
cd AWS_Function_project
```

#### 2. Setup the Backend

```bash
cd backend
npm install
```

- Configure AWS credentials locally or in `.aws/credentials`
- Set environment variables in `.env`
- Deploy Lambda functions and connect them to API Gateway

#### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

- Add your Auth0 credentials and backend URL to `.env`

#### 4. Run the Project

##### Backend (local)
```bash
cd backend
npm run dev
```

##### Frontend
```bash
cd frontend
npm run dev
```

---

## 🧩 How to Create & Deploy AWS Lambda Functions

If you want to implement the same setup from scratch using the provided `lambda/` folder:

### 📂 Source Files
Located at:  
`/backend/src/lambda/`

- `addTask.ts`
- `getTask.ts`
- `deleteTask.ts`

### 🔨 Deployment Steps (Manually via AWS Console)

1. Go to **AWS Console → Lambda → Create Function**
2. Choose **Author from scratch**
3. Give the function a name like `addTaskFunction`
4. Runtime: **Node.js 18.x**
5. Permissions: Create or select an **IAM Role** with DynamoDB access
6. Create function

### ⬆️ Upload Code
1. Compile your TypeScript code (or convert to JS and zip if needed)
2. Upload the function code using:
   - AWS Console: Upload `.zip`
   - OR use AWS CLI:
     ```bash
     aws lambda update-function-code --function-name addTaskFunction --zip-file fileb://function.zip
     ```

### 🌐 API Gateway Setup

1. Go to **API Gateway → Create API**
2. Choose **HTTP API**
3. Add routes:
   - `POST /tasks` → `addTaskFunction`
   - `GET /tasks` → `getTaskFunction`
   - `DELETE /tasks/{id}` → `deleteTaskFunction`
4. Deploy API and copy the endpoint URLs

### 🔐 CORS & Permissions

- Allow **CORS** from your frontend domain in API Gateway
- Attach correct **DynamoDB permissions** to the Lambda IAM role:
```json
{
  "Effect": "Allow",
  "Action": [
    "dynamodb:PutItem",
    "dynamodb:GetItem",
    "dynamodb:Scan",
    "dynamodb:DeleteItem"
  ],
  "Resource": "arn:aws:dynamodb:region:account-id:table/your-table-name"
}
```

---

## ✨ Author

Developed by Ajay Prajapati
