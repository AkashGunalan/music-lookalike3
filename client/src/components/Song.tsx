const Song = ({ img_url }) => {
    return (
        <>
        <div className="mx-auto h-32 w-24 rounded-lg animate-pop-up md:h-80 md:w-48" style={{ backgroundImage: `url(${img_url})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        </div>
        </>
    )
}

export default Song;
