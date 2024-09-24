import ClientPage from "./client"

export default async function Detail({ params }) {
    const { id } = params
    const res = await fetch('https://api.imgflip.com/get_memes')
    const product = await res.json()

    const fetchProduct = product.data.memes.find(meme => meme.id === id)

    if (!fetchProduct) {
        return <div>No product found</div>
    }

    return <ClientPage response={fetchProduct} />
}