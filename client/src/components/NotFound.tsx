import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="flex flex-col gap-2 bg-background min-h-screen p-6 relative">
            <h1 className="font-lato font-bold text-3xl text-primary">Error</h1>
            <p className="font-inria font-light text-sm text-primary">Oops! Something went wrong. Please try again.</p>
            <Link to="/"><button className="rounded-3xl bg-accent w-10 h-10 absolute bottom-20 right-4 lg:w-19 lg:h-19 lg:right-10 lg:bottom-10"><svg className="m-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path></svg></button></Link>
        </div>
    )
}

export default NotFound;