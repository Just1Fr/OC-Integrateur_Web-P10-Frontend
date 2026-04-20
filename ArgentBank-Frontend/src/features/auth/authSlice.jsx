import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                })
            })

            const result = await response.json()

            if (response.ok) {
                const userInfo = await getUserInfo(result.body.token)
                return {token: result.body.token, userInfo: userInfo}
            } else {
                console.log(result.message)
                return rejectWithValue(result.message)
            }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

async function getUserInfo(token) {
    try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })

        const result = await response.json()

        if (response.ok) {
            return result.body
        } else {
            console.log(result.message)
        }

    } catch {
        console.log("Error: failed to retrieve user info")
    }
}

export const setUserName = createAsyncThunk(
    'auth/setUserName',
    async ({ token, newUserName }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "userName": newUserName,
                })
            })

            const result = await response.json()

            if (response.ok) {
                return newUserName
            } else {
                return rejectWithValue(result.message)
            }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    email: null,
    userName: null,
    firstName: null,
    lastName: null,
    createdAt: null,
    id: null,
    token: null,
    loading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder

        .addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.email = action.payload.userInfo.email
            state.userName = action.payload.userInfo.userName
            state.firstName = action.payload.userInfo.firstName
            state.lastName = action.payload.userInfo.lastName
            state.createdAt = action.payload.userInfo.createdAt
            state.id = action.payload.userInfo.id
            state.token = action.payload.token
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        .addCase(setUserName.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(setUserName.fulfilled, (state, action) => {
            state.loading = false
            state.userName = action.payload
        })
        .addCase(setUserName.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer