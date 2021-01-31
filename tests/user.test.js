import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, getUsers, login, getProfile } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase, 20000)

test('should create a new user', async () => {
    const variables = {
        data: {
            name: "Andrew",
            email: "andrew@example.com",
            password: "MyPass123"
        }
    }

    const response = await client.mutate({
        mutation: createUser,
        variables
    })

    const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
    expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
    const res = await client.query({ query: getUsers })

    expect(res.data.users.length).toBe(1)
    expect(res.data.users[0].email).toBe(null)
    expect(res.data.users[0].name).toBe('Dravita')
})

test('Should not login with bad credentials', async () => {
    const variables = {
        data: {
            email: "test@example.com",
            password: "abcadadad"
        }
    }
    await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()
})

test('Should not signup user with invalid password', async () => {
    const variables = {
        data: {
            name: 'Abhishek',
            email: 'abhi@eample.com',
            password: 'pass'
        }
    }
    await expect(client.mutate({ mutation: createUser, variables })).rejects.toThrow()
})

test('Should fetch user profile', async () => {
    const client = getClient(userOne.jwt)

    const { data } =  await client.query({query: getProfile})

    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
}) 