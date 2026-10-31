import cron from "node-cron";
import { SCRAPING_WORKER } from "@/modules/common/constants/worker-constant";
import puppeteer from "puppeteer";
import { createObjectCsvWriter } from "csv-writer";

export class DataScrapperWorker {
    // state pengendali proses
    private isRunning: boolean = false;

    /**
     * Library cron mengontrol penjadwalan dan eksekusi execute()
     * setiap jam 6 page dan jam 12 siang.
     */
    public async start(): Promise<void> {
        cron.schedule("0 6,12 * * *", () => void this.execute(), {
            timezone: "Asia/Jakarta"
        });

        // remove komen untuk menjalankan scrapper saat ini juga (overriding sir)
        void this.execute();
    }

    /**
     * Method ini mengeksekusi pemrosesan scrapping sebanyak batas
     * percobaan, menangkap error, dan menandakan operasi selesai
     * dengan mengembalikan state isRunning ke false.
     */
    private async execute(): Promise<void> {
        console.log("mencoba mengeksekusi scrapper...")

        if (this.isRunning)
            return;

        this.isRunning = true;

        try {
            for (let attempts = 1; attempts <= SCRAPING_WORKER.ATTEMP_LIMIT; attempts++) {
                try {
                    await this.process();
                    return;
                } catch (error: unknown) {
                    console.log(`Scrapping gagal mpruy (attempt ke ${attempts})`, error);
                }
            }
        } finally {
            this.isRunning = false;
        }
    }

    /**
     * Fungsi scrapping, inisiasi browser, goto page, pilih
     * elemen dari selector, return data hasil scrapping.
     */
    private async process(): Promise<void> {
        console.log("sedang menjalankan scrapper")

        // inisialisasi browser dan csv writer
        const browser = await puppeteer.launch({
            executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
            headless: false 
        });

        try {
            const page = await browser.newPage();
                await page.goto("https://scholarpedia.kobieducation.com/", {
                waitUntil: "domcontentloaded",
            });

            const selector = 'a[href*="scholarship/"]';

            await page.waitForSelector(selector);

            const homePage = await page.$$eval(selector, (links) =>
            links.map((a) => ({
                name: a.textContent?.trim() ?? "",
                link: (a as HTMLAnchorElement).href,
            }))
            );

            console.log(homePage);

            const writer = createObjectCsvWriter;
            const csvWriter = writer({
                path: 'test.csv',
                header: [{id:'name',title:'nama'},{id:'link',title:'url'}]
            });
            await csvWriter.writeRecords(homePage);

        } finally {
            await browser.close();
        }
    }

    /**
     * 
     * @param path 
     * @param header 
     * @param records 
     */
    private async writeCsv<T extends Record<string, unknown>>(
        path: string,
        header: { id: keyof T & string; title: string }[],
        records: T[],
    ): Promise<void> {
        const writer = createObjectCsvWriter({ path, header });
        await writer.writeRecords(records);
    }
}