import React from 'react'
import MagazineCard from '../../Components/MagazineCard'
import { getAllPosts } from '../../lib/magazine';


const page = () => {
    const posts = getAllPosts();
    return (
        <div>
            <MagazineCard magazines={posts} />
        </div>
    )
}

export default page