# Teza AI Backend

This is the backend for the Teza AI application. It provides endpoints to generate meta descriptions and images using OpenAI's API. Users can input their name, description, and year to receive generated responses from the API.

## Endpoints

### Generate Meta Description

- **URL:** `/openai/meta`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "year": "string"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "string",
    "text": "string",
    "created_at": "string"
  }
  ```

### Generate Image

- **URL:** `/openai/image`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "year": "string"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "string",
    "imageUrl": "string",
    "created_at": "string"
  }
  ```

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file with your OpenAI API key.
4. Start the server: `npm start`.

## Note

A separate README file with information about the frontend project is available in the frontend repository.
