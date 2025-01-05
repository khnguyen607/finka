let config = null;

export default async () => {
  if (!config) {
    const response = await fetch("/config.json");
    if (!response.ok) throw new Error("Failed to load config");
    config = await response.json();
    console.log(config);
  }
  return config;
};
