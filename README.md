# Role Based Access Control System

- This script is made with following tech-stack:
    - NodeJS
    - ExpressJS
    - MongoDB

- This is a simple project which gives user access to the resources based on the role they play in the organisations and the level of access they have to the resource.
- First step is authenticating the user and giving an access token to the user.
- Next the user can request a resource access token for the resource which he wants to access. If the user's access token is valid and is having access to the resource then he is given a resource access token.
- When the user tries to access the resource his resource access token is checked if it is valid then the user can access the resource otherwise the user is redirected to homepage.
- Following are the collections created in mongodb:
    - RoleInfo: name,permissions
    - UserInfo: username, password, role
    - ResourceInfo: name, role_with_access
    - RolePriority: name, priority

