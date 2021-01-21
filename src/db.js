const users = [{
    id: '1',
    name: 'Abhishek',
    email: 'abu@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

// Demo Post data
const posts = [{
    id: '10',
    title: 'First post',
    body: 'This is my first post',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'Second post',
    body: 'This is my second post',
    published: true,
    author: '1'
}, {
    id: '12',
    title: 'Third Post',
    body: 'This is my third post',
    published: false,
    author: '2'
}]

// Demo Comment data
const comments = [{
    id: '101',
    text: 'I like your dp',
    author: '1',
    post: '10'
}, {
    id: '102',
    text: 'This post is awesome',
    author : '1',
    post: '10'
}, {
    id: '103',
    text: 'You look good',
    author: '2',
    post: '11'
}, {
    id: '104',
    text: 'GraphQL is awesome',
    author: '3',
    post: '12'
}]

const db = {
    users,
    posts,
    comments
}

export { db as default }