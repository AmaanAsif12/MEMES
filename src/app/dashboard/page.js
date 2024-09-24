import Link from "next/link"

async function Dashboard() {

    const res = await fetch('https://api.imgflip.com/get_memes')
    const product = await res.json()
    const fetchProduct = product.data.memes

    return <div>
        <h1 className="text-3xl m-5 font-semibold text-center text-black mb-8">SELECT YOUR MEMES</h1>
        <div className="border-gray-300 rounded-xl dark:border-neutral-700 dark:bg-neutral-800 m-10 mb-32 grid gap-6 p-6 lg:max-w-7xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:gap-8">
            {fetchProduct.map(item => (
                <Link
                    key={item.id}
                    href={`detail/${item.id}`}
                    className="group relative block rounded-lg border border-transparent bg-white shadow-md transition-transform hover:scale-105 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    rel="noopener noreferrer"
                >
                    <div className="flex justify-center items-center w-full h-48">
                        <img className="max-w-full max-h-full object-contain rounded-t-lg" src={item.url} alt={item.title} />
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            <span className="inline-block transition-transform group-hover:translate-x-1">
                                {item.name}
                            </span>
                        </h2>
                    </div>
                </Link>
            ))}
        </div>
    </div>
}
export default Dashboard;