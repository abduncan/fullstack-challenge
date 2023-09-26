import ExpensesTable from '@/components/ExpensesTable'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm space-y-10">
        <h1 className='text-xl'>Enter the expenses from your Snowboarding Trip below:</h1>
        <ExpensesTable />
      </div>
    </main>
  )
}
