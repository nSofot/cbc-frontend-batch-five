import { useRef, useState } from "react";

export default function ImageSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);

    const scrollThumbnails = (direction) => {
        const scrollAmount = 100;
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: direction === "up" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-[650px] h-[500px] flex">
            {/* Thumbnail Carousel on the Left */}
            <div className="relative w-[150px] h-[500px] flex flex-col items-center mr-2">
                {/* Up Arrow */}
                <button
                    className="absolute top-0 z-10 bg-white p-1 rounded-full shadow-md"
                    onClick={() => scrollThumbnails("up")}
                >
                    ↑
                </button>

                {/* Scrollable Thumbnails */}
                <div
                    ref={scrollRef}
                    className="flex flex-col overflow-hidden h-full py-8 space-y-2"
                >
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            onClick={() => setCurrentIndex(index)}
                            className={
                                "w-[90px] h-[90px] rounded-2xl object-cover cursor-pointer hover:border-4 hover:border-accent " +
                                (index === currentIndex ? "border-4 border-accent" : "")
                            }
                        />
                    ))}
                </div>

                {/* Down Arrow */}
                <button
                    className="absolute bottom-0 z-10 bg-white p-1 rounded-full shadow-md"
                    onClick={() => scrollThumbnails("down")}
                >
                    ↓
                </button>
            </div>

            {/* Large Image on the Right */}
            <img
                src={images[currentIndex]}
                className="w-[500px] h-[500px] object-cover rounded-3xl"
            />
        </div>
    );
}