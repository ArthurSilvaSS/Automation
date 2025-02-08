const puppeteer = require('puppeteer');
const scrollFeed = async (page, { timeout = 10000 }) => {
    await page.evaluate(async () => {
        const feed = document.querySelector('div[role="feed"]');
        if (!feed) return;

        let previousHeight = 0;
        while (true) {
            feed.scrollTo(0, feed.scrollHeight);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const element = document.querySelector('.HlvSq');
            const newHeight = feed.scrollHeight;
            if (element) {
                break;
            }
            previousHeight = newHeight;
        }
    });
};

module.exports = scrollFeed;