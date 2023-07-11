import React from 'react';

class Blob {
    x: number;
    y: number;
    r: number;
    color: string;

    constructor(x: number, y: number, r: number, color: string) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    grow() {
        this.r += 5;
    }
}

function Background() {
    // draw blobs that grow and merge together to form the background of the page with a 2d canvas

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // get the background color of the page and calculate a constrasting color
        const body = document.querySelector('html');
        if (!body) return;
        const backgroundColor = window.getComputedStyle(body).backgroundColor;

        const invertedBackgroundColor = (() => {
            const rgb = backgroundColor.match(/\d+/g);
            if (!rgb) return 'white';
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);
            return `rgba(${255 - r}, ${255 - g}, ${255 - b}, 1)`;
        })();

        const width = (canvas.width = window.innerWidth);
        const height = (canvas.height = window.innerHeight);

        const blobs: Blob[] = Array.from({ length: 25 }).map(() => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 20 + 10;
            const color = backgroundColor;
            return new Blob(x, y, r, color);
        });

        let terminate = false;

        function animate() {
            if (!ctx) return;
            ctx.fillStyle = invertedBackgroundColor;
            ctx.fillRect(0, 0, width, height);

            blobs.forEach((blob) => {
                if (blob.r * 2 > width || blob.r * 2 > height) {
                    console.log('terminate');
                    terminate = true;
                }
                blob.draw(ctx);
                blob.grow();
            });

            if (!terminate) requestAnimationFrame(animate);
        }

        if (!terminate) animate();
    }, []);

    return (
        <canvas
            id="background"
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                width: '100%',
                height: '100%',
            }}
        />
    );
}

export default Background;
