// components/Callout.jsx
export default function Callout({ children }: { children: React.ReactNode }) {
    return (
        <div className="border-l-4 border-blue-500 bg-blue-100 p-4 my-4 rounded">
            {children}
        </div>
    )
}