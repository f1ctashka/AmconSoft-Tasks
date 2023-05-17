# ✨ User list with search functionality ✨

## 📖 Tasks:

1. Implement a web app that allows viewing a list of users with pagination with the pages listed below.
2. Implement a search widget (autocomplete) where you can perform a search all users by user name. For example, typing in `Jo` should list all users that have `Jo` in their name, each suggested item should lunk to the `user` page with the specific id.

## 📄 Pages:

### `/users` - a page with list of users with pagination.

There are 100 users in total, so let's have 10 pages with 10 user cards on each.

Each page should have its own url: either as separate route `/users/${PAGE_NUM}` or a query parameter `/users?page=${PAGE_NUM}`

Clicking on the user card should bring you to the `/user/${USER_ID}` page.

---

### `/user/${USER_ID}` - a page with information on the specific user based on the provided USER_ID
---


## ⚙️ API:

### User list with pagination

https://dummyjson.com/users?limit=10&skip=0 - page 1

https://dummyjson.com/users?limit=10&skip=10 - page 2
...
https://dummyjson.com/users?limit=10&skip=90 - page 10

### Search User by ID

https://dummyjson.com/users/${USER_ID} - where $USER_ID 1-100

https://dummyjson.com/users/1 - https://dummyjson.com/users/100

### Search User by name (this is for task #2)

https://dummyjson.com/users/search?q=${USER_NAME} - where USER_NAME is the name of the user



<sup>detailed API spec: https://dummyjson.com/docs/users</sup>

## 🔧 Technologies to use:

Next.js, Typescript.


