import React from 'react';

const fullSize = Math.min(window.innerWidth, window.innerHeight);
const growSpeed = fullSize / 100;

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
        this.r += growSpeed;
    }
}

const NUM_BLOBS = 25;

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

        const blobs: Blob[] = Array.from({ length: NUM_BLOBS }).map(() => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 20 + 10;
            const color = backgroundColor;
            return new Blob(x, y, r, color);
        });

        let start: number, end: number;
        let terminate = 0;

        function animate() {
            if (!ctx) return;
            ctx.fillStyle = invertedBackgroundColor;
            ctx.fillRect(0, 0, width, height);
            terminate = 0;

            blobs.forEach((blob) => {
                if (blob.r > width || blob.r > height) {
                    terminate++;
                }
                blob.draw(ctx);
                blob.grow();
            });

            if (terminate < NUM_BLOBS) {
                requestAnimationFrame(animate);
            } else {
                // Done animating
                end = performance.now();
                console.log(`Animation took ${end - start}ms`);
            }
        }

        start = performance.now();

        if (terminate < NUM_BLOBS) {
            animate();
        }
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
