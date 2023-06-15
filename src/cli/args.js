const parseArgs = () => {
  const args = process.argv.slice(2); 

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].slice(2); 
    const value = args[i + 1];

    process.stdout.write(`${propName} is ${value}\n`);
  }
  process.stdout.write('\n');
};

parseArgs();
