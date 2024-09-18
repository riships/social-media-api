# Social Media API Documentation

This API allows users to interact with a social media platform. It supports functionalities like user management, posting, commenting, liking, managing friendships, and OTP authentication.

## Table of Contents

1. [Users API](#users-api)
2. [Posts API](#posts-api)
3. [Comments API](#comments-api)
4. [Likes API](#likes-api)
5. [Friendship API](#friendship-api)
6. [OTP API](#otp-api)

---

## 1. Users API

### Endpoints:

- **Create User**
  - **Method:** `POST /api/users/signup`
  - **Description:** Create a new user.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "gender": ["Male","Female","Others"],
      "password": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "User successfully signed up!",
      "user": "object"
    }
    ```

- **Get User**
  - **Method:** `GET /api/users/get-details/:userId`
  - **Description:** Get user details by ID.
  - **Response Body:**
    ```json
    {
      "success": "boolean",
      "user": "object",
    }
    ```

- **Update User**
  - **Method:** `PUT /api/users/update-details/:userId`
  - **Description:** Update user details.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "User updated successfully"
    }
    ```

- **Delete User**
  - **Method:** `DELETE /users/:id`
  - **Description:** Delete a user by ID.
  - **Response Body:**
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

---

## 2. Posts API

### Endpoints:

- **Create Post**
  - **Method:** `POST /posts`
  - **Description:** Create a new post.
  - **Request Body:**
    ```json
    {
      "userId": "string",
      "content": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "Post created successfully",
      "postId": "string"
    }
    ```

- **Get Post**
  - **Method:** `GET /posts/:id`
  - **Description:** Get post details by ID.
  - **Response Body:**
    ```json
    {
      "id": "string",
      "userId": "string",
      "content": "string",
      "createdAt": "date"
    }
    ```

- **Update Post**
  - **Method:** `PUT /posts/:id`
  - **Description:** Update a post.
  - **Request Body:**
    ```json
    {
      "content": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "Post updated successfully"
    }
    ```

- **Delete Post**
  - **Method:** `DELETE /posts/:id`
  - **Description:** Delete a post by ID.
  - **Response Body:**
    ```json
    {
      "message": "Post deleted successfully"
    }
    ```

---

## 3. Comments API

### Endpoints:

- **Add Comment**
  - **Method:** `POST /posts/:postId/comments`
  - **Description:** Add a comment to a post.
  - **Request Body:**
    ```json
    {
      "userId": "string",
      "comment": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "Comment added successfully",
      "commentId": "string"
    }
    ```

- **Get Comments**
  - **Method:** `GET /posts/:postId/comments`
  - **Description:** Get all comments for a post.
  - **Response Body:**
    ```json
    [
      {
        "id": "string",
        "userId": "string",
        "comment": "string",
        "createdAt": "date"
      }
    ]
    ```

- **Delete Comment**
  - **Method:** `DELETE /posts/:postId/comments/:commentId`
  - **Description:** Delete a comment by ID.
  - **Response Body:**
    ```json
    {
      "message": "Comment deleted successfully"
    }
    ```

---

## 4. Likes API

### Endpoints:

- **Like a Post**
  - **Method:** `POST /posts/:postId/likes`
  - **Description:** Like a post.
  - **Request Body:**
    ```json
    {
      "userId": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "Post liked successfully"
    }
    ```

- **Unlike a Post**
  - **Method:** `DELETE /posts/:postId/likes/:userId`
  - **Description:** Unlike a post.
  - **Response Body:**
    ```json
    {
      "message": "Post unliked successfully"
    }
    ```

- **Get Likes**
  - **Method:** `GET /posts/:postId/likes`
  - **Description:** Get all users who liked a post.
  - **Response Body:**
    ```json
    [
      {
        "userId": "string",
        "username": "string"
      }
    ]
    ```

---

## 5. Friendship API

### Endpoints:

- **Send Friend Request**
  - **Method:** `POST /friends/:userId/request`
  - **Description:** Send a friend request to a user.
  - **Request Body:**
    ```json
    {
      "fromUserId": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "Friend request sent"
    }
    ```

- **Accept Friend Request**
  - **Method:** `POST /friends/:userId/accept`
  - **Description:** Accept a friend request.
  - **Request Body:**
    ```json
    {
      "fromUserId": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "Friend request accepted"
    }
    ```

- **Unfriend User**
  - **Method:** `DELETE /friends/:userId/unfriend`
  - **Description:** Remove a user from friends.
  - **Response Body:**
    ```json
    {
      "message": "Unfriended successfully"
    }
    ```

- **Get Friends List**
  - **Method:** `GET /friends/:userId`
  - **Description:** Get a list of friends for a user.
  - **Response Body:**
    ```json
    [
      {
        "friendId": "string",
        "username": "string"
      }
    ]
    ```

---

## 6. OTP API

### Endpoints:

- **Generate OTP**
  - **Method:** `POST /otp/generate`
  - **Description:** Generate a new OTP for a user.
  - **Request Body:**
    ```json
    {
      "userId": "string",
      "phoneNumber": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "OTP sent successfully"
    }
    ```

- **Verify OTP**
  - **Method:** `POST /otp/verify`
  - **Description:** Verify the OTP.
  - **Request Body:**
    ```json
    {
      "userId": "string",
      "otp": "string"
    }
    ```
  - **Response Body:**
    ```json
    {
      "message": "OTP verified successfully"
    }
    ```

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
