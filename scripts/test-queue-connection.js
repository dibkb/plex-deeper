#!/usr/bin/env node

/**
 * Test script to verify queue connection between Next.js app and Fly.io workers
 * Run this after setting up your environment variables
 */

const { createQueue } = require("../lib/queue");
const { QueueType } = require("../lib/queue-type");

async function testQueueConnection() {
  console.log("🧪 Testing queue connection...\n");

  try {
    // Test short description queue
    console.log("1. Testing short description queue...");
    const shortQueue = createQueue(QueueType.SHORT_DESCRIPTION);

    const shortJob = await shortQueue
      .createJob({ queryId: `test-${Date.now()}` })
      .save();

    console.log(`   ✅ Short description job created: ${shortJob.id}`);

    // Test detailed description queue
    console.log("2. Testing detailed description queue...");
    const detailedQueue = createQueue(QueueType.DETAILED_DESCRIPTION);

    const detailedJob = await detailedQueue
      .createJob({ queryId: `test-${Date.now()}` })
      .save();

    console.log(`   ✅ Detailed description job created: ${detailedJob.id}`);

    // Check queue stats
    console.log("\n3. Queue statistics:");
    const shortStats = await shortQueue.checkHealth();
    const detailedStats = await detailedQueue.checkHealth();

    console.log(
      `   Short description queue: ${shortStats.waiting} waiting, ${shortStats.active} active`
    );
    console.log(
      `   Detailed description queue: ${detailedStats.waiting} waiting, ${detailedStats.active} active`
    );

    console.log("\n✅ Queue connection test successful!");
    console.log("\n📝 Next steps:");
    console.log("   1. Deploy your workers to Fly.io");
    console.log("   2. Check worker logs: fly logs -a plex-deeper-queue");
    console.log("   3. Verify jobs are being processed");
  } catch (error) {
    console.error("\n❌ Queue connection test failed:");
    console.error(`   Error: ${error.message}`);
    console.log("\n🔧 Troubleshooting:");
    console.log("   1. Check your REDIS_URL environment variable");
    console.log("   2. Ensure Redis instance is running and accessible");
    console.log("   3. Verify network connectivity");
    process.exit(1);
  }
}

// Run the test
testQueueConnection();
