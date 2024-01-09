
// In the app directory, nested folder hierarchy defines route structure. However, even though route structure is defined through folders, a route is not publicly accessible until a page.js or route.js file is added to a route folder.

// while folders define routes (this is /dashboard), only the contents returned by page.js or route.js are publicly addressable.
export default function Page() {

    // only this returned segment is visible on the client, any functions above wont be. 
    return (
        <h1>Welcome to the dashboard!</h1>
    )
}