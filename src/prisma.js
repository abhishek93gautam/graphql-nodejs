import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
})

export { prisma as default }

// const createPostForUser = async (authorId, data) => {

//     const userExists = await prisma.exists.User({ id: authorId })

//     if (!userExists) {
//         throw new Error('User not found')
//     }
 
//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published } } }')

//     return post.author;
// }

// createPostForUser('ckjf5baiy002s07584wgmndvi', {
//     title: "Hello world!",
//     body: "Happy new year",
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((err) => {
//     console.log(err.message)
// })

// const updatePostForUser = async (postId, data) => {

//     const postExists = await prisma.exists.Post({ id: postId })

//     if (!postExists) {
//         throw new Error('Post not found')
//     }

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data: {
//             ...data
//         }
//     }, '{ author { id name email posts { id title body published } } }')

//     return post.author;
// }

// updatePostForUser("ckjfwx35d006407587zis80cy", {
//     title: "Hello world 2021",
//     body: "Happy new year 2021"
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((err) => {
//     console.log(err.message)
// })

// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL 101",
//         body: "",
//         published: false,
//         author: {
//             connect: {
//                 id: "ckjf663l600420758iq5d9kxk"
//             }
//         }
//     }
// }, '{id title body published }').then((data) => {
//     console.log(data)
//     return prisma.query.users(null, '{id name email posts { id title } }')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.updatePost({
//     data: {
//         body: "This is GraphQL 101 post",
//         published: true
//     },
//     where: {
//         id: "ckjfbm3wq004x075852lcdk2e"
//     }
// }, '{id title body published}').then((data) => {
//     console.log(data)
//     return prisma.query.posts(null, '{id title, body, published author { name }}')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })