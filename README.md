# The Puffin Room

The Puffin Room is a web application built using React with Vite, communicating with a Node.js backend hosted on Render. This project is part of my software development bootcamp with NorthCoders and extends from the backend API developed previously [here](https://github.com/booayl/PuffinRoom-BE.git).

### Functionality

The Puffin Room offers various features enabling users to browse, read, and engage with forum articles.

## Theme Options

The application offers both dark and light themes, allowing users to switch between them based on their preference.

## User Login

The application includes user logim for commenting on articles, posting articles, and managing user-generated content.

## Landing Page

The Landing Page features sections including:

- **Talk of The Town:** highlighting the most commented article.
- **Forum Favorites:** showcasing the top 3 voted articles.
- **Fresh Off The Presses:** presenting the newest article.

## Articles

Articles are presented in a list format, providing users with detailed information such as content, author, created date, likes, and comments. When the last article for a specific topic is deleted, the topic itself will be removed.

### Comments
Comments can be found in the individual article page. Users must log in to post comments and have the ability to edit or delete their own comments.

## Likes

Users can intereact by liking an article, double clicking allows user to remove their like. Like counts is updated instantly by optimistic rendering, providing immediate feedback to users.

## Sorting

Articles can be sorted by date, likes, or comments, and in ascending or descending order.

## Visit The Puffin Room

Explore The Puffin Room on [Netlify](https://thepuffinroom.netlify.app/).

**Please note that initial access may experience delays due to inactivity. To experience the full functionality, please log in using the provided placeholder on the login page.**
