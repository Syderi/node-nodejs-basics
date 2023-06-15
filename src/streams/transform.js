import { Transform } from 'stream';

const transform = () => {
  const reverseTransform = new Transform({
    transform(chunk, _, callback) {
      const reversedChunk =
        chunk.toString().split('').reverse().join('') + '\n';
      this.push(reversedChunk);
      callback();
    },
  });

  process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

transform();
