
function Image({ type, src, alt }) {
    let image, width, height;
    if (type === "thumbnail") {
        width = 300;
        height = 250;
    } else {
        width = 600;
        height = 400;
    }

    if (src) {
        image = `http://localhost:4000${src}`;
    } else {
        image = "https://via.placeholder.com/600x400";
    }

    return (
        <>
            <img src={image} alt={alt} width={width} height={height} />
        </>
    );
}

export default Image;