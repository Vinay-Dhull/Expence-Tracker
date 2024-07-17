const cron = require('cron');
const https = require('https');

const backendUrl = 'provide_backend_api_endpoint_that_is_provided_by_rendor';

const job = new cron.CronJob('*/14 * * * * *', function() {
  // This function will be executed every 14 seconds.
  console.log('Pinging server to keep it alive');

  // Perform an HTTPS GET request to hit the backend API.
  https.get(backendUrl, (res) => {
    if (res.statusCode === 200) {
      console.log('Server responded successfully');
    } else {
      console.error(`Failed to reach server with status code: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error('Error during request:', err.message);
  });
});

// Start the cron job
job.start();

// Export the cron job.
module.exports = {
  job,
};
