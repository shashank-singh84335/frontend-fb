export function transformMetrics(metricsArray) {
  return metricsArray.map((metric) => {
    // Trim the metric to remove leading and trailing whitespace
    metric = metric.trim();

    // Remove underscores and split the string into words
    const words = metric.split("_").map((word) => {
      // Capitalize the first letter of each word
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    // Join the words back together to form the transformed string
    return words.join(" ");
  });
}

// function that will return a single string with the transformed metric names