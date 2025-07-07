import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Transaction {
  id: string
  type: "deposit" | "withdraw" | "purchase" | "refund"
  amount: number
  description: string
  date: string
  status: "pending" | "completed" | "failed"
}

interface WalletState {
  balance: number
  transactions: Transaction[]
  isLoading: boolean
}

const initialState: WalletState = {
  balance: 0,
  transactions: [],
  isLoading: false,
}

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload)

      if (action.payload.status === "completed") {
        if (action.payload.type === "deposit" || action.payload.type === "refund") {
          state.balance += action.payload.amount
        } else if (action.payload.type === "withdraw" || action.payload.type === "purchase") {
          state.balance -= action.payload.amount
        }
      }
    },
    updateTransactionStatus: (state, action: PayloadAction<{ id: string; status: Transaction["status"] }>) => {
      const transaction = state.transactions.find((t) => t.id === action.payload.id)
      if (transaction) {
        transaction.status = action.payload.status
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setBalance, addTransaction, updateTransactionStatus, setLoading } = walletSlice.actions
export default walletSlice.reducer
