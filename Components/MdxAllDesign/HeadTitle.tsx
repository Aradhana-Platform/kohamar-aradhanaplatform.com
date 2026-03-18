export default function HeadTitle({ title }: { title: string }) {
    return (
        <div>
            <h1 className="text-4xl font-bold text-green-600">{title}</h1>
        </div>
    );
}