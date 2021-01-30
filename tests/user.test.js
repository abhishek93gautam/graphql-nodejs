import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import bcrypt from 'bcryptjs'

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

beforeEach(async () => {
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    const user = await prisma.mutation.createUser({
        data: {
            name: 'Dravita',
            email: 'dravu@example.com',
            password: bcrypt.hashSync('Red0981234')
        }
    })

    await prisma.mutation.createPost({
        data: {
            title: 'My published post',
            body: '',
            published: true,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    await prisma.mutation.createPost({
        data: {
            title: 'My draft post',
            body: '',
            published: false,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })
}, 20000)

test('should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "Andrew",
                    email: "andrew@example.com",
                    password: "MyPass123"
                }
            ){
                token,
                user {
                    id
                }
            }
        }
    `

    const response = await client.mutate({
        mutation: createUser
    })

    const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
    expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
    const getUsers = gql`
        query {
            users {
                id
                name
                email
            }
        }
    `

    const res = await client.query({ query: getUsers })

    expect(res.data.users.length).toBe(1)
    expect(res.data.users[0].email).toBe(null)
    expect(res.data.users[0].name).toBe('Dravita')
})

test('Should expose only published posts', async () => {
    const getPosts = gql`
        query {
            posts {
                id
                published
            }
        }
    `

    const res = await client.query({ query: getPosts })

    expect(res.data.posts.length).toBe(1)
    expect(res.data.posts[0].published).toBe(true)
})