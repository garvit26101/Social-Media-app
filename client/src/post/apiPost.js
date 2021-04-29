import { isAuthenticated } from "../core/Navbar";

export const create = (userId, token, post) => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${isAuthenticated().token}`,
        },
        body:post
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}

export const List = () => {
    return fetch((`${process.env.REACT_APP_API_URL}/posts`),{
        method:"GET"
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const singlePost = (postId) => {
    return fetch((`${process.env.REACT_APP_API_URL}/post/${postId}`),{
        method:"GET"
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}