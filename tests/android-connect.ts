
import { _android as android } from 'playwright';

async function main() {
    console.log('Connecting to Android emulator...');

    const devices = await android.devices();
    const device = devices[0];

    const context = await device.launchBrowser();

    try {
        const page = await context.newPage();

        console.log('Opening CNN website...');

        await page.goto('https://edition.cnn.com/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        console.log('Page title:', await page.title());
        console.log('Current URL:', page.url());

        await page.screenshot({
            path: 'cnn-homepage.png',
            fullPage: true
        });

        console.log('CNN screenshot captured successfully!');
    } finally {
        await context.close();
        await device.close();
    }
}

main().catch(console.error);
