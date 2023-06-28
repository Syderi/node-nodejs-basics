const parseEnv = () => {
  const prefix = 'RSS_';
  for (let key in process.env) {
    if (key.startsWith(prefix)) {
      const value = process.env[key];
      const formatted = `${key}=${value}`;
      process.stdout.write(formatted + '; ');
    }
  }
  process.stdout.write('\n');
};

parseEnv();
